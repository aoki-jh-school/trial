// ===== Blue版 タイピングゲーム =====
// このファイルを書きかえて、自分だけのゲームを作ってみよう！

// ============================================================
// 効果音（10種類）
// - 音源ファイルは使わず、Web Audio API でその場で音を作ります。
// - ゲームのどこからでも playCoin() のように呼び出せます。
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
  _tone(988, 0.12, "sine", 0); // ピン
  _tone(1319, 0.25, "sine", 0.12); // ポーン
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
  _tone(523, 0.15, "square", 0); // ド
  _tone(523, 0.15, "square", 0.15); // ド
  _tone(523, 0.15, "square", 0.3); // ド
  _tone(784, 0.5, "square", 0.45); // ソ（のばす）
}

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
  "dog",
  "cat",
  "fish",
  "bird",
  "horse",
  "cow",
  "pig",
  "sheep",
  "goat",
  "duck",
  "chicken",
  "rabbit",
  "mouse",
  "rat",
  "lion",
  "tiger",
  "bear",
  "wolf",
  "fox",
  "deer",
  "elephant",
  "monkey",
  "gorilla",
  "giraffe",
  "zebra",
  "kangaroo",
  "koala",
  "panda",
  "dolphin",
  "whale",
  "shark",
  "octopus",
  "crab",
  "shrimp",
  "turtle",
  "frog",
  "snake",
  "lizard",
  "spider",
  "ant",
  "bee",
  "fly",
  "mosquito",
  "butterfly",
  "beetle",
  "worm",
  "snail",
  "owl",
  "eagle",
  "hawk",
  "parrot",
  "penguin",
  "swan",
  "goose",
  "crow",
  "pigeon",
  "sparrow",
  "robin",
  "camel",
  "donkey",
  "mule",
  "buffalo",
  "squirrel",
  "hedgehog",
  "otter",
  "beaver",
  "bat",
  "seal",
  "grape",
  "lemon",
  "lime",
  "melon",
  "peach",
  "pear",
  "plum",
  "cherry",
  "mango",
  "kiwi",
  "berry",
  "strawberry",
  "blueberry",
  "pineapple",
  "coconut",
  "tomato",
  "potato",
  "carrot",
  "onion",
  "garlic",
  "pepper",
  "cabbage",
  "lettuce",
  "spinach",
  "cucumber",
  "pumpkin",
  "corn",
  "bean",
  "pea",
  "mushroom",
  "bread",
  "butter",
  "cheese",
  "milk",
  "egg",
  "meat",
  "beef",
  "pork",
  "bacon",
  "sausage",
  "rice",
  "noodle",
  "pasta",
  "pizza",
  "burger",
  "sandwich",
  "soup",
  "salad",
  "sugar",
  "salt",
  "honey",
  "jam",
  "cake",
  "cookie",
  "candy",
  "chocolate",
  "icecream",
  "juice",
  "water",
  "coffee",
  "tea",
  "wine",
  "beer",
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "pink",
  "brown",
  "black",
  "white",
  "gray",
  "silver",
  "gold",
  "beige",
  "violet",
  "indigo",
  "maroon",
  "happy",
  "sad",
  "angry",
  "tired",
  "sleepy",
  "hungry",
  "thirsty",
  "scared",
  "brave",
  "calm",
  "proud",
  "shy",
  "kind",
  "cruel",
  "gentle",
  "rude",
  "polite",
  "big",
  "small",
  "tall",
  "short",
  "long",
  "wide",
  "narrow",
  "thick",
  "thin",
  "heavy",
  "light",
  "fast",
  "slow",
  "strong",
  "weak",
  "young",
  "old",
  "new",
  "fresh",
  "hot",
  "cold",
  "warm",
  "cool",
  "dry",
  "wet",
  "clean",
  "dirty",
  "soft",
  "hard",
  "smooth",
  "rough",
  "sharp",
  "dull",
  "bright",
  "dark",
  "loud",
  "quiet",
  "good",
  "bad",
  "nice",
  "ugly",
  "pretty",
  "beautiful",
  "clever",
  "smart",
  "silly",
  "funny",
  "serious",
  "lazy",
  "busy",
  "free",
  "rich",
  "poor",
  "cheap",
  "run",
  "walk",
  "jump",
  "swim",
  "climb",
  "crawl",
  "drive",
  "ride",
  "push",
  "pull",
  "throw",
  "catch",
  "kick",
  "hit",
  "lift",
  "carry",
  "drop",
  "eat",
  "drink",
  "cook",
  "bake",
  "fry",
  "boil",
  "taste",
  "chew",
  "swallow",
  "bite",
  "sip",
  "pour",
  "mix",
  "stir",
  "slice",
  "chop",
  "peel",
  "serve",
  "read",
  "write",
  "draw",
  "paint",
  "color",
  "sing",
  "dance",
  "play",
  "listen",
  "speak",
  "talk",
  "shout",
  "whisper",
  "laugh",
  "cry",
  "smile",
  "frown",
  "think",
  "know",
  "learn",
  "teach",
  "study",
  "remember",
  "forget",
  "dream",
  "wonder",
  "guess",
  "plan",
  "decide",
  "choose",
  "believe",
  "doubt",
  "hope",
  "open",
  "close",
  "lock",
  "start",
  "stop",
  "wait",
  "rest",
  "sleep",
  "wake",
  "dress",
  "wash",
  "brush",
  "comb",
  "shave",
  "bathe",
  "tidy",
  "buy",
  "sell",
  "pay",
  "spend",
  "save",
  "earn",
  "lend",
  "borrow",
  "trade",
  "give",
  "take",
  "share",
  "keep",
  "lose",
  "find",
  "gather",
  "collect",
  "build",
  "make",
  "create",
  "design",
  "fix",
  "repair",
  "break",
  "cut",
  "fold",
  "bend",
  "twist",
  "tie",
  "knot",
  "glue",
  "nail",
  "screw",
  "hammer",
  "send",
  "receive",
  "call",
  "answer",
  "ring",
  "dial",
  "text",
  "email",
  "post",
  "mail",
  "deliver",
  "ship",
  "pack",
  "unpack",
  "wrap",
  "unwrap",
  "travel",
  "visit",
  "explore",
  "wander",
  "journey",
  "arrive",
  "depart",
  "return",
  "leave",
  "enter",
  "exit",
  "follow",
  "lead",
  "guide",
  "meet",
  "help",
  "protect",
  "guard",
  "rescue",
  "heal",
  "cure",
  "treat",
  "nurse",
  "care",
  "feed",
  "plant",
  "grow",
  "harvest",
  "house",
  "home",
  "room",
  "kitchen",
  "bedroom",
  "bathroom",
  "garden",
  "yard",
  "garage",
  "roof",
  "wall",
  "floor",
  "ceiling",
  "door",
  "window",
  "table",
  "chair",
  "sofa",
  "couch",
  "bed",
  "desk",
  "shelf",
  "drawer",
  "closet",
  "mirror",
  "lamp",
  "clock",
  "carpet",
  "curtain",
  "pillow",
  "blanket",
  "plate",
  "bowl",
  "cup",
  "glass",
  "fork",
  "spoon",
  "knife",
  "pot",
  "pan",
  "kettle",
  "bottle",
  "jar",
  "basket",
  "bucket",
  "broom",
  "mop",
  "sponge",
  "phone",
  "laptop",
  "tablet",
  "screen",
  "cable",
  "charger",
  "battery",
  "camera",
  "printer",
  "speaker",
  "radio",
  "television",
  "remote",
  "car",
  "truck",
  "bus",
  "train",
  "plane",
  "boat",
  "bike",
  "scooter",
  "subway",
  "taxi",
  "ferry",
  "rocket",
  "helicopter",
  "tractor",
  "wagon",
  "road",
  "street",
  "bridge",
  "tunnel",
  "station",
  "airport",
  "harbor",
  "port",
  "highway",
  "path",
  "trail",
  "avenue",
  "lane",
  "corner",
  "crossing",
  "city",
  "town",
  "village",
  "country",
  "nation",
  "world",
  "island",
  "beach",
  "mountain",
  "river",
  "lake",
  "ocean",
  "forest",
  "desert",
  "valley",
  "hill",
  "tree",
  "flower",
  "grass",
  "leaf",
  "branch",
  "root",
  "seed",
  "bush",
  "vine",
  "moss",
  "fern",
  "cactus",
  "bamboo",
  "palm",
  "oak",
  "pine",
  "maple",
  "sun",
  "moon",
  "star",
  "cloud",
  "sky",
  "rain",
  "snow",
  "wind",
  "storm",
  "thunder",
  "lightning",
  "rainbow",
  "fog",
  "frost",
  "ice",
  "heat",
  "spring",
  "summer",
  "autumn",
  "winter",
  "season",
  "weather",
  "morning",
  "noon",
  "evening",
  "night",
  "today",
  "tomorrow",
  "yesterday",
  "week",
  "month",
  "year",
  "hour",
  "minute",
  "second",
  "time",
  "date",
  "calendar",
  "alarm",
  "schedule",
  "moment",
  "period",
  "future",
  "past",
  "teacher",
  "student",
  "doctor",
  "lawyer",
  "judge",
  "police",
  "officer",
  "soldier",
  "pilot",
  "driver",
  "farmer",
  "baker",
  "chef",
  "waiter",
  "artist",
  "singer",
  "dancer",
  "actor",
  "writer",
  "painter",
  "builder",
  "plumber",
  "engineer",
  "scientist",
  "banker",
  "cashier",
  "clerk",
  "book",
  "paper",
  "pencil",
  "pen",
  "eraser",
  "ruler",
  "marker",
  "crayon",
  "notebook",
  "folder",
  "envelope",
  "stamp",
  "scissors",
  "tape",
  "number",
  "letter",
  "word",
  "sentence",
  "story",
  "poem",
  "question",
  "lesson",
  "subject",
  "grade",
  "class",
  "homework",
  "test",
  "exam",
  "music",
  "song",
  "sound",
  "noise",
  "voice",
  "melody",
  "rhythm",
  "beat",
  "drum",
  "piano",
  "guitar",
  "violin",
  "flute",
  "trumpet",
  "horn",
  "bell",
  "sport",
  "team",
  "player",
  "coach",
  "match",
  "score",
  "goal",
  "win",
  "race",
  "field",
  "court",
  "track",
  "pool",
  "gym",
  "ball",
  "net",
  "money",
  "coin",
  "bill",
  "cash",
  "card",
  "price",
  "cost",
  "value",
  "budget",
  "market",
  "shop",
  "store",
  "mall",
  "bank",
  "office",
  "company",
  "factory",
  "family",
  "father",
  "mother",
  "parent",
  "brother",
  "sister",
  "child",
  "baby",
  "son",
  "daughter",
  "uncle",
  "aunt",
  "cousin",
  "grandpa",
  "grandma",
  "friend",
  "neighbor",
  "stranger",
  "guest",
  "visitor",
  "partner",
  "leader",
  "member",
  "group",
  "crowd",
  "people",
  "person",
  "human",
  "name",
  "love",
  "like",
  "hate",
  "fear",
  "worry",
  "enjoy",
  "prefer",
  "wish",
  "want",
  "need",
  "miss",
  "trust",
  "respect",
  "admire",
  "ignore",
  "blame",
  "thank",
  "begin",
  "finish",
  "continue",
  "repeat",
  "change",
  "improve",
  "reduce",
  "increase",
  "shrink",
  "expand",
  "spread",
  "divide",
  "count",
  "add",
  "subtract",
  "measure",
  "weigh",
  "compare",
  "sort",
  "order",
  "arrange",
  "separate",
  "combine",
  "connect",
  "watch",
  "look",
  "see",
  "notice",
  "observe",
  "stare",
  "glance",
  "view",
  "show",
  "hide",
  "cover",
  "reveal",
  "appear",
  "vanish",
  "shine",
  "glow",
  "head",
  "face",
  "eye",
  "ear",
  "nose",
  "mouth",
  "lip",
  "tooth",
  "tongue",
  "neck",
  "shoulder",
  "arm",
  "elbow",
  "hand",
  "finger",
  "thumb",
  "chest",
  "back",
  "waist",
  "hip",
  "leg",
  "knee",
  "ankle",
  "foot",
  "toe",
  "heel",
  "skin",
  "bone",
  "muscle",
  "heart",
  "brain",
  "blood",
  "breath",
  "shirt",
  "pants",
  "skirt",
  "coat",
  "jacket",
  "sweater",
  "hat",
  "cap",
  "scarf",
  "glove",
  "sock",
  "shoe",
  "boot",
  "belt",
  "button",
  "honest",
  "loyal",
  "patient",
  "curious",
  "cheerful",
  "careful",
  "careless",
  "helpful",
  "work",
  "job",
  "task",
  "project",
  "report",
  "meeting",
  "deadline",
  "idea",
  "problem",
  "solution",
  "result",
  "success",
  "ticket",
  "luggage",
  "suitcase",
  "passport",
  "map",
  "hotel",
  "tour",
  "trip",
  "flight",
  "gate",
  "seat",
  "japan",
  "china",
  "korea",
  "india",
  "france",
  "spain",
  "italy",
  "germany",
  "england",
  "russia",
  "canada",
  "brazil",
  "egypt",
  "kenya",
  "mexico",
  "tokyo",
  "osaka",
  "kyoto",
  "paris",
  "london",
  "berlin",
  "rome",
  "madrid",
  "moscow",
  "beijing",
  "seoul",
  "cairo",
  "sydney",
  "boston",
  "chicago",
  "north",
  "south",
  "east",
  "west",
  "left",
  "right",
  "center",
  "middle",
  "front",
  "behind",
  "above",
  "below",
  "inside",
  "outside",
  "near",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "hundred",
  "first",
  "third",
  "fourth",
  "fifth",
  "last",
  "next",
  "final",
  "early",
  "late",
  "soon",
  "later",
  "before",
  "after",
  "during",
  "until",
  "candle",
  "towel",
  "soap",
  "shampoo",
  "toothbrush",
  "razor",
  "tissue",
  "napkin",
  "fountain",
  "statue",
  "bench",
  "fence",
  "hedge",
  "lawn",
  "pond",
  "patio",
  "balcony",
  "porch",
  "stairs",
  "elevator",
  "hallway",
  "bakery",
  "butcher",
  "grocery",
  "pharmacy",
  "library",
  "museum",
  "theater",
  "cinema",
  "stadium",
  "hospital",
  "clinic",
  "breakfast",
  "lunch",
  "dinner",
  "supper",
  "snack",
  "meal",
  "recipe",
  "menu",
  "tip",
  "oven",
  "reason",
  "cause",
  "effect",
  "meaning",
  "purpose",
  "method",
  "example",
  "detail",
  "fact",
  "opinion",
  "topic",
  "message",
  "sign",
  "symbol",
  "picture",
  "image",
  "photo",
  "drawing",
  "chart",
  "graph",
  "list",
  "note",
  "memo",
  "shape",
  "size",
  "weight",
  "length",
  "width",
  "height",
  "depth",
  "speed",
  "force",
  "power",
  "energy",
  "laughter",
  "comfort",
  "peace",
  "safety",
  "danger",
  "trouble",
  "accident",
  "mistake",
  "failure",
  "victory",
  "reward",
  "prize",
  "gift",
  "sunrise",
  "sunset",
  "shadow",
  "reflection",
  "horizon",
  "breeze",
  "puddle",
  "stream",
  "waterfall",
  "cliff",
  "cave",
  "rock",
  "stone",
  "canyon",
  "meadow",
  "prairie",
  "jungle",
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
const labelEl = document.getElementById("label");

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
  const done = currentWord.slice(0, position);
  const rest = currentWord.slice(position);
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
  labelEl.textContent = "";
}

// ▼ キーが押されたときの処理
document.addEventListener("keydown", (e) => {
  if (!playing) return;
  // 記号や特殊キーは無視（1文字のキーだけ受け取る）
  if (e.key.length !== 1) return;

  const expected = currentWord[position];
  if (e.key === expected) {
    // 正解！
    position++;
    labelEl.textContent = "good";
    renderWord();

    if (position === currentWord.length) {
      // 1単語すべて打てた
      if (timeLeft <= 20) {
        score += 20;
      } else {
        score += 10;
      }

      labelEl.textContent = "正解";
      scoreEl.textContent = score;

      playCorrect();
      nextWord();
    }
  } else {
    // ミス
    miss++;
    missEl.textContent = miss;
    labelEl.textContent = "miss";
  }
  document.body.classList.add("miss-flash");
  setTimeout(() => {
    document.body.classList.remove("miss-flash");
  }, 100); // 0.1秒後に元に戻す
});

// ▼ スタートボタンを押したらゲーム開始
startBtn.addEventListener("click", startGame);
