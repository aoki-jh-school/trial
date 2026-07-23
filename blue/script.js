const words = [
  { "japanese": "メメントリ", "roma": "mementori" },
  { "japanese": "はるてぃー", "roma": "haruty-" },
  { "japanese": "うた", "roma": "uta" },
  { "japanese": "じおる", "roma": "jioru" },
  { "japanese": "そろもん", "roma": "soromon" },
  { "japanese": "あすた", "roma": "asuta" },
  { "japanese": "つきの", "roma": "tukino" },
  { "japanese": "ごんざれす", "roma": "gonzaresu" },
  { "japanese": "ねむろ", "roma": "nemuro" },
  { "japanese": "青終高校", "roma": "aohasikoukou" },
  { "japanese": "遊戯部", "roma": "yuugibu" },
  { "japanese": "部員", "roma": "buin" },
  { "japanese": "たまアリ", "roma": "tamaari" },
  { "japanese": "マインクラフト", "roma": "mainkurafuto" },
  { "japanese": "マイクラ", "roma": "maikura" },
  { "japanese": "実況者", "roma": "zikkyousya" },
  { "japanese": "ゲーム実況", "roma": "ge-muzikkyou" },
  { "japanese": "企画", "roma": "kikaku" },
  { "japanese": "サブメンバー", "roma": "sabumenba-" },
  { "japanese": "ユーチューブ", "roma": "yu-tyu-bu" },
  { "japanese": "チャンネル", "roma": "tyanneru" },
  { "japanese": "歌ってみた", "roma": "utattemita" },
  { "japanese": "動画編集", "roma": "dougahensyuu" }
 
];

