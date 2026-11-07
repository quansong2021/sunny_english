import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const raw=await readFile(new URL('./data/wordbank.json',import.meta.url),'utf8');
const dataset=JSON.parse(raw),entries=dataset.entries,map=new Map(entries.map(e=>[e.word,e])),aliases=new Map();
export const wordbankVersion=createHash('sha256').update(raw).digest('hex');
const normalize=s=>String(s||'').normalize('NFKC').replaceAll('’',"'").trim().toLowerCase();
for(const e of entries)for(const change of (e.exchange||'').split('/')){const [type,forms]=change.split(':');if(!['p','d','i','3','s','r','t'].includes(type))continue;for(const form of (forms||'').split(',')){const key=normalize(form);if(/^[a-z]+(?:['-][a-z]+)*$/.test(key)&&!aliases.has(key))aliases.set(key,e.word);}}
export const wordbank={
  lookup(input){const query=normalize(input);if(!/^[a-z]+(?:[' -][a-z]+)*$/.test(query)||query.length>120)return null;const word=map.has(query)?query:aliases.get(query);return word?{...map.get(word),queried:query}:null;},
  search(query='',offset=0,limit=40){const q=normalize(query).slice(0,80);const matched=q?entries.filter(e=>e.word.includes(q)||e.senses.some(s=>s.toLowerCase().includes(q))):entries;const start=Math.max(0,Number(offset)||0),size=Math.max(1,Math.min(80,Number(limit)||40));return {total:entries.length,matched:matched.length,offset:start,items:matched.slice(start,start+size).map(e=>({word:e.word,phonetic:e.phonetic,pos:e.pos,meaning:e.senses.join('；').slice(0,400)}))};}
};
export async function seedWordbank(pool){
  const [meta]=await pool.execute('SELECT version FROM dictionary_metadata WHERE dataset_key=?',['common']);if(meta[0]?.version===wordbankVersion)return;
  const c=await pool.getConnection();try{await c.beginTransaction();for(let i=0;i<entries.length;i+=200){const batch=entries.slice(i,i+200).map(e=>[e.word,JSON.stringify(e)]);await c.query('REPLACE INTO dictionary_entries(word,entry_json) VALUES ?',[batch]);}await c.execute('REPLACE INTO dictionary_metadata(dataset_key,version) VALUES (?,?)',['common',wordbankVersion]);await c.commit();}catch(e){await c.rollback();throw e;}finally{c.release();}
}
