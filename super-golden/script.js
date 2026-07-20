// ===== SUPER GOLDEN タイピング =====
// アニメ・花吹雪・育つ木・コンボ・BGM/効果音（すべて外部ファイルなし）

// ---------- お題の単語 ----------
const words = [
  "apple", "banana", "orange", "grape", "peach", "lemon", "cherry",
  "computer", "keyboard", "javascript", "typing", "golden", "sparkle",
  "flower", "rainbow", "sunshine", "victory", "wonderful", "amazing",
  "school", "friend", "future", "dream", "magic", "star",
];

const TIME_LIMIT = 40; // 制限時間（秒）

// 木の成長ステージ（クリア数に応じて変わる）
const TREE_STAGES = ["🌱", "🌿", "🪴", "🌳", "🌳", "🎄"];
// 庭にまく花の絵文字
const FLOWERS = ["🌸", "🌷", "🌹", "🌻", "🌼", "💐", "🍀"];
// バーストで飛び散る絵文字
const BURST_EMOJI = ["✨", "⭐", "🎉", "💛", "🌟", "🥳", "🏆"];
// 花吹雪の絵文字
const PETALS = ["🌸", "🌼", "✨", "⭐", "💛", "🎊"];
// コンボで出る応援メッセージ
const CHEERS = ["いいね！", "ナイス！", "すごい！", "最高！", "天才！", "パーフェクト！"];

// ---------- 画面の要素 ----------
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const comboEl = document.getElementById("combo");
const clearedEl = document.getElementById("cleared");
const wordEl = document.getElementById("word");
const typedEl = document.getElementById("typed");
const startBtn = document.getElementById("startBtn");
const muteBtn = document.getElementById("muteBtn");
const treeEl = document.getElementById("tree");
const flowersEl = document.getElementById("flowers");
const fxLayer = document.getElementById("fx");
const sparklesEl = document.getElementById("sparkles");
const stageEl = document.querySelector(".stage");
const overlay = document.getElementById("overlay");
const overlayTitle = document.getElementById("overlayTitle");
const overlayScore = document.getElementById("overlayScore");
const overlayMsg = document.getElementById("overlayMsg");
const againBtn = document.getElementById("againBtn");

// ---------- ゲームの状態 ----------
let score = 0;
let combo = 0;
let bestCombo = 0;
let cleared = 0;
let timeLeft = TIME_LIMIT;
let currentWord = "";
let position = 0;
let timerId = null;
let playing = false;
let muted = false;

// ==================================================
//  音（WebAudio。ファイルなしでその場で音を作る）
// ==================================================
let audioCtx = null;
let bgmTimer = null;

function ensureAudio() {
  if (!audioCtx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (AC) audioCtx = new AC();
  }
  if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
}

