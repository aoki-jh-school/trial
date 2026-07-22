const words = [
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
