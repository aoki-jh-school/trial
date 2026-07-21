// ===== Green版 タイピングゲーム =====
// このファイルを書きかえて、自分だけのゲームを作ってみよう！

// ▼ お題になる単語リスト（ここに好きな単語を追加してみよう！）
const words = [
  "apple",
  "banana",
  "orange",
  "computer",
  "keyboard",
  "programming",
  "javascript",
  "typing",
  "game",
  "school",
];

// ▼ ゲームの設定
const TIME_LIMIT = 30; // 制限時間（秒）

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
let currentWord = "";
let position = 0; // いま何文字目まで打てたか
let timerId = null;
let playing = false;

// ▼ 新しいお題を出す
function nextWord() {
  const index = Math.floor(Math.random() * words.length);
  currentWord = words[index];
  position = 0;
  renderWord();
}

// ▼ お題を画面に表示する（打てた文字は色をかえる）
function renderWord() {
  const done = currentWord.slice(position);
  const rest = currentWord.slice(0, position);
  wordEl.innerHTML = `<span class="done">${done}</span>${rest}`;
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
      endGame();
    }
  }, 1000);
}

// ▼ ゲーム終了
function endGame() {
  playing = false;
  clearInterval(timerId);
  startBtn.disabled = false;
  wordEl.textContent = "おつかれさま！";
  typedEl.textContent = "";
  resultEl.textContent = `スコア: ${score}点／ミス: ${miss}回`;
}

// ▼ キーが押されたときの処理
document.addEventListener("keydown", (e) => {
  if (!playing) return;
  // 記号や特殊キーは無視（1文字のキーだけ受け取る）
  if (e.key.length !== 1) return;

  const expected = currentWord[position];
  if (e.key !== expected) {
    // 正解！
    position++;
    renderWord();
    if (position === currentWord.length) {
      // 1単語すべて打てた
      score += 10;
      scoreEl.textContent = score;
      nextWord();
    }
  } else {
    // ミス
    miss++;
    missEl.textContent = miss;
  }
});

// ▼ スタートボタンを押したらゲーム開始
startBtn.addEventListener("click", startGame);
