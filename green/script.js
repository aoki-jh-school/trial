// ==========================================
// 1. 効果音をつくる関数 (Web Audio API)
// ==========================================
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// 正解音（高めのピコッという音）
function playCorrectSound() {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5
  osc.frequency.exponentialRampToValueAtTime(1760, audioCtx.currentTime + 0.08); // A6
  gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.08);
}

// クリア音（単語完成時：明るいチャリーン音）
function playClearSound() {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const notes = [523.25, 659.25, 783.99, 1046.50]; // C, E, G, C
  notes.forEach((freq, index) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime + index * 0.05);
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime + index * 0.05);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + index * 0.05 + 0.2);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(audioCtx.currentTime + index * 0.05);
    osc.stop(audioCtx.currentTime + index * 0.05 + 0.2);
  });
}

// ミス音（低めのブッという音）
function playMissSound() {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(150, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.15);
  gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.15);
}


// ==========================================
// 2. キー入力処理（ここを差し替え・更新）
// ==========================================
document.addEventListener("keydown", (e) => {
  if (!playing) return;
  if (e.key.length !== 1) return;

  inputEl.focus();

  const expected = currentWord.roma[position];
  if (e.key === expected) {
    position++;
    renderWord();

    // ── 正解時の処理 ──
    triggerEffect('correct'); // ポップアニメーション

    if (position === currentWord.roma.length) {
      // 単語を最後まで打ち切った時
      playClearSound(); // ファンファーレ風の音
      triggerEffect('word-complete'); // 画面フラッシュ風

      if (timeLeft <= 20) {
        score += 20;
      } else {
        score += 10;
      }
      scoreEl.textContent = score;
      inputEl.value = "";
      nextWord();
    } else {
      // 1文字正解した時
      playCorrectSound();
    }

  } else {
    // ── ミス時の処理 ──
    miss++;
    missEl.textContent = miss;
    playMissSound(); // ミス音
    triggerEffect('miss'); // 画面シェイク＆赤フラッシュ
  }
});


// ==========================================
// 3. エフェクト付け替え用関数
// ==========================================
function triggerEffect(type) {
  if (type === 'correct') {
    wordEl.classList.remove('pop-anim');
    void wordEl.offsetWidth; // リフローを発生させてアニメーションを再読み込み
    wordEl.classList.add('pop-anim');
  } else if (type === 'miss') {
    document.body.classList.remove('shake-anim');
    void document.body.offsetWidth;
    document.body.classList.add('shake-anim');
  } else if (type === 'word-complete') {
    wordEl.classList.remove('complete-anim');
    void wordEl.offsetWidth;
    wordEl.classList.add('complete-anim');
  }
}const words = [
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
     endGame();
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
   if (timeLeft <= 20) {
       score += 20;
     } else {
       score += 10;
     }
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
