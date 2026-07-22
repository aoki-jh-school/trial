// ===== green版 タイピングゲーム =====
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

// ▼ お題になる単語リスト（日本語・ひらがな・ローマ字の50単語）
const words = [
  { text: "リンゴ", kana: "りんご", romaji: "ringo" },
  { text: "バナナ", kana: "ばなな", romaji: "banana" },
  { text: "ミカン", kana: "みかん", romaji: "mikan" },
  { text: "ブドウ", kana: "ぶどう", romaji: "budou" },
  { text: "イチゴ", kana: "いちご", romaji: "ichigo" },
  { text: "モモ", kana: "もも", romaji: "momo" },
  { text: "スイカ", kana: "すいか", romaji: "suika" },
  { text: "メロン", kana: "めろん", romaji: "meron" },
  { text: "犬", kana: "いぬ", romaji: "inu" },
  { text: "猫", kana: "ねこ", romaji: "neko" },
  { text: "鳥", kana: "とり", romaji: "tori" },
  { text: "魚", kana: "さかな", romaji: "sakana" },
  { text: "馬", kana: "うま", romaji: "uma" },
  { text: "牛", kana: "うし", romaji: "ushi" },
  { text: "豚", kana: "ぶた", romaji: "buta" },
  { text: "ウサギ", kana: "うさぎ", romaji: "usagi" },
  { text: "クマ", kana: "くま", romaji: "kuma" },
  { text: "ライオン", kana: "らいおん", romaji: "raion" },
  { text: "トラ", kana: "とら", romaji: "tora" },
  { text: "ゾウ", kana: "ぞう", romaji: "zou" },
  { text: "サル", kana: "さる", romaji: "saru" },
  { text: "ペンギン", kana: "ぺんぎん", romaji: "pengin" },
  { text: "イルカ", kana: "いるか", romaji: "iruka" },
  { text: "パソコン", kana: "ぱそこん", romaji: "pasokon" },
  { text: "ゲーム", kana: "げーむ", romaji: "ge-mu" },
  { text: "学校", kana: "がっこう", romaji: "gakkou" },
  { text: "先生", kana: "せんせい", romaji: "sensei" },
  { text: "友達", kana: "ともだち", romaji: "tomodachi" },
  { text: "本", kana: "ほん", romaji: "hon" },
  { text: "机", kana: "つくえ", romaji: "tsukue" },
  { text: "椅子", kana: "いす", romaji: "isu" },
  { text: "鉛筆", kana: "えんぴつ", romaji: "enpitsu" },
  { text: "時計", kana: "とけい", romaji: "tokei" },
  { text: "電車", kana: "でんしゃ", romaji: "densya" },
  { text: "車", kana: "くるま", romaji: "kuruma" },
  { text: "飛行機", kana: "ひこうき", romaji: "hikouki" },
  { text: "船", kana: "ふね", romaji: "fune" },
  { text: "山", kana: "やま", romaji: "yama" },
  { text: "川", kana: "かわ", romaji: "kawa" },
  { text: "海", kana: "うみ", romaji: "umi" },
  { text: "桜", kana: "さくら", romaji: "sakura" },
  { text: "雨", kana: "あめ", romaji: "ame" },
  { text: "雪", kana: "ゆき", romaji: "yuki" },
  { text: "晴れ", kana: "はれ", romaji: "hare" },
  { text: "曇り", kana: "くもり", romaji: "kumori" },
  { text: "日本", kana: "にほん", romaji: "nihon" },
  { text: "空", kana: "そら", romaji: "sora" },
  { text: "星", kana: "ほし", romaji: "hoshi" },
  { text: "月", kana: "つき", romaji: "tsuki" },
  { text: "花", kana: "はな", romaji: "hana" }
];