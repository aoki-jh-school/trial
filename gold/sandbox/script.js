// ===== JavaScript サンドボックス =====
// console.log の結果をページ内に表示するので、DevTools は不要です。

// ============================================================
// 効果音（10種類）
// - 音源ファイルは使わず、Web Audio API でその場で音を作ります。
// - すべて「グローバル関数」なので、下のエディタに書いたコードからも
//   playCoin() のように呼び出せます。
// ============================================================

// 音を鳴らすための AudioContext（最初に音を鳴らすときに1回だけ作る）
let _audioCtx = null;
function _getAudioCtx() {
  if (!_audioCtx) {
    _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  // ブラウザによっては一時停止状態なので、鳴らす前に再開する
  if (_audioCtx.state === "suspended") _audioCtx.resume();
  return _audioCtx;
}

// 1つの音（オシレーター）を鳴らす小さな部品
// freq=高さ(Hz) / duration=長さ(秒) / type=波形 / delay=鳴らし始めるまでの待ち(秒)
function _tone(freq, duration, type = "square", delay = 0, gain = 0.2) {
  const ctx = _getAudioCtx();
  const start = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const amp = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  // プツッというノイズを防ぐため、音量をなめらかに立ち上げ・立ち下げする
  amp.gain.setValueAtTime(0.0001, start);
  amp.gain.exponentialRampToValueAtTime(gain, start + 0.01);
  amp.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(amp).connect(ctx.destination);
  osc.start(start);
  osc.stop(start + duration + 0.02);
  return osc;
}

// ホワイトノイズ（爆発音などに使う「ザーッ」という音）を鳴らす部品
function _noise(duration, delay = 0, gain = 0.3) {
  const ctx = _getAudioCtx();
  const start = ctx.currentTime + delay;
  const frames = Math.floor(ctx.sampleRate * duration);
  const buffer = ctx.createBuffer(1, frames, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < frames; i++) data[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  const amp = ctx.createGain();
  amp.gain.setValueAtTime(gain, start);
  amp.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  src.connect(amp).connect(ctx.destination);
  src.start(start);
  src.stop(start + duration);
}

// ① ビープ：シンプルな「ピッ」
function playBeep() {
  _tone(880, 0.15, "square");
}

// ② ピンポン（正解）：高い音を2つ「ピン・ポーン」
function playCorrect() {
  _tone(988, 0.12, "sine", 0);      // ピン
  _tone(1319, 0.25, "sine", 0.12);  // ポーン
}

// ③ ブブー（不正解）：低い音が2回「ブッ・ブー」
function playWrong() {
  _tone(196, 0.18, "sawtooth", 0);
  _tone(147, 0.3, "sawtooth", 0.2);
}

// ④ コイン：ゲームでコインを取ったときの「チャリン♪」
function playCoin() {
  _tone(988, 0.08, "square", 0);
  _tone(1319, 0.3, "square", 0.08);
}

// ⑤ ジャンプ：低い音から高い音へ「ヒュン」と上がる
function playJump() {
  const ctx = _getAudioCtx();
  const start = ctx.currentTime;
  const osc = ctx.createOscillator();
  const amp = ctx.createGain();
  osc.type = "square";
  osc.frequency.setValueAtTime(300, start);
  osc.frequency.exponentialRampToValueAtTime(900, start + 0.15);
  amp.gain.setValueAtTime(0.2, start);
  amp.gain.exponentialRampToValueAtTime(0.0001, start + 0.2);
  osc.connect(amp).connect(ctx.destination);
  osc.start(start);
  osc.stop(start + 0.22);
}

// ⑥ レーザー：高い音から低い音へ「キュイーン」と下がる
function playLaser() {
  const ctx = _getAudioCtx();
  const start = ctx.currentTime;
  const osc = ctx.createOscillator();
  const amp = ctx.createGain();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(1200, start);
  osc.frequency.exponentialRampToValueAtTime(200, start + 0.3);
  amp.gain.setValueAtTime(0.2, start);
  amp.gain.exponentialRampToValueAtTime(0.0001, start + 0.32);
  osc.connect(amp).connect(ctx.destination);
  osc.start(start);
  osc.stop(start + 0.34);
}

// ⑦ ばくはつ：ノイズ＋低い音で「ドーン」
function playExplosion() {
  _noise(0.5, 0, 0.4);
  _tone(80, 0.5, "sawtooth", 0, 0.3);
}

// ⑧ パワーアップ：音がだんだん上がる「テッテッテッテー↑」
function playPowerUp() {
  const notes = [523, 659, 784, 1047]; // ド・ミ・ソ・高いド
  notes.forEach((f, i) => _tone(f, 0.15, "square", i * 0.1));
}

// ⑨ クリック：ボタンを押したような「コッ」という短い音
function playClick() {
  _tone(1000, 0.05, "square", 0, 0.15);
}

// ⑩ ファンファーレ：「タターン！」というお祝いの音
function playFanfare() {
  _tone(523, 0.15, "square", 0);      // ド
  _tone(523, 0.15, "square", 0.15);   // ド
  _tone(523, 0.15, "square", 0.3);    // ド
  _tone(784, 0.5, "square", 0.45);    // ソ（のばす）
}

// ▼ レッスン一覧（title=見出し / desc=説明 / code=最初に入っているコード）
const lessons = [
  {
    title: "コメント //  : メモ書き",
    desc: "「//」から後ろはパソコンには伝わらないメモ。実行しても何も起きないよ。",
    code: `// ここはパソコンには伝わらないメモ
// メモは自分やほかの人が読むためのもの

console.log("メモの下の行は動くよ")`,
  },
  {
    title: "変数 let : 値を入れておく箱のような存在",
    desc: "書いてみて、結果を予想してから「実行」ボタンを押してみよう。",
    code: `let a = "おはよう"
let b = "こんにちは"
let c = 123
let d = a + b
let e = a

console.log(a)
console.log(b)
console.log(c)
console.log(d)
console.log(e)`,
  },
  {
    title: "分岐 if (else) : 条件によって動きを変える",
    desc: "a の中身を変えて実行すると、結果がどう変わるだろう？",
    code: `let a = "fox"

if (a === "fox") {
  console.log("foxがきた")
} else {
  console.log("なにかな？")
}`,
  },
  {
    title: "配列 [] : 値の集まり",
    desc: "たくさんの値をまとめて扱うときに便利。番号（0からはじまる）で取り出せるよ。",
    code: `let a = "bar"
let b = [1, 2, 3, "あ", "い", "う", a]

console.log(b)
console.log(b[0])
console.log(b[1])
console.log(b[6])`,
  },
  {
    title: "辞書 Object / 連想配列 {} : キーワードと値のペア",
    desc: "番号ではなく「キーワード（名前）」で値を取り出せる。User などのグループに便利。",
    code: `let a = { "a": 111, "b": 222 }
a["c"] = 333

console.log(a)
console.log(a["a"])
console.log(a["c"])`,
  },
  {
    title: "繰り返し for : 処理を繰り返したり、値を探すときに",
    desc: "同じ処理を何回も書かずにすむ。下の書き方は「何番目か」も取れて便利。",
    code: `let a = ["アタリ", "ハズレ", "あたり", "fox", "end"]

for (let i in a) {
  console.log(i)
}

for (let i = 0; i < a.length; i += 1) {
  console.log(a[i])
}`,
  },
];

// ▼ 値を見やすい文字にする（配列やObjectもきれいに表示）
function format(value) {
  if (typeof value === "string") return value;
  if (value === undefined) return "undefined";
  if (value === null) return "null";
  if (typeof value === "object") {
    try {
      return JSON.stringify(value);
    } catch (e) {
      return String(value);
    }
  }
  return String(value);
}

// ▼ コードを実行して、console.log の結果を集める
function runCode(code, outputEl) {
  const logs = [];

  // 本物の console.log を一時的に差しかえて、出力を横取りする
  const original = {
    log: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error,
  };
  const capture = (...args) => {
    logs.push({ type: "log", text: args.map(format).join(" ") });
  };
  console.log = capture;
  console.info = capture;
  console.warn = capture;
  console.error = capture;

  let errorMessage = null;
  try {
    // ユーザーが書いたコードを実行
    new Function(code)();
  } catch (e) {
    errorMessage = e.name + ": " + e.message;
  } finally {
    // 差しかえた console を必ず元に戻す
    console.log = original.log;
    console.info = original.info;
    console.warn = original.warn;
    console.error = original.error;
  }

  // 結果を画面に表示
  outputEl.innerHTML = "";
  if (logs.length === 0 && !errorMessage) {
    const span = document.createElement("span");
    span.className = "placeholder";
    span.textContent = "（出力はありませんでした）";
    outputEl.appendChild(span);
  }
  logs.forEach((l) => {
    const line = document.createElement("span");
    line.className = "line";
    line.textContent = l.text;
    outputEl.appendChild(line);
  });
  if (errorMessage) {
    const line = document.createElement("span");
    line.className = "line err";
    line.textContent = "⚠ エラー: " + errorMessage;
    outputEl.appendChild(line);
  }
}

// ▼ レッスンカードを1枚作る
function createCard(lesson) {
  const card = document.createElement("section");
  card.className = "card";

  const h2 = document.createElement("h2");
  h2.textContent = lesson.title;

  const desc = document.createElement("p");
  desc.className = "desc";
  desc.textContent = lesson.desc;

  const editor = document.createElement("textarea");
  editor.className = "editor";
  editor.spellcheck = false;
  editor.value = lesson.code;

  const buttons = document.createElement("div");
  buttons.className = "buttons";

  const runBtn = document.createElement("button");
  runBtn.className = "run-btn";
  runBtn.textContent = "▶ 実行";

  const clearBtn = document.createElement("button");
  clearBtn.className = "clear-btn";
  clearBtn.textContent = "結果をけす";

  buttons.appendChild(runBtn);
  buttons.appendChild(clearBtn);

  const output = document.createElement("div");
  output.className = "output";
  const placeholder = document.createElement("span");
  placeholder.className = "placeholder";
  placeholder.textContent = "ここに結果が出ます";
  output.appendChild(placeholder);

  // 実行ボタン
  runBtn.addEventListener("click", () => runCode(editor.value, output));
  // 結果を消すボタン
  clearBtn.addEventListener("click", () => {
    output.innerHTML = "";
    const span = document.createElement("span");
    span.className = "placeholder";
    span.textContent = "ここに結果が出ます";
    output.appendChild(span);
  });
  // Ctrl+Enter / Cmd+Enter でも実行できる
  editor.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      runCode(editor.value, output);
    }
  });

  card.appendChild(h2);
  card.appendChild(desc);
  card.appendChild(editor);
  card.appendChild(buttons);
  card.appendChild(output);
  return card;
}

// ▼ すべてのカードを画面に並べる
const container = document.getElementById("lessons");
lessons.forEach((lesson) => container.appendChild(createCard(lesson)));