// ローマ字辞書
const ROMA_MAP = {
  "あ":["a"],"い":["i"],"う":["u","wu"],"え":["e"],"お":["o"],
  "か":["ka"],"き":["ki"],"く":["ku"],"け":["ke"],"こ":["ko"],
  "さ":["sa"],"し":["si","shi","ci"],"す":["su"],"せ":["se"],"そ":["so"],
  "た":["ta"],"ち":["ti","chi"],"つ":["tu","tsu"],"て":["te"],"と":["to"],
  "な":["na"],"に":["ni"],"ぬ":["nu"],"ね":["ne"],"の":["no"],
  "は":["ha"],"ひ":["hi"],"ふ":["fu","hu"],"へ":["he"],"ほ":["ho"],
  "ま":["ma"],"み":["mi"],"む":["mu"],"め":["me"],"も":["mo"],
  "や":["ya"],"ゆ":["yu"],"よ":["yo"],
  "ら":["ra"],"り":["ri"],"る":["ru"],"れ":["re"],"ろ":["ro"],
  "わ":["wa"],"ゐ":["wi"],"ゑ":["we"],"を":["wo"],"ん":["nn","n"],
  "が":["ga"],"ぎ":["gi"],"ぐ":["gu"],"げ":["ge"],"ご":["go"],
  "ざ":["za"],"じ":["ji","zi"],"ず":["zu"],"ぜ":["ze"],"ぞ":["zo"],
  "だ":["da"],"ぢ":["di"],"づ":["du"],"で":["de"],"ど":["do"],
  "ば":["ba"],"び":["bi"],"ぶ":["bu"],"べ":["be"],"ぼ":["bo"],
  "ぱ":["pa"],"ぴ":["pi"],"ぷ":["pu"],"ぺ":["pe"],"ぽ":["po"],
  "きゃ":["kya"],"きぃ":["kyi"],"きゅ":["kyu"],"きぇ":["kye"],"きょ":["kyo"],
  "しゃ":["sya","sha"],"しぃ":["syi"],"しゅ":["syu","shu"],"しぇ":["sye","she"],"しょ":["syo","sho"],
  "ちゃ":["tya","cha"],"ちぃ":["tyi"],"ちゅ":["tyu","chu"],"ちぇ":["tye","che"],"ちょ":["tyo","cho"],
  "にゃ":["nya"],"にぃ":["nyi"],"にゅ":["nyu"],"にぇ":["nye"],"にょ":["nyo"],
  "ひゃ":["hya"],"ひぃ":["hyi"],"ひゅ":["hyu"],"ひぇ":["hye"],"ひょ":["hyo"],
  "みゃ":["mya"],"みぃ":["myi"],"みゅ":["myu"],"みぇ":["mye"],"みょ":["myo"],
  "りゃ":["rya"],"りぃ":["ryi"],"りゅ":["ryu"],"りぇ":["rye"],"りょ":["ryo"],
  "ぎゃ":["gya"],"ぎぃ":["gyi"],"ぎゅ":["gyu"],"ぎぇ":["gye"],"ぎょ":["gyo"],
  "じゃ":["ja","zya"],"じぃ":["jyi","zyi"],"じゅ":["ju","zyu"],"じぇ":["je","zye"],"じょ":["jo","zyo"],
  "ぢゃ":["dya"],"ぢぃ":["dyi"],"ぢゅ":["dyu"],"ぢぇ":["dye"],"ぢょ":["dyo"],
  "びゃ":["bya"],"びぃ":["byi"],"びゅ":["byu"],"びぇ":["bye"],"びょ":["byo"],
  "ぴゃ":["pya"],"ぴぃ":["pyi"],"ぴゅ":["pyu"],"ぴぇ":["pye"],"ぴょ":["pyo"],
  "てぃ":["thi","texi","teli","txi"],"てゅ":["thu","texyu","telyu"],
  "でぃ":["dhi","dexi","deli","dxi"],"でゅ":["dhu","dexyu","delyu"],
  "とぅ":["twu","toi","toxu","tolu"],"どぅ":["dwu","doi","doxu","dolu"],
  "ふぁ":["fa","fuxa","fula"],"ふぃ":["fi","fuxi","fuli"],"ふぇ":["fe","fuxe","fule"],"ふぉ":["fo","fuxo","fulo"],
  "うぃ":["wi","uxi","uli"],"うぇ":["we","uxe","ule"],"うぉ":["who","uxo","ulo"],
  "くぁ":["kwa","kuxa"],"ぐぁ":["gwa","guxa"],
  "ぁ":["xa","la"],"ぃ":["xi","li"],"ぅ":["xu","lu"],"ぇ":["xe","le"],"ぉ":["xo","lo"],
  "っ":["ltu","xtu","tsu"],"ー":["-"]

// ▼ ゲームの設定
const TIME_LIMIT = 100; // 制限時間（秒）

// ▼ HTML の要素を取得
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const missEl = document.getElementById("miss");
const wordEl = document.getElementById("word");
const typedEl = document.getElementById("typed");
const inputEl = document.getElementById("input");
const startBtn = document.getElementById("startBtn");
const resultEl = document.getElementById("result");

// ▼ ゲームの状態を覚えておく変数
let score = 0;
let miss = 0;
let timeLeft = TIME_LIMIT;
let currentWord = null;
let position = 0;
let timerId = null;
let playing = false;

// ▼ 新しいお題を出す
function nextWord() {
  const index = Math.floor(Math.random() * words.length);
  currentWord = words[index];
  position = 0;
  renderWord();
}


// ▼ お題を画面に表示する
function renderWord() {
  const done = currentWord.roma.slice(0, position);
  const rest = currentWord.roma.slice(position);
  
  wordEl.innerHTML = `
    <div class="ja-word">${currentWord.japanese}</div>
    <div class="roma-word"><span class="done">${done}</span>${rest}</div>
  `;
  typedEl.textContent = done;
}

// ▼ ゲームスタート
function startGame() {
  score = 0;
  miss = 0;
  timeLeft = TIME_LIMIT;
  playing = true;
  scoreEl.textContent = score;
  missEl.textContent = miss;
  timeEl.textContent = timeLeft;
  resultEl.textContent = "";
  startBtn.disabled = true;
  inputEl.value = "";
  inputEl.focus();
  nextWord();

  // 1秒ごとに時間をへらす
  timerId = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      end
 Game();
    }
  }, 1000);
}

