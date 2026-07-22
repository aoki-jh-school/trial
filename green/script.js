// ▼ お題データベース（200語以上）
const ALL_WORDS = [
  // 【かんたん：6文字以内】
  { japanese: "いぬ", roma: "inu" },
  { japanese: "ねこ", roma: "neko" },
  { japanese: "とり", roma: "tori" },
  { japanese: "さる", roma: "saru" },
  { japanese: "うま", roma: "uma" },
  { japanese: "くま", roma: "kuma" },
  { japanese: "りす", roma: "risu" },
  { japanese: "かめ", roma: "kame" },
  { japanese: "うし", roma: "usi" },
  { japanese: "ぶた", roma: "buta" },
  { japanese: "はな", roma: "hana" },
  { japanese: "みず", roma: "mizu" },
  { japanese: "やま", roma: "yama" },
  { japanese: "かわ", roma: "kawa" },
  { japanese: "うみ", roma: "umi" },
  { japanese: "そら", roma: "sora" },
  { japanese: "あめ", roma: "ame" },
  { japanese: "ゆき", roma: "yuki" },
  { japanese: "ほし", roma: "hosi" },
  { japanese: "つき", roma: "tuki" },
  { japanese: "ひかり", roma: "hikari" },
  { japanese: "あさ", roma: "asa" },
  { japanese: "よる", roma: "yoru" },
  { japanese: "ほん", roma: "honn" },
  { japanese: "かみ", roma: "kami" },
  { japanese: "ペン", roma: "penn" },
  { japanese: "つくえ", roma: "tukue" },
  { japanese: "いす", roma: "isu" },
  { japanese: "くつ", roma: "kutu" },
  { japanese: "ふく", roma: "fuku" },
  { japanese: "かさ", roma: "kasa" },
  { japanese: "かぎ", roma: "kagi" },
  { japanese: "はこ", roma: "hako" },
  { japanese: "たまご", roma: "tamago" },
  { japanese: "パン", roma: "pann" },
  { japanese: "すし", roma: "susi" },
  { japanese: "にく", roma: "niku" },
  { japanese: "こめ", roma: "kome" },
  { japanese: "みかん", roma: "mikann" },
  { japanese: "いちご", roma: "itigo" },
  { japanese: "すいか", roma: "suika" },
  { japanese: "あか", roma: "aka" },
  { japanese: "あお", roma: "ao" },
  { japanese: "しろ", roma: "siro" },
  { japanese: "くろ", roma: "kuro" },
  { japanese: "きいろ", roma: "kiiro" },
  { japanese: "みどり", roma: "midori" },
  { japanese: "みみ", roma: "mimi" },
  { japanese: "め", roma: "me" },
  { japanese: "て", roma: "te" },
  { japanese: "あし", roma: "asi" },
  { japanese: "かお", roma: "kao" },
  { japanese: "こころ", roma: "kokoro" },
  { japanese: "とも", roma: "tomo" },
  { japanese: "ゆめ", roma: "yume" },
  { japanese: "あけ", roma: "ake" },
  { japanese: "にし", roma: "nisi" },
  { japanese: "ひがし", roma: "higasi" },
  { japanese: "みなみ", roma: "minami" },
  { japanese: "きた", roma: "kita" },
  { japanese: "なつ", roma: "natu" },
  { japanese: "ふゆ", roma: "fuyu" },
  { japanese: "はる", roma: "haru" },
  { japanese: "あき", roma: "aki" },
  { japanese: "かぜ", roma: "kaze" },
  { japanese: "なみ", roma: "nami" },
  { japanese: "もり", roma: "mori" },
  { japanese: "き", roma: "ki" },
  { japanese: "くさ", roma: "kusa" },
  { japanese: "つち", roma: "tuti" },

  // 【ふつう：7〜13文字】
  { japanese: "部屋が汚い", roma: "heyagakitanai" },
  { japanese: "青木中学校", roma: "aokityuugakkou" },
  { japanese: "りんごあめ", roma: "rinngoame" },
  { japanese: "カレーライス", roma: "kare-raisu" },
  { japanese: "おこのみやき", roma: "okonomiyaki" },
  { japanese: "ホットドッグ", roma: "hottodoggu" },
  { japanese: "ハンバーガー", roma: "hannba-ga-" },
  { japanese: "ソフトクリーム", roma: "sofutokuri-mu" },
  { japanese: "チョコレート", roma: "tyokore-to" },
  { japanese: "スマホゲーム", roma: "sumahoge-mu" },
  { japanese: "ノートパソコン", roma: "no-topasokonn" },
  { japanese: "ヘッドフォン", roma: "heddofonn" },
  { japanese: "テレビゲーム", roma: "terebige-mu" },
  { japanese: "えんぴつけずり", roma: "ennpitukezuri" },
  { japanese: "シャープペン", roma: "sha-pupenn" },
  { japanese: "けしごむ", roma: "kesigomu" },
  { japanese: "きょうかしょ", roma: "kyoukasyo" },
  { japanese: "たいいくかん", roma: "taiikukann" },
  { japanese: "うんどうかい", roma: "unndoukai" },
  { japanese: "しゅうがくりょこう", roma: "syuugakuryokou" },
  { japanese: "なつやすみ", roma: "natuyasumi" },
  { japanese: "ふゆやすみ", roma: "fuyuyasumi" },
  { japanese: "クリスマス", roma: "kurisumasu" },
  { japanese: "お正月", roma: "osougatatu" },
  { japanese: "たんじょうび", roma: "tanjyoubi" },
  { japanese: "プレゼント", roma: "purezentou" },
  { japanese: "しんかんせん", roma: "sinnkannsenn" },
  { japanese: "ひこうき", roma: "hikouki" },
  { japanese: "じてんしゃ", roma: "jitensya" },
  { japanese: "パトカー", roma: "patoka-" },
  { japanese: "きゅうきゅうしゃ", roma: "kyuukyuusya" },
  { japanese: "しょうぼうしゃ", roma: "syoubousya" },
  { japanese: "宇宙飛行士", roma: "utyuuhikousi" },
  { japanese: "プログラマー", roma: "purogurama-" },
  { japanese: "サッカーボール", roma: "sakka-bo-ru" },
  { japanese: "バスケット", roma: "basuketto" },
  { japanese: "バレーボール", roma: "bare-bo-ru" },
  { japanese: "すいえい教室", roma: "suieikyousitu" },
  { japanese: "マラソン大会", roma: "marasontaikai" },
  { japanese: "金メダル", roma: "kinmedaru" },
  { japanese: "銀メダル", roma: "ginmedaru" },
  { japanese: "銅メダル", roma: "doumedaru" },
  { japanese: "富士山登頂", roma: "fujisannotou" },
  { japanese: "桜の花びら", roma: "sakuranohanabi" },
  { japanese: "ひまわり畑", roma: "himawaribatake" },
  { japanese: "紅葉狩り", roma: "momijigari" },
  { japanese: "雪だるま", roma: "yukidaruma" },
  { japanese: "流れ星", roma: "nagarebosi" },
  { japanese: "天の川", roma: "amanogawa" },
  { japanese: "ブラックホール", roma: "burakkuho-ru" },
  { japanese: "タイムマシン", roma: "taimumasinn" },
  { japanese: "人工知能", roma: "jinni intelligence" },
  { japanese: "仮想現実", roma: "kasougennjitu" },
  { japanese: "サイバー攻撃", roma: "saiba-kougeki" },
  { japanese: "パスワード設定", roma: "pasuwa-dosettei" },
  { japanese: "ログイン成功", roma: "roguinseikou" },
  { japanese: "検索エンジン", roma: "kennsakuennjinn" },
  { japanese: "動画配信", roma: "dougahaisinn" },
  { japanese: "SNS投稿", roma: "snstoukou" },
  { japanese: "オンライン授業", roma: "onrainnjugyou" },
  { japanese: "電子マネー", roma: "dennsimane-" },
  { japanese: "キャッシュレス", roma: "kyasshyuresu" },
  { japanese: "自動販売機", roma: "jidouhnnbaiki" },
  { japanese: "コンビニ弁当", roma: "konnbinibennntou" },
  { japanese: "ファミリーレストラン", roma: "famiresu" },
  { japanese: "ファーストフード", roma: "fa-sutofu-do" },
  { japanese: "ドリンクバー", roma: "dorinnkuba-" },
  { japanese: "フライドポテト", roma: "furaidopoteto" },
  { japanese: "アイスクリーム", roma: "aisukuri-mu" },
  { japanese: "ホットケーキ", roma: "hottoke-ki" },
  { japanese: "ショートケーキ", roma: "syo-toke-ki" },

  // 【むずかしい：14文字以上】
  { japanese: "トイレに行きたいです", roma: "toireniikitaidesu" },
  { japanese: "人間はゴリラの仲間", roma: "ninngennhagoriranonakama" },
  { japanese: "超高性能コンピューター", roma: "tyoukouseinoukonnpyu-ta-" },
  { japanese: "キーボードタイピング", roma: "ki-bo-dotaipinngu" },
  { japanese: "プログラミング教室", roma: "puroguraminngukyoushitu" },
  { japanese: "ここから先は通さない", roma: "kokokarasakihatoosanai" },
  { japanese: "休みの日にゲームし放題", roma: "yasuminohinige-mushihoudai" },
  { japanese: "明日の天気は晴れのち雨", roma: "asitatenukihaharenotiame" },
  { japanese: "宿題が終わらない夜", roma: "syukudaigaowaranaiyoru" },
  { japanese: "早起きは三文の徳", roma: "hasaokihasannmonnnotoku" },
  { japanese: "急がば回れの精神", roma: "isogabamawarunoseisinn" },
  { japanese: "塵も積もれば山となる", roma: "tirimotumorebayamatonaru" },
  { japanese: "犬も歩けば棒に当たる", roma: "inumowarukebabouniataru" },
  { japanese: "猿も木から落ちる", roma: "sarumokikaraotiru" },
  { japanese: "百聞は一見に如かず", roma: "hyakubunnhaikkennnijikazu" },
  { japanese: "棚からぼたもち", roma: "tanakarabotamotii" },
  { japanese: "笑う門には福来る", roma: "waraukadonihahukukitaru" },
  { japanese: "一石二鳥をねらう", roma: "issekinityouwonerau" },
  { japanese: "三日坊主で終わる", roma: "mikkabouzudeowaru" },
  { japanese: "十人十色の考え方", roma: "juuninntoirokaanggata" },
  { japanese: "東京スカイツリータワー", roma: "toukyousukaituri-tawa-" },
  { japanese: "都道府県覚えるテスト", roma: "todoufukennoboerutesuto" },
  { japanese: "夏休みの自由研究", roma: "natuyasuminojiyuukennkyuu" },
  { japanese: "読書感想文を書く", roma: "dokusokannsoubunnowakaku" },
  { japanese: "定期テストの勉強", roma: "teikitesutonobenukyou" },
  { japanese: "部活動の厳しい練習", roma: "bukatudounokibisiirennsyuu" },
  { japanese: "文化祭の準備作業", roma: "bunkasainojyunnbisagyou" },
  { japanese: "体育祭のリレー選手", roma: "taiikusainorire-sennsyu" },
  { japanese: "合唱コンクールの練習", roma: "gasshyoukonnku-runorennsyuu" },
  { japanese: "卒業式の涙のお別れ", roma: "sotugyousikinonamidanowakare" },
  { japanese: "入学式の新しい制服", roma: "nyuugakusikinoatarasiiseihuku" },
  { japanese: "スマートフォン中毒", roma: "suma-tofonntyundoku" },
  { japanese: "ワイヤレスイヤホン紛失", roma: "waiyaresuiyahonnfunnsitu" },
  { japanese: "バッテリー残量不足", roma: "batteri-zanuryoubusoku" },
  { japanese: "インターネット接続エラー", roma: "innnta-nettosetuzokuera-" },
  { japanese: "セキュリティ対策万全", roma: "sekurititaisakubannzenn" },
  { japanese: "人工知能の急速な進化", roma: "jinnkoutinounokyousokunasinnka" },
  { japanese: "宇宙ステーション滞在", roma: "utyuuste-syonntaizai" },
  { japanese: "自動運転自動車の開発", roma: "jidouunntennjidousyanokaihatu" },
  { japanese: "再生可能エネルギー", roma: "saiseikanouenerugi-" },
  { japanese: "地球温暖化の対策", roma: "tikyuuonndankanotaisaku" },
  { japanese: "リサイクル活動に参加", roma: "risaikurukatudounisannka" },
  { japanese: "食品ロスを減らす取組", roma: "syokuhinnrosuwoherasutorikumi" },
  { japanese: "ボランティア活動推進", roma: "boranntiakatudousuisinn" },
  { japanese: "国際社会の平和と安全", roma: "kokusaisakainoheiwatoannzenn" },
  { japanese: "世界遺産めぐりの旅", roma: "sekaiisannmegurinotabi" },
  { japanese: "ファーストクラスの旅", roma: "fa-sutokurasunotabi" },
  { japanese: "高級ホテルに宿泊する", roma: "koukyuuhoterunisukuhakusuru" },
  { japanese: "絶叫マシンに乗る", roma: "zekkyoumasinnninoru" },
  { japanese: "テーマパークのアトラクション", roma: "te-mapa-kunoatorakusyonn" },
  { japanese: "お化け屋敷で大叫び", roma: "obakeyasikidedaioosawagi" },
  { japanese: "観覧車からの景色", roma: "kannrannsyakaranokesiki" },
  { japanese: "メリーゴーラウンド", roma: "meri-go-raunndo" },
  { japanese: "ポップコーンバケット", roma: "poppuko-nbaketto" },
  { japanese: "限定グッズの販売", roma: "gennteigguzzunohannbai" },
  { japanese: "長蛇の列に並ぶ覚悟", roma: "tyoudanoretsuninarabukakugo" },
  { japanese: "整理券を確保する", roma: "seirikennwokakuhosuru" },
  { japanese: "前売りチケット購入", roma: "maeuritikettokounyuu" },
  { japanese: "特別優先乗車券", roma: "tokubetuyuusennjyousyakenn" },
  { japanese: "満員電車に揺られる", roma: "maninndennsyaniyorareru" },
  { japanese: "終電を逃してしまう", roma: "syuudennwonogasitesimau" },
  { japanese: "タクシーを呼び出す", roma: "takusi-woyobidasu" },
  { japanese: "交通系ICカードチャージ", roma: "koutuukeiic-docha-ji" },
  { japanese: "自動改札機を通過", roma: "jidoukaisatukiwotyuuka" },
  { japanese: "指定席を予約する", roma: "siteisekikowoyoyakusuru" },
  { japanese: "グリーン車の高級感", roma: "guri-nnshyanokoukyuukann" },
  { japanese: "車内販売のカチカチアイス", roma: "syanaihannbainokatikatiaisu" },
  { japanese: "駅弁を食べながら旅行", roma: "ekibennwotabenagararyokou" },
  { japanese: "車窓からの美しい風景", roma: "shyasoukaranoutusikiihuukei" }
];

