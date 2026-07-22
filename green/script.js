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
let combo = 0; // コンボ数
let timeLeft = TIME_LIMIT;
let currentWord = null;
let position = 0;
let timerId = null;
let playing = false;

// ==========================================
// 🎵 サウンドエンジン (Web Audio API)
// ==========================================
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let bgmInterval = null;
const bgmNotes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];
let bgmStep = 0;

// BGM再生
function startBGM() {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  bgmStep = 0;
  bgmInterval = setInterval(() => {
    if (!playing) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'square';
    const noteIndex = (bgmStep * 3) % bgmNotes.length;
    const freq = bgmNotes[noteIndex] / (bgmStep % 2 === 0 ? 2 : 1); 
    
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
    bgmStep++;
  }, 120);
}

// BGM停止
function stopBGM() {
  if (bgmInterval) {
    clearInterval(bgmInterval);
    bgmInterval = null;
  }
}

// 正解音（コンボで音高アップ）
function playComboTypeSound() {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  const pitchShift = Math.min(combo, 20) * 30;
  const baseFreq = 523.25 + pitchShift;
  
  osc.frequency.setValueAtTime(baseFreq, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.2, audioCtx.currentTime + 0.05);
  gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.05);
}

// 単語クリアファンファーレ
function playWordClearSound() {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const chord = [523.25, 659.25, 783.99, 1046.50, 1318.51]; 
  chord.forEach((freq, i) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime + i * 0.03);
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime + i * 0.03);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + i * 0.03 + 0.25);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(audioCtx.currentTime + i * 0.03);
    osc.stop(audioCtx.currentTime + i * 0.03 + 0.25);
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

// ==========================================
// 💥 画面エフェクト関数
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

// ==========================================
// 🎮 ゲーム基本処理
// ==========================================

// お題を出す
function nextWord() {
  const index = Math.floor(Math.random() * words.length);
  currentWord = words[index];
  position = 0;
  renderWord();
}

// お題の表示
function renderWord() {
  const done = currentWord.roma.slice(0, position);
  const rest = currentWord.roma.slice(position);
  
  wordEl.innerHTML = `
    <div class="ja-word">${currentWord.japanese}</div>
    <div class="roma-word"><span class="done">${done}</span>${rest}</div>
  `;
  typedEl.textContent = done;
}

// ゲームスタート
function startGame() {
  score = 0;
  miss = 0;
  combo = 0;
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
  
  startBGM(); // BGM再生

  timerId = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

// ゲーム終了
function endGame() {
  playing = false;
  clearInterval(timerId);
  stopBGM(); // BGM停止
  startBtn.disabled = false;
  wordEl.innerHTML = '<div class="ja-word">おつかれさま！</div>';
  typedEl.textContent = "";
  resultEl.textContent = `スコア: ${score}点／ミス: ${miss}回`;
}

// キー入力判定
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

      if (timeLeft <= 20) {
        score += 20;
      } else {
        score += 10;
      }
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

// スタートボタンのクリックイベント
startBtn.addEventListener("click", startGame);