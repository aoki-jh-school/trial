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