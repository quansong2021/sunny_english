// The chart follows a common British English IPA convention.
const Phonetics = (() => {
  const groups = [
    ['long', '长元音'], ['short', '短元音'], ['glides', '双元音'],
    ['stops', '爆破音'], ['fricatives', '摩擦音'], ['affricates', '塞擦音'],
    ['nasals', '鼻音'], ['approximants', '近音和边音']
  ];
  const entries = [
    ['long','iː','舌前部抬高，嘴唇略向两边，保持音质稳定。和 /ɪ/ 对比时，注意舌位也不同。','sheep','ʃiːp','绵羊','seat','siːt','座位'],
    ['long','ɑː','下巴放低，舌身偏后，嘴唇放松。英式示范中 car 的词尾不单独发 /r/。','car','kɑː','汽车','calm','kɑːm','平静的'],
    ['long','ɔː','舌身抬向后上方，嘴唇圆起，保持音质稳定。','caught','kɔːt','抓住了','door','dɔː','门'],
    ['long','uː','舌位较高，嘴唇收圆并保持。和 /ʊ/ 相比，通常更紧、更长。','fool','fuːl','傻瓜','food','fuːd','食物'],
    ['long','ɜː','舌身在口腔中央，嘴唇自然。英式示范中 bird 和 work 的 r 不单独发音。','bird','bɜːd','鸟','work','wɜːk','工作'],
    ['short','ɪ','舌前部比 /iː/ 稍低、稍靠后，嘴唇放松，短促发出。','ship','ʃɪp','船','sit','sɪt','坐下'],
    ['short','e','舌前部在中间高度，嘴张得比 /ɪ/ 大一些。','pen','pen','笔','desk','desk','办公桌'],
    ['short','æ','舌尖靠近下齿，下巴比发 /e/ 时更低。','pan','pæn','平底锅','cap','kæp','帽子'],
    ['short','ʌ','嘴唇放松，舌身在口腔中央，短促发出。','cup','kʌp','杯子','luck','lʌk','运气'],
    ['short','ɒ','下巴放低，舌身偏后，嘴唇略圆。美式英语里的相应元音常不同。','lock','lɒk','锁','hot','hɒt','热的'],
    ['short','ʊ','舌位较高，嘴唇略圆。比 /uː/ 更放松、更短。','full','fʊl','满的','book','bʊk','书'],
    ['short','ə','下巴和嘴唇放松，舌身居中。常在非重读音节里快速发出。','about','əˈbaʊt','关于','support','səˈpɔːt','支持'],
    ['glides','eɪ','从 /e/ 附近起音，舌位向较高的前方滑动，在同一个音节内完成。','late','leɪt','迟到的','gate','ɡeɪt','登机口'],
    ['glides','aɪ','从较开口的位置起音，向 /ɪ/ 的方向滑动。','light','laɪt','灯；光','time','taɪm','时间'],
    ['glides','ɔɪ','从圆唇的后元音起音，滑向 /ɪ/，嘴唇逐渐放松。','boy','bɔɪ','男孩','voice','vɔɪs','声音'],
    ['glides','əʊ','从口腔中央起音，滑向较高的元音，嘴唇逐渐收圆。','coat','kəʊt','外套','go','ɡəʊ','去'],
    ['glides','aʊ','从较开口的位置起音，向 /ʊ/ 滑动，嘴唇逐渐收圆。','town','taʊn','城镇','out','aʊt','在外面'],
    ['glides','ɪə','从 /ɪ/ 附近滑向口腔中央。部分英式口音会读得更接近一个长元音。','near','nɪə','近的','here','hɪə','这里'],
    ['glides','eə','从 /e/ 附近滑向口腔中央。现代英式口音里也常听到较平稳的长音。','hair','heə','头发','care','keə','关心'],
    ['glides','ʊə','从略圆唇的 /ʊ/ 滑向口腔中央。这个音在现代英式口音中有变体。','pure','pjʊə','纯粹的','cure','kjʊə','治愈'],
    ['stops','p','双唇闭合后打开，声带不振动。读词尾时不要添一个元音。','pin','pɪn','别针','tap','tæp','轻敲'],
    ['stops','b','双唇闭合后打开，有声。与 /p/ 对比时可以轻摸喉咙。','bin','bɪn','垃圾桶','tab','tæb','标签页'],
    ['stops','t','舌尖顶住上齿龈后释放，声带不振动。','tin','tɪn','罐头盒','test','test','测试'],
    ['stops','d','舌尖顶住上齿龈后释放，有声。词尾保持短促。','den','den','兽穴','card','kɑːd','卡片'],
    ['stops','k','舌后部抬起接触软腭再释放，声带不振动。','pick','pɪk','挑选','back','bæk','后面'],
    ['stops','ɡ','舌后部接触软腭再释放，有声。与 /k/ 对比。','game','ɡeɪm','游戏','pig','pɪɡ','猪'],
    ['fricatives','f','上齿轻碰下唇，气流从缝中通过，声带不振动。','fan','fæn','风扇','leaf','liːf','叶子'],
    ['fricatives','v','上齿轻碰下唇，持续送气并振动声带。','van','væn','厢式货车','leave','liːv','离开'],
    ['fricatives','θ','舌尖轻贴上齿或伸出一点，让气流通过，声带不振动。','thin','θɪn','薄的','think','θɪŋk','思考'],
    ['fricatives','ð','舌尖放在牙齿附近，让气流通过，同时振动声带。','then','ðen','然后','this','ðɪs','这个'],
    ['fricatives','s','舌尖靠近上齿龈，留缝送气，声带不振动。','sip','sɪp','小口喝','bus','bʌs','公交车'],
    ['fricatives','z','嘴形接近 /s/，同时振动声带。','zip','zɪp','拉链','buzz','bʌz','嗡嗡声'],
    ['fricatives','ʃ','舌头比发 /s/ 时稍后，嘴唇略圆，持续送气。','ship','ʃɪp','船','cash','kæʃ','现金'],
    ['fricatives','ʒ','发音位置接近 /ʃ/，同时振动声带。','measure','ˈmeʒə','测量','vision','ˈvɪʒən','视力'],
    ['fricatives','h','放松喉咙，让气流带入后面的元音。','hat','hæt','帽子','hotel','həʊˈtel','酒店'],
    ['affricates','tʃ','先堵住气流，再立刻放开成摩擦音，两个动作连成一个音。','chip','tʃɪp','薯片','cheap','tʃiːp','便宜的'],
    ['affricates','dʒ','先堵住气流，再立刻放开成有声的摩擦音。','jeep','dʒiːp','吉普车','job','dʒɒb','工作'],
    ['nasals','m','双唇合拢，声带振动，让气流从鼻腔出来。','map','mæp','地图','room','ruːm','房间'],
    ['nasals','n','舌尖抵住上齿龈，气流从鼻腔出来。','name','neɪm','名字','win','wɪn','赢'],
    ['nasals','ŋ','舌后部接触软腭，气流从鼻腔出来。wing 的末尾不要再添一个 /ɡ/。','wing','wɪŋ','翅膀','sing','sɪŋ','唱歌'],
    ['approximants','l','舌尖抵住上齿龈，气流从舌头两侧通过。','light','laɪt','灯；光','full','fʊl','满的'],
    ['approximants','r','舌尖靠近口腔前上方但不碰到上齿龈，再滑进元音。','right','raɪt','右边','red','red','红色的'],
    ['approximants','j','舌前部靠近硬腭，迅速滑进后面的元音，是 yes 开头的音。','yes','jes','是','you','juː','你'],
    ['approximants','w','双唇先收圆，再迅速展开进入元音。与 /v/ 不同，上齿不碰下唇。','wet','wet','湿的','wait','weɪt','等候']
  ];
  // Pair positions are stable keys for saved listening results.
  const pairs = [
    ['iː','ɪ','sheep','ship','听元音的音质，再留意长短。'],
    ['e','æ','pen','pan','/æ/ 的下巴位置比 /e/ 更低。'],
    ['æ','ʌ','cap','cup','比较舌前和舌中位置。'],
    ['uː','ʊ','fool','full','留意元音的长短和紧张程度。'],
    ['ɒ','ʌ','lock','luck','留意嘴唇是否圆起。'],
    ['aɪ','eɪ','light','late','比较双元音的起点。'],
    ['aʊ','əʊ','town','tone','听清开口较大的起点和较居中的起点。'],
    ['θ','t','thin','tin','/θ/ 有持续气流，/t/ 先堵住再放开。'],
    ['ð','d','then','den','比较持续摩擦和短促的释放。'],
    ['f','v','fan','van','两者嘴形相近，/v/ 有声。'],
    ['s','z','sip','zip','两者送气位置相近，/z/ 有声。'],
    ['tʃ','dʒ','cheap','jeep','听句首塞擦音的清浊。'],
    ['ʃ','tʃ','ship','chip','/ʃ/ 可持续，/tʃ/ 开头先堵住气流。'],
    ['l','r','light','right','/l/ 舌尖接触上齿龈，/r/ 通常不接触。'],
    ['ŋ','n','wing','win','比较舌后和舌尖的阻塞位置。'],
    ['p','b','tap','tab','听词尾的区别，别把辅音后面读出元音。']
  ];
  return { groups, entries, pairs };
})();

