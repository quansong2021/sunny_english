"""Rebuild the bundled word bank from the pinned MIT-licensed ECDICT snapshot."""
import csv,io,json,re,urllib.request,subprocess
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
REV='39cfb9672c0906b63569e0453c2e6abfb9ab182a'
BASE=f'https://raw.githubusercontent.com/skywind3000/ECDICT/{REV}/'
course=json.loads(subprocess.check_output(['node','-e',"const fs=require('fs'),vm=require('vm'),c=vm.createContext({});for(const f of ['data','vocabulary','month-vocabulary','month-lessons'])vm.runInContext(fs.readFileSync('frontend/'+f+'.js','utf8'),c);process.stdout.write(JSON.stringify(vm.runInContext('({details:vocabularyDetails,lessons})',c)));"],cwd=ROOT).decode('utf8'))
tokens=set(re.findall(r"[A-Za-z]+(?:['’-][A-Za-z]+)*",json.dumps(course,ensure_ascii=False)))
tokens={w.lower().replace('’',"'") for w in tokens}
common=[];extras={}
with urllib.request.urlopen(BASE+'ecdict.csv',timeout=120) as response:
    for row in csv.DictReader(io.TextIOWrapper(response,encoding='utf-8-sig')):
        word=row['word'].strip().lower()
        if not re.fullmatch(r"[a-z]+(?:['-][a-z]+)*",word) or not row['translation']:continue
        ranks=[int(row[k]) for k in ['bnc','frq'] if row[k].isdigit() and int(row[k])>0]
        rank=min(ranks) if ranks else 999999
        entry={'word':word,'phonetic':row['phonetic'],'pos':row['pos'],'senses':row['translation'].replace('\\n','\n').splitlines(),'english':row['definition'].replace('\\n','\n').splitlines()[:4],'exchange':row['exchange'],'rank':rank,'source':'ECDICT'}
        if rank<=50000 and row['word']==word:common.append(entry)
        if word in tokens:extras[word]=entry
common.sort(key=lambda x:(x['rank'],x['word']))
entries={e['word']:e for e in common[:5000]}
entries.update(extras)
for word,detail in course['details'].items():
    prior=entries.get(word,{})
    entries[word]={**prior,'word':word,'phonetic':detail.get('us','').strip('/'),'pos':detail['pos'],'senses':detail['senses'],'rank':prior.get('rank',999999),'source':'课程整理','detail':detail}
contractions={"i'm":'I am',"i've":'I have',"i'll":'I will',"i'd":'I would / I had',"you're":'you are',"we're":'we are',"they're":'they are',"it's":'it is / it has',"that's":'that is / that has',"don't":'do not',"doesn't":'does not',"didn't":'did not',"can't":'cannot',"couldn't":'could not',"won't":'will not',"wouldn't":'would not',"isn't":'is not',"aren't":'are not',"wasn't":'was not',"weren't":'were not',"haven't":'have not',"hasn't":'has not',"let's":'let us'}
for word,expanded in contractions.items():entries[word]={'word':word,'pos':'缩略形式','phonetic':'','senses':[f'{expanded} 的缩写'],'english':[],'exchange':'','rank':1,'source':'课程整理'}
data={'version':REV,'source':'https://github.com/skywind3000/ECDICT','entries':sorted(entries.values(),key=lambda e:(e.get('rank',999999),e['word']))}
(ROOT/'backend/data/wordbank.json').write_text(json.dumps(data,ensure_ascii=False,separators=(',',':')),encoding='utf8')
(ROOT/'third-party/ECDICT-LICENSE.txt').write_bytes(urllib.request.urlopen(BASE+'LICENSE').read())
print(f"Bundled {len(entries)} entries; {len(common[:5000])} frequency-selected words plus course coverage.")
