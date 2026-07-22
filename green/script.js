// ==========================================
// 1. お題データベース（ひらがな付き）
// ==========================================
const ALL_WORDS = [
  // 【かんたん：4文字以内】
  { japanese: "いぬ", kana: "いぬ" },
  { japanese: "ねこ", kana: "ねこ" },
  { japanese: "とり", kana: "とり" },
  { japanese: "さる", kana: "さる" },
  { japanese: "うま", kana: "うま" },
  { japanese: "くま", kana: "くま" },
  { japanese: "りす", kana: "りす" },
  { japanese: "かめ", kana: "かめ" },
  { japanese: "うし", kana: "うし" },
  { japanese: "ぶた", kana: "ぶた" },
  { japanese: "はな", kana: "はな" },
  { japanese: "みず", kana: "みず" },
  { japanese: "やま", kana: "やま" },
  { japanese: "かわ", kana: "かわ" },
  { japanese: "うみ", kana: "うみ" },
  { japanese: "そら", kana: "そら" },
  { japanese: "あめ", kana: "あめ" },
  { japanese: "ゆき", kana: "ゆき" },
  { japanese: "ほし", kana: "ほし" },
  { japanese: "つき", kana: "つき" },

  // 【ふつう：5〜10文字】
  { japanese: "部屋が汚い", kana: "へやがきたない" },
  { japanese: "青木中学校", kana: "あおきちゅうがっこう" },
  { japanese: "りんごあめ", kana: "りんごあめ" },
  { japanese: "カレーライス", kana: "かれーらいす" },
  { japanese: "おこのみやき", kana: "おこのみやき" },
  { japanese: "チョコレート", kana: "ちょこれーと" },
  { japanese: "スマホゲーム", kana: "すまほげーむ" },
  { japanese: "けしごむ", kana: "けしごむ" },
  { japanese: "しんかんせん", kana: "しんかんせん" },
  { japanese: "ひこうき", kana: "ひこうき" },
  { japanese: "じてんしゃ", kana: "じてんしゃ" },
  { japanese: "きゅうきゅうしゃ", kana: "きゅうきゅうしゃ" },
  { japanese: "しょうぼうしゃ", kana: "しょうぼうしゃ" },
  { japanese: "富士山登頂", kana: "ふじさんとうちょう" },
  { japanese: "雪だるま", kana: "ゆきだるま" },

  // 【むずかしい：11文字以上】
  { japanese: "トイレに行きたいです", kana: "といれにいきたいです" },
  { japanese: "人間はゴリラの仲間", kana: "にんげんはごりらのなかま" },
  { japanese: "超高性能コンピューター", kana: "ちょうこうせいのうこんぴゅーたー" },
  { japanese: "キーボードタイピング", kana: "きーぼーどたいぴんぐ" },
  { japanese: "プログラミング教室", kana: "ぷろぐらみんぐきょうしつ" },
  { japanese: "ここから先は通さない", kana: "ここからさきはとおさない" },
  { japanese: "休みの日にゲームし放題", kana: "やすみのひにげーむしほうだい" },
  { japanese: "早起きは三文の徳", kana: "はやおきはさんもんのとく" },
  { japanese: "急がば回れの精神", kana: "いそがばまわれのせいしん" },
  { japanese: "東京スカイツリータワー", kana: "とうきょうすかいつりーたわー" }
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
};

// ==========================================
// 2. 柔軟入力判定クラス（んの1打/2打 完全両立版）
// ==========================================
class FlexibleTypingEngine {
  constructor(kana) {
    this.kana = kana;
    this.kanaIndex = 0;
    this.typedBuffer = "";
    this.displayRomaDone = "";
    this.displayRomaRest = "";
    this.pendingN = false; // 「ん」の1文字目の n を保持しているフラグ
    this.updateDisplay();
  }

  updateDisplay() {
    let restKana = this.kana.slice(this.kanaIndex);
    let restRoma = "";

    // 「ん」を n 1回だけで入力中の状態
    if (this.pendingN) {
      restRoma += "n";
      restKana = restKana.slice(1);
    } else if (this.patterns && this.patterns.length > 0) {
      const currentPattern = this.patterns[0];
      restRoma += currentPattern.romaji.slice(this.typedBuffer.length);
      restKana = restKana.slice(currentPattern.kanaLength);
    }

    while (restKana.length > 0) {
      let patterns = this.getPatternsAt(restKana);
      if (patterns.length > 0) {
        restRoma += patterns[0].romaji;
        restKana = restKana.slice(patterns[0].kanaLength);
      } else {
        restKana = restKana.slice(1);
      }
    }

    this.displayRomaRest = restRoma;
  }

  getPatternsAt(restKana) {
    let patterns = [];

    // っ（促音）
    if (restKana.startsWith("っ") && restKana.length > 1) {
      const nextKanaRest = restKana.slice(1);
      const nextPatterns = this.getPatternsAt(nextKanaRest);
      for (let np of nextPatterns) {
        const firstChar = np.romaji[0];
        if (firstChar && !"aeiounn".includes(firstChar)) {
          patterns.push({ romaji: firstChar, kanaLength: 1 });
        }
      }
    }

    // 辞書マッチング
    for (let len = 3; len >= 1; len--) {
      if (restKana.length >= len) {
        const sub = restKana.slice(0, len);
        if (ROMA_MAP[sub]) {
          for (let r of ROMA_MAP[sub]) {
            patterns.push({ romaji: r, kanaLength: len });
          }
        }
      }
    }

    return patterns;
  }