let phoneticTab = 'chart';
let phoneticSound = 0;
let phoneticPair = 0;
let phoneticRound = { answer: 0, response: null, played: false };

function phoneticProgress() {
  return state.learning?.phonetics || { seen: [], results: {} };
}

function ensurePhoneticProgress() {
  state.learning ||= { resume: null, units: {} };
  return state.learning.phonetics ||= { seen: [], results: {} };
}

function phoneticChart(progress) {
  const [group, symbol, hint, first, firstIpa, firstMeaning, second, secondIpa, secondMeaning] = Phonetics.entries[phoneticSound];
  const groupName = Phonetics.groups.find(([id]) => id === group)[1];
  const marked = progress.seen.includes(phoneticSound);
  const examples = [[first, firstIpa, firstMeaning], [second, secondIpa, secondMeaning]];
  return `<div class="phonetic-layout">
    <div>
      <section class="panel phonetic-sound">
        <span class="badge">${groupName} · ${phoneticSound + 1} / ${Phonetics.entries.length}</span>
        <h2 class="phonetic-symbol">/${symbol}/</h2>
        <p>${hint}</p>
        <h3>听例词，跟读两遍</h3>
        <div class="phonetic-examples">
          ${examples.map(([word, ipa, meaning]) => `<div>
            <strong lang="en">${word}</strong> <span class="phonetic-ipa">/${ipa}/</span>
            <p>${meaning}</p>
            <button type="button" class="secondary" data-say="${word}" data-accent="en-GB">♫ 听 ${word}</button>
          </div>`).join('')}
        </div>
        <div class="phonetic-actions">
          <button type="button" class="primary" id="phonetic-mark" aria-pressed="${marked}">${marked ? '已练习 · 撤销标记' : '标记已练习'}</button>
          <button type="button" class="secondary" id="phonetic-next" ${phoneticSound === Phonetics.entries.length - 1 ? 'disabled' : ''}>下一个音标</button>
        </div>
        <details class="phonetic-record">
          <summary>录下自己的发音</summary>
          <p id="record-status" class="muted">读完后回听，对照例词。录音仅在当前页面保留。</p>
          <div class="phonetic-actions">
            <button type="button" class="secondary" id="record">开始录音</button>
            <button type="button" class="secondary" id="stop-record" disabled>停止录音</button>
          </div>
          <audio id="record-audio" class="hidden" controls></audio>
        </details>
      </section>
      <section class="panel phonetic-note">
        <h3>怎样看音标</h3>
        <p>/ / 括住的是发音。<span class="phonetic-ipa">ː</span> 标出长元音，<span class="phonetic-ipa">ˈ</span> 标在重读音节前，例如 /əˈbaʊt/。</p>
        <a href="https://dictionary.cambridge.org/help/phonetics.html" target="_blank" rel="noopener noreferrer">查看 IPA 说明和词典示范 ↗</a>
      </section>
    </div>
    <section class="panel phonetic-chart" aria-label="音标表">
      <h2>音标表</h2>
      ${Phonetics.groups.map(([id, label]) => `<section class="phonetic-group">
        <h3>${label}</h3>
        <div>${Phonetics.entries.map(([entryGroup, ipa, , example], index) => entryGroup === id
          ? `<button type="button" data-phonetic-sound="${index}" aria-pressed="${index === phoneticSound}"
              aria-label="音标 /${ipa}/，例词 ${example}${progress.seen.includes(index) ? '，已练习' : ''}">
              /${ipa}/${progress.seen.includes(index) ? '<span aria-hidden="true">✓</span>' : ''}
            </button>` : '').join('')}</div>
      </section>`).join('')}
    </section>
  </div>`;
}