// ポーン、という単発の音を鳴らす
function beep(freq, duration = 0.12, type = "sine", volume = 0.2) {
  if (!audioCtx || muted) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(volume, audioCtx.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
  osc.connect(gain).connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

// 効果音いろいろ
function sfxType() { beep(660 + combo * 20, 0.06, "square", 0.08); } // 1文字打った
function sfxClear() { // 単語クリア（明るい上昇音）
  [523, 659, 784, 1047].forEach((f, i) =>
    setTimeout(() => beep(f, 0.14, "triangle", 0.18), i * 70));
}
function sfxMiss() { beep(160, 0.18, "sawtooth", 0.12); } // ミス
function sfxEnd() {
  [784, 659, 523, 392].forEach((f, i) =>
    setTimeout(() => beep(f, 0.22, "triangle", 0.18), i * 130));
}

// BGM：明るいメロディをループ再生
const MELODY = [523, 587, 659, 784, 659, 587, 523, 587, 659, 523, 587, 494];
let melodyIndex = 0;
function startBgm() {
  stopBgm();
  if (muted) return;
  bgmTimer = setInterval(() => {
    if (muted || !audioCtx) return;
    const note = MELODY[melodyIndex % MELODY.length];
    beep(note, 0.18, "sine", 0.06);          // メロディ
    beep(note / 2, 0.22, "triangle", 0.04);  // 低音のハモリ
    melodyIndex++;
  }, 260);
}
function stopBgm() {
  if (bgmTimer) { clearInterval(bgmTimer); bgmTimer = null; }
}

// ==================================================
//  背景のキラキラ粒を作る
// ==================================================
function buildSparkles() {
  const marks = ["✨", "⭐", "💫", "🌟"];
  for (let i = 0; i < 22; i++) {
    const s = document.createElement("span");
    s.className = "sparkle";
    s.textContent = marks[i % marks.length];
    s.style.left = (i * 4.7 % 100) + "%";
    s.style.bottom = "-30px";
    s.style.fontSize = (12 + (i % 4) * 6) + "px";
    s.style.animationDuration = (7 + (i % 5) * 2) + "s";
    s.style.animationDelay = (i * 0.4) + "s";
    sparklesEl.appendChild(s);
  }
}

// ==================================================
//  エフェクト
// ==================================================
// 花吹雪を降らせる
function rainPetals(count) {
  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.className = "petal";
    p.textContent = PETALS[Math.floor(Math.random() * PETALS.length)];
    p.style.left = Math.random() * 100 + "%";
    p.style.setProperty("--drift", (Math.random() * 160 - 80) + "px");
    p.style.animationDuration = (2.2 + Math.random() * 1.8) + "s";
    p.style.fontSize = (18 + Math.random() * 18) + "px";
    fxLayer.appendChild(p);
    setTimeout(() => p.remove(), 4200);
  }
}

// 画面中央あたりから絵文字をパッと飛び散らせる
function burstEmoji(x, y, count) {
  for (let i = 0; i < count; i++) {
    const b = document.createElement("span");
    b.className = "burst";
    b.textContent = BURST_EMOJI[Math.floor(Math.random() * BURST_EMOJI.length)];
    b.style.left = x + "px";
    b.style.top = y + "px";
    const angle = (Math.PI * 2 * i) / count + Math.random();
    const dist = 90 + Math.random() * 120;
    b.style.setProperty("--bx", Math.cos(angle) * dist + "px");
    b.style.setProperty("--by", Math.sin(angle) * dist + "px");
    fxLayer.appendChild(b);
    setTimeout(() => b.remove(), 950);
  }
}

// 「いいね！」などの文字をポップ表示
function showPopup(text) {
  const p = document.createElement("span");
  p.className = "popup";
  p.textContent = text;
  p.style.left = "50%";
  p.style.top = "42%";
  fxLayer.appendChild(p);
  setTimeout(() => p.remove(), 1000);
}

// 木を育てる＆花を植える
function growGarden() {
  // クリア数でステージを決める
  const stageIndex = Math.min(TREE_STAGES.length - 1, Math.floor(cleared / 3));
  treeEl.textContent = TREE_STAGES[stageIndex];
  treeEl.style.fontSize = (40 + Math.min(cleared, 20) * 4) + "px";
  treeEl.classList.remove("grow");
  void treeEl.offsetWidth; // アニメを再スタートさせるおまじない
  treeEl.classList.add("grow");

  // 花を1つ庭にふやす
  const f = document.createElement("span");
  f.className = "flower";
  f.textContent = FLOWERS[Math.floor(Math.random() * FLOWERS.length)];
  f.style.left = (10 + Math.random() * 80) + "%";
  f.style.bottom = (5 + Math.random() * 60) + "px";
  flowersEl.appendChild(f);
  // 花が増えすぎたら古いものを消す
  if (flowersEl.children.length > 30) flowersEl.firstChild.remove();
}

// ==================================================
//  お題の表示
// ==================================================
function nextWord() {
  currentWord = words[Math.floor(Math.random() * words.length)];
  position = 0;
  renderWord();
}

function renderWord() {
  const done = currentWord.slice(0, position);
  const next = currentWord.charAt(position);
  const rest = currentWord.slice(position + 1);
  wordEl.innerHTML =
    `<span class="done">${done}</span>` +
    `<span class="next">${next}</span>` +
    rest;
  typedEl.textContent = done;
}

// HUD の数字を更新（ちょっと拡大するアニメ付き）
function bump(el) {
  el.classList.remove("bump");
  void el.offsetWidth;
  el.classList.add("bump");
}

// ==================================================
//  ゲームの進行
// ==================================================
function startGame() {
  ensureAudio();
  score = 0; combo = 0; bestCombo = 0; cleared = 0;
  timeLeft = TIME_LIMIT;
  playing = true;
  scoreEl.textContent = "0";
  timeEl.textContent = timeLeft;
  comboEl.textContent = "0";
  clearedEl.textContent = "0";
  flowersEl.innerHTML = "";
  treeEl.textContent = TREE_STAGES[0];
  treeEl.style.fontSize = "40px";
  overlay.classList.add("hidden");
  startBtn.disabled = true;
  nextWord();
  startBgm();

  timerId = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft <= 5) bump(timeEl); // 残りわずかでドキドキ
    if (timeLeft <= 0) endGame();
  }, 1000);
}

