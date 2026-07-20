# タイピングゲーム（職場体験コンテンツ）

中学生の職場体験用に作る、HTML / CSS / JavaScript だけで動くタイピングゲームです。
2名の生徒がそれぞれ独立して作業できるように、`blue` と `green` のフォルダに分けています。

## 📁 フォルダの構成

```
.
├── index.html          … トップページ（Blue版 / Green版 へのリンク）
├── blue/               … Blueチームの作業フォルダ
│   ├── index.html
│   ├── style.css
│   └── script.js
├── green/              … Greenチームの作業フォルダ
│   ├── index.html
│   ├── style.css
│   └── script.js
└── .github/workflows/  … 自動で公開するための設定（さわらなくてOK）
```

## 🎮 遊び方・作り方

各チームは **自分のフォルダの中だけ** を編集します。

- `index.html` … 画面の見た目・文字の配置
- `style.css` … 色や大きさなどのデザイン
- `script.js` … ゲームのルール（お題の単語・制限時間・スコアなど）

### まずやってみるとよいこと

- `script.js` の `words` に好きな単語を追加する
- `TIME_LIMIT`（制限時間）の数字を変える
- `style.css` の `--main-color` などの色を変える

## 💻 手元で動かして確認する

`blue/index.html`（または `green/index.html`）をブラウザで開くだけで動きます。
ダブルクリックでOKです。

## 🌐 公開（GitHub Pages）

`main` ブランチに push すると、GitHub Actions が自動でサイトを公開します。

### 最初の1回だけ必要な設定

1. GitHub のリポジトリページ → **Settings** → **Pages** を開く
2. **Build and deployment** の **Source** を **GitHub Actions** に設定する

これで、`main` に push するたびに自動で更新されます。

公開されるURL（例）:

- トップ: `https://aoki-jh-school.github.io/trial/`
- Blue版: `https://aoki-jh-school.github.io/trial/blue/`
- Green版: `https://aoki-jh-school.github.io/trial/green/`
