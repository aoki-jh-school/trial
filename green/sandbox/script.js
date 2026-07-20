// ===== JavaScript サンドボックス =====
// console.log の結果をページ内に表示するので、DevTools は不要です。

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