function phoneticQuiz(progress) {
  const [firstSound, secondSound, first, second, hint] = Phonetics.pairs[phoneticPair];
  const words = [first, second];
  const sounds = [firstSound, secondSound];
  const { answer, response, played } = phoneticRound;
  const answered = response !== null;
  const result = progress.results[phoneticPair];
  return `<section class="panel phonetic-quiz">
    <h2>听清是哪一个词</h2>
    <label class="phonetic-pair-label">选择易混音
      <select id="phonetic-pair">
        ${Phonetics.pairs.map(([a, b, wordA, wordB], index) =>
          `<option value="${index}" ${phoneticPair === index ? 'selected' : ''}>/${a}/ 和 /${b}/ · ${wordA} / ${wordB}</option>`).join('')}
      </select>
    </label>
    <p class="muted">这组答对 ${result?.correct || 0} / ${result?.attempts || 0} 次。先听，再选词。</p>
    <button type="button" class="primary" id="phonetic-play">♫ ${played ? '重播题目' : '播放题目'}</button>
    <div class="phonetic-options">${words.map((word, index) => `<button type="button"
      class="secondary${answered && index === answer ? ' phonetic-correct' : ''}"
      data-phonetic-answer="${index}" ${!played || answered ? 'disabled' : ''}>
      <strong lang="en">${word}</strong> <span class="phonetic-ipa">/${sounds[index]}/</span>
    </button>`).join('')}</div>
    <div role="status">${answered ? `<div class="feedback">
      <strong>${response === answer ? '答对了' : '这次听到的是 ' + words[answer]}</strong>
      <p>${hint}</p>
    </div>` : ''}</div>
    <div class="phonetic-actions">
      ${answered ? words.map(word => `<button type="button" class="secondary" data-say="${word}" data-accent="en-GB">♫ 对照听 ${word}</button>`).join('') : ''}
      <button type="button" class="secondary" id="phonetic-next-question">下一题并播放</button>
    </div>
  </section>`;
}