function endGame() {
  playing = false;
  clearInterval(timerId);
  stopBgm();
  startBtn.disabled = false;
  sfxEnd();
  rainPetals(40);

  // 結果を出す
  let emoji = "🌱", msg = "つぎはもっと育てよう！";
  if (cleared >= 20) { emoji = "🏆"; msg = "レジェンド級！すごすぎ！"; }
  else if (cleared >= 12) { emoji = "🌳"; msg = "立派な木に育ったね！"; }
  else if (cleared >= 6) { emoji = "🌿"; msg = "いい調子！"; }
  document.querySelector(".overlay-emoji").textContent = emoji;
  overlayTitle.textContent = "おつかれさま！";
  overlayScore.textContent = score + " 点";
  overlayMsg.textContent =
    `クリア ${cleared}語 ／ 最大コンボ ${bestCombo}　${msg}`;
  overlay.classList.remove("hidden");
}

// 1文字正解したとき
function onCorrectChar() {
  position++;
  renderWord();
  sfxType();
  if (position === currentWord.length) onWordClear();
}

// 単語を打ちきったとき（大きなお祝い）
function onWordClear() {
  cleared++;
  combo++;
  bestCombo = Math.max(bestCombo, combo);
  // コンボが多いほど高得点
  const gained = 10 + combo * 2;
  score += gained;

  scoreEl.textContent = score;
  comboEl.textContent = combo;
  clearedEl.textContent = cleared;
  bump(scoreEl); bump(comboEl); bump(clearedEl);

  // お祝いエフェクト
  const rect = wordEl.getBoundingClientRect();
  burstEmoji(rect.left + rect.width / 2, rect.top + rect.height / 2, 10 + Math.min(combo, 8));
  rainPetals(6 + Math.min(combo, 10));
  growGarden();
  sfxClear();

  // 画面をピカッ
  stageEl.classList.add("flash");
  setTimeout(() => stageEl.classList.remove("flash"), 200);

  // コンボがのってきたら応援メッセージ
  if (combo >= 2) {
    const cheer = combo >= 6 ? CHEERS[5]
      : CHEERS[Math.min(CHEERS.length - 2, combo - 1)];
    showPopup(`${cheer} ${combo}コンボ🔥`);
  }

  nextWord();
}

// ミスしたとき
function onMiss() {
  combo = 0;
  comboEl.textContent = "0";
  sfxMiss();
  stageEl.classList.add("shake");
  setTimeout(() => stageEl.classList.remove("shake"), 350);
}

// ==================================================
//  入力の受け取り
// ==================================================
document.addEventListener("keydown", (e) => {
  if (!playing) return;
  if (e.key.length !== 1) return; // 1文字のキーだけ受け取る
  if (e.key === currentWord[position]) {
    onCorrectChar();
  } else {
    onMiss();
  }
});

// ==================================================
//  ボタン
// ==================================================
startBtn.addEventListener("click", startGame);
againBtn.addEventListener("click", startGame);

muteBtn.addEventListener("click", () => {
  muted = !muted;
  muteBtn.textContent = muted ? "🔇" : "🔊";
  if (muted) {
    stopBgm();
  } else {
    ensureAudio();
    if (playing) startBgm();
  }
});

// 最初にキラキラ背景を作る
buildSparkles();