// ▼ ゲーム終了
function endGame() {
  playing = false;
  clearInterval(timerId);
  startBtn.disabled = false;
  wordEl.innerHTML = '<div class="ja-word">おつかれさま！</div>';
  typedEl.textContent = "";
  resultEl.textContent = `スコア: ${score}点／ミス: ${miss}回`;
}

// ▼ キーが押されたときの処理
document.addEventListener("keydown", (e) => {
  if (!playing) return;
  if (e.key.length !== 1) return;

  //
  inputEl.focus();

  const expected = currentWord.roma[position];
  if (e.key === expected) {
    position++;
    renderWord();
    if (position === currentWord.roma.length) {
      score += 10;
      scoreEl.textContent = score;
      inputEl.value = "";
      nextWord();
    }
  } else {
    miss++;
    missEl.textContent = miss;
  }
}); 

// ▼ スタートボタンを押したらゲーム開始
startBtn.addEventListener("click", startGame);

// ==========================================
// 🎵 サウンドエンジン (Web Audio API)
// ==========================================
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let bgmInterval = null;

const normalBgmNotes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];
const feverBgmNotes = [523.25, 659.25, 783.99, 880.00, 1046.50, 1174.66, 1318.51, 1567.98];
let bgmStep = 0;

function updateBGM() {
  if (bgmInterval) clearInterval(bgmInterval);
  if (!playing) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();

  const tempo = isFever ? 60 : 120;
  const notes = isFever ? feverBgmNotes : normalBgmNotes;

  bgmInterval = setInterval(() => {
    if (!playing) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = isFever ? 'sawtooth' : 'square';
    const noteIndex = (bgmStep * 3) % notes.length;
    const freq = notes[noteIndex]; 
    
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    const vol = isFever ? 0.03 : 0.02;
    gain.gain.setValueAtTime(vol, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + (tempo / 1000));
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + (tempo / 1000));
    bgmStep++;
  }, tempo);
}

function stopBGM() {
  if (bgmInterval) {
    clearInterval(bgmInterval);
    bgmInterval = null;
  }
}

function playComboTypeSound() {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = isFever ? 'triangle' : 'sine';
  const baseFreq = isFever ? 880 : 523.25; 
  const pitchShift = Math.min(combo, 20) * (isFever ? 50 : 30);
  const freq = baseFreq + pitchShift;
  
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(freq * 1.3, audioCtx.currentTime + 0.05);
  gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.05);
}

function playWordClearSound() {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const chord = isFever 
    ? [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98, 2093.00]
    : [523.25, 659.25, 783.99, 1046.50, 1318.51];
    
  chord.forEach((freq, i) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'triangle';
    const delay = i * (isFever ? 0.02 : 0.03);
    
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime + delay);
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + delay + 0.3);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(audioCtx.currentTime + delay);
    osc.stop(audioCtx.currentTime + delay + 0.3);
  });
}

function playMissSound() {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(180, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.2);
  gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.2);
}

function playFeverStartSound() {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const notes = [440, 554.37, 659.25, 880];
  notes.forEach((freq) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.4);
  });
}

// ==========================================
// 💥 演出関数
// ==========================================
function triggerEffect(type) {
  if (type === 'correct') {
    wordEl.classList.remove('pop-anim');
    void wordEl.offsetWidth;
    wordEl.classList.add('pop-anim');
  } else if (type === 'miss') {
    document.body.classList.remove('shake-anim');
    void document.body.offsetWidth;
    document.body.classList.add('shake-anim');
  } else if (type === 'word-complete') {
    document.body.classList.remove('fever-flash');
    void document.body.offsetWidth;
    document.body.classList.add('fever-flash');
  }
}

function startFeverMode() {
  isFever = true;
  document.body.classList.add('fever-mode');
  playFeverStartSound();
  updateBGM();
  
  const feverNotice = document.createElement("div");
  feverNotice.className = "fever-notice";
  feverNotice.textContent = "🔥 FEVER TIME! SCORE x2 🔥";
  document.body.appendChild(feverNotice);
  setTimeout(() => feverNotice.remove(), 1200);
}