// ▼ ゲームの設定
const TIME_LIMIT = 60;

// ▼ HTML 要素取得
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const missEl = document.getElementById("miss");
const wordEl = document.getElementById("word");
const typedEl = document.getElementById("typed");
const inputEl = document.getElementById("input");
const startBtn = document.getElementById("startBtn");
const resultEl = document.getElementById("result");
const difficultyEl = document.getElementById("difficulty"); // 難易度セレクト

// ▼ ゲームの状態変数
let score = 0;
let miss = 0;
let combo = 0;
let timeLeft = TIME_LIMIT;
let currentWord = null;
let position = 0;
let timerId = null;
let playing = false;
let isFever = false;
let activeWordList = []; // 難易度フィルター後の単語リスト

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
// 🎮 難易度判定 & ゲーム処理
// ==========================================

// 難易度に基づいて単語リストを作成
function filterWordsByDifficulty() {
  const diff = difficultyEl ? difficultyEl.value : 'normal';

  activeWordList = ALL_WORDS.filter(w => {
    const len = w.roma.length;
    if (diff === 'easy') return len <= 6;
    if (diff === 'normal') return len >= 7 && len <= 13;
    if (diff === 'hard') return len >= 14;
    return true;
  });

  // 万が一条件に合う単語がない場合のフォールバック
  if (activeWordList.length === 0) {
    activeWordList = ALL_WORDS;
  }
}

function nextWord() {
  const index = Math.floor(Math.random() * activeWordList.length);
  currentWord = activeWordList[index];
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
  filterWordsByDifficulty(); // 難易度ごとのリストを作成

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
  if (difficultyEl) difficultyEl.disabled = true; // プレイ中は難易度変更不可
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