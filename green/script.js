// ▼ 単語リスト
const words = [
  { japanese: "トイレに行きたいです", roma: "toireniikitaidesu" },
  { japanese: "部屋が汚い", roma: "heyagakitanai" },
  { japanese: "人間はゴリラの仲間", roma: "ninngennhagoriranonakama" },
  { japanese: "超高性能コンピューター", roma: "tyoukouseinoukonnpyu-ta-" },
  { japanese: "キーボードタイピング", roma: "ki-bo-dotaipinngu" },
  { japanese: "プログラミング教室", roma: "puroguraminngukyoushitu" },
  { japanese: "ここから先は通さない", roma: "kokokarasakihatoosanai" },
  { japanese: "休みの日にゲームし放題", roma: "yasuminohinige-mushihoudai" },
  { japanese: "青木中学校", roma: "aokityuugakkou" }
];

// ▼ ゲームの設定
const TIME_LIMIT = 60; // 制限時間（秒）

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
let combo = 0;
let timeLeft = TIME_LIMIT;
let currentWord = null;
let position = 0;
let timerId = null;
let playing = false;
let isFever = false; // フィーバー状態フラグ

// ==========================================
// 🎵 サウンドエンジン (Web Audio API)
// ==========================================
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let bgmInterval = null;

// 音階データ
const normalBgmNotes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25]; // C4〜C5
const feverBgmNotes = [523.25, 659.25, 783.99, 880.00, 1046.50, 1174.66, 1318.51, 1567.98]; // C5〜G6 (オクターブ高め)
let bgmStep = 0;

// BGM再生・切り替え
function updateBGM() {
  if (bgmInterval) clearInterval(bgmInterval);
  if (!playing) return;

  if (audioCtx.state === 'suspended') audioCtx.resume();

  // フィーバー時はテンポを爆速(60ms)、通常時は(120ms)
  const tempo = isFever ? 60 : 120;
  const notes = isFever ? feverBgmNotes : normalBgmNotes;

  bgmInterval = setInterval(() => {
    if (!playing) return;
    
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    // フィーバー時は鋸波(sawtooth)で激しく、通常は矩形波(square)
    osc.type = isFever ? 'sawtooth' : 'square';
    
    const noteIndex = (bgmStep * 3) % notes.length;
    const freq = notes[noteIndex]; 
    
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    // 音量設定（フィーバー時は少し主張を強く）
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

// 1文字正解音（フィーバー時はピッチアップ＆ビブラート）
function playComboTypeSound() {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.type = isFever ? 'triangle' : 'sine';
  
  // フィーバー時は基底ピッチを高く設定
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

// 単語クリア音（フィーバー時はド派手な和音）
function playWordClearSound() {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  
  const chord = isFever 
    ? [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98, 2093.00] // 豪華7和音
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

// ミス音
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

// フィーバー突入時のサウンド（ジャキーン！）
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
// 💥 エフェクト処理
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

// フィーバー状態の開始
function startFeverMode() {
  isFever = true;
  document.body.classList.add('fever-mode');
  playFeverStartSound();
  updateBGM(); // テンポアップBGMへ切り替え
  
  // フィーバー突入テロップ表示
  const feverNotice = document.createElement("div");
  feverNotice.className = "fever-notice";
  feverNotice.textContent = "🔥 FEVER TIME! SCORE x2 🔥";
  document.body.appendChild(feverNotice);
  setTimeout(() => feverNotice.remove(), 1200);
}

// ==========================================
// 🎮 ゲーム基本処理
// ==========================================
function nextWord() {
  const index = Math.floor(Math.random() * words.length);
  currentWord = words[index];
  position = 0;
  renderWord();
}

function renderWord() {
  const done = currentWord.roma.slice(0, position);
  const rest = currentWord.roma.slice(position);
  
  wordEl.innerHTML = `
    <div class="ja-word">${currentWord.japanese}</div>
    <div class="roma-word"><span class="done">${done}</span>${rest}</div>
  `;
  typedEl.textContent = done;
}

function startGame() {
  score = 0;
  miss = 0;
  combo = 0;
  timeLeft = TIME_LIMIT;
  playing = true;
  isFever = false;
  
  document.body.classList.remove('fever-mode');
  scoreEl.textContent = score;
  missEl.textContent = miss;
  timeEl.textContent = timeLeft;
  resultEl.textContent = "";
  startBtn.disabled = true;
  inputEl.value = "";
  inputEl.focus();
  nextWord();
  
  updateBGM(); // 通常BGM再生

  timerId = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    
    // 残り20秒でフィーバーモード突入！
    if (timeLeft === 20 && !isFever) {
      startFeverMode();
    }
    
    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function endGame() {
  playing = false;
  isFever = false;
  document.body.classList.remove('fever-mode');
  clearInterval(timerId);
  stopBGM();
  
  startBtn.disabled = false;
  wordEl.innerHTML = '<div class="ja-word">おつかれさま！</div>';
  typedEl.textContent = "";
  resultEl.textContent = `スコア: ${score}点／ミス: ${miss}回`;
}

// キー入力処理
document.addEventListener("keydown", (e) => {
  if (!playing) return;
  if (e.key.length !== 1) return;

  inputEl.focus();

  const expected = currentWord.roma[position];
  if (e.key === expected) {
    position++;
    combo++;
    renderWord();

    triggerEffect('correct');

    if (position === currentWord.roma.length) {
      playWordClearSound();
      triggerEffect('word-complete');

      // スコア加算（残り20秒以下なら2倍の20点）
      score += (timeLeft <= 20) ? 20 : 10;
      
      scoreEl.textContent = score;
      inputEl.value = "";
      nextWord();
    } else {
      playComboTypeSound();
    }

  } else {
    combo = 0;
    miss++;
    missEl.textContent = miss;
    playMissSound();
    triggerEffect('miss');
  }
});

startBtn.addEventListener("click", startGame);