function phoneticsView() {
  const progress = phoneticProgress();
  return pageHeading('音标学习', '先认音标、跟读例词，再练容易听混的声音。') + `
    <section class="panel phonetic-intro">
      <p><strong>${progress.seen.length} / ${Phonetics.entries.length}</strong> 个音标已练习</p>
      <progress value="${progress.seen.length}" max="${Phonetics.entries.length}" aria-label="已练习音标"></progress>
      <p class="muted">以常见英式 IPA 为主。例词和听辨使用设备英语语音，不同设备的口音可能有差异。</p>
    </section>
    <div class="tabs phonetic-tabs" aria-label="音标练习类型">
      <button type="button" data-phonetic-tab="chart" class="${phoneticTab === 'chart' ? 'active' : ''}" aria-pressed="${phoneticTab === 'chart'}">认识音标</button>
      <button type="button" data-phonetic-tab="quiz" class="${phoneticTab === 'quiz' ? 'active' : ''}" aria-pressed="${phoneticTab === 'quiz'}">易混音听辨</button>
    </div>
    ${phoneticTab === 'chart' ? phoneticChart(progress) : phoneticQuiz(progress)}`;
}

function newPhoneticRound() {
  phoneticRound = { answer: Math.floor(Math.random() * 2), response: null, played: false };
}