  inputKey(key) {
    const restKana = this.kana.slice(this.kanaIndex);

    // --- 「ん」の n 1打目の後の特別判定 ---
    if (this.pendingN) {
      if (key === 'n') {
        // 2打目の n が来たら 「ん (nn)」 を確定
        this.pendingN = false;
        this.kanaIndex += 1;
        this.typedBuffer = "";
        this.displayRomaDone += key;
        this.updateDisplay();
        return true;
      } else {
        // n 以外のキーが来たら「ん (n 1回分)」を確定させ、そのまま次の文字の入力として評価
        const nextChar = restKana[1];
        const isNextVowelOrY = nextChar && "あいうえおやゆよ".includes(nextChar);

        // 母音・ヤ行の前でなければ 1打打ち成立
        if (!isNextVowelOrY) {
          this.pendingN = false;
          this.kanaIndex += 1;
          this.typedBuffer = "";
          // 判定を次へと進めるため下へ抜ける
        } else {
          // 母音・ヤ行の前で n 1回＋別キーはミス
          this.pendingN = false;
          return false;
        }
      }
    }

    // --- 通常の判定 ---
    const currentRestKana = this.kana.slice(this.kanaIndex);
    this.patterns = this.getPatternsAt(currentRestKana);

    // 「ん」の単体入力開始で n が押された場合
    if (currentRestKana.startsWith("ん") && this.typedBuffer === "" && key === "n") {
      this.pendingN = true;
      this.displayRomaDone += key;
      this.updateDisplay();
      return true;
    }

    const nextBuffer = this.typedBuffer + key;
    let matchedPattern = null;

    for (let p of this.patterns) {
      if (p.romaji.startsWith(nextBuffer)) {
        matchedPattern = p;
        break;
      }
    }

    if (matchedPattern) {
      this.typedBuffer = nextBuffer;
      this.displayRomaDone += key;

      if (this.typedBuffer === matchedPattern.romaji) {
        this.kanaIndex += matchedPattern.kanaLength;
        this.typedBuffer = "";
        this.patterns = null;
      }

      this.updateDisplay();
      return true;
    }

    return false;
  }

  isComplete() {
    return this.kanaIndex >= this.kana.length && !this.pendingN;
  }
}

// ==========================================
// 3. ゲーム管理変数 & DOM取得
// ==========================================
const TIME_LIMIT = 60;

const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const missEl = document.getElementById("miss");
const wordEl = document.getElementById("word");
const typedEl = document.getElementById("typed");
const inputEl = document.getElementById("input");
const startBtn = document.getElementById("startBtn");
const resultEl = document.getElementById("result");
const difficultyEl = document.getElementById("difficulty");

let score = 0;
let miss = 0;
let combo = 0;
let timeLeft = TIME_LIMIT;
let currentWord = null;
let engine = null;
let timerId = null;
let playing = false;
let isFever = false;
let activeWordList = [];

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

// ==========================================
// 🎮 ゲーム進行ロジック
// ==========================================
function filterWordsByDifficulty() {
  const diff = difficultyEl ? difficultyEl.value : 'normal';

  activeWordList = ALL_WORDS.filter(w => {
    const len = w.kana.length;
    if (diff === 'easy') return len <= 4;
    if (diff === 'normal') return len >= 5 && len <= 10;
    if (diff === 'hard') return len >= 11;
    return true;
  });

  if (activeWordList.length === 0) activeWordList = ALL_WORDS;
}

function nextWord() {
  const index = Math.floor(Math.random() * activeWordList.length);
  currentWord = activeWordList[index];
  engine = new FlexibleTypingEngine(currentWord.kana);
  renderWord();
}

function renderWord() {
  wordEl.innerHTML = `
    <div class="ja-word">${currentWord.japanese}</div>
    <div class="roma-word"><span class="done">${engine.displayRomaDone}</span>${engine.displayRomaRest}</div>
  `;
  typedEl.textContent = engine.displayRomaDone;
}

function startGame() {
  filterWordsByDifficulty();

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
  if (difficultyEl) difficultyEl.disabled = true;
  inputEl.value = "";
  inputEl.focus();
  nextWord();
  
  updateBGM();

  timerId = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    
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
  if (difficultyEl) difficultyEl.disabled = false;
  wordEl.innerHTML = '<div class="ja-word">おつかれさま！</div>';
  typedEl.textContent = "";
  resultEl.textContent = `スコア: ${score}点／ミス: ${miss}回`;
}

// キー入力イベント
document.addEventListener("keydown", (e) => {
  if (!playing) return;
  if (e.key.length !== 1) return;

  inputEl.focus();

  const isCorrect = engine.inputKey(e.key.toLowerCase());

  if (isCorrect) {
    combo++;
    renderWord();
    triggerEffect('correct');

    if (engine.isComplete()) {
      playWordClearSound();
      triggerEffect('word-complete');
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