function playPhoneticQuestion() {
  const word = Phonetics.pairs[phoneticPair][2 + phoneticRound.answer];
  speak(word, false, 'en-GB');
  if (!window.speechSynthesis || phoneticRound.response !== null) return;
  phoneticRound.played = true;
  document.querySelector('#phonetic-play').textContent = '♫ 重播题目';
  for (const button of document.querySelectorAll('[data-phonetic-answer]')) button.disabled = false;
}

function bindPhonetics() {
  if (location.hash !== '#phonetics') return;
  const soundTop = () => {
    cleanup();
    render();
    const title = document.querySelector('.phonetic-sound h2');
    title.tabIndex = -1;
    title.focus();
  };
  for (const button of document.querySelectorAll('[data-phonetic-sound]')) {
    button.onclick = () => {
      phoneticSound = Number(button.dataset.phoneticSound);
      soundTop();
    };
  }
  for (const button of document.querySelectorAll('[data-phonetic-tab]')) {
    button.onclick = () => {
      if (phoneticTab === button.dataset.phoneticTab) return;
      cleanup();
      phoneticTab = button.dataset.phoneticTab;
      if (phoneticTab === 'quiz') newPhoneticRound();
      render();
      document.querySelector('[data-phonetic-tab="' + phoneticTab + '"]').focus();
    };
  }
  document.querySelector('#phonetic-mark')?.addEventListener('click', () => {
    const progress = ensurePhoneticProgress();
    const position = progress.seen.indexOf(phoneticSound);
    if (position === -1) progress.seen.push(phoneticSound);
    else progress.seen.splice(position, 1);
    cleanup();
    save();
    render();
    document.querySelector('#phonetic-mark').focus({ preventScroll: true });
  });
  document.querySelector('#phonetic-next')?.addEventListener('click', () => {
    if (phoneticSound >= Phonetics.entries.length - 1) return;
    phoneticSound++;
    soundTop();
  });
  document.querySelector('#phonetic-pair')?.addEventListener('change', event => {
    cleanup();
    phoneticPair = Number(event.target.value);
    newPhoneticRound();
    render();
    document.querySelector('#phonetic-pair').focus();
  });
  document.querySelector('#phonetic-play')?.addEventListener('click', playPhoneticQuestion);
  document.querySelector('#phonetic-next-question')?.addEventListener('click', () => {
    newPhoneticRound();
    render();
    playPhoneticQuestion();
    document.querySelector('#phonetic-play').focus({ preventScroll: true });
  });
  for (const button of document.querySelectorAll('[data-phonetic-answer]')) {
    button.onclick = () => {
      if (!phoneticRound.played || phoneticRound.response !== null) return;
      phoneticRound.response = Number(button.dataset.phoneticAnswer);
      const progress = ensurePhoneticProgress();
      const result = progress.results[phoneticPair] ||= { attempts: 0, correct: 0 };
      if (result.attempts < Number.MAX_SAFE_INTEGER) {
        result.attempts++;
        if (phoneticRound.response === phoneticRound.answer) result.correct++;
      }
      save();
      render();
      document.querySelector('#phonetic-next-question').focus({ preventScroll: true });
    };
  }
}
