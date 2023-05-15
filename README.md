# vue-fuchu-gomi-fee

ゴミシール料金の検索です。

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## 使い方
### データ読み込み
* 「品目,料金,ふりがな」というヘッダー行をもつcsvファイルを作成する

サンプルデータとして、[東京都府中市の粗大ゴミ料金表](https://www.city.fuchu.tokyo.jp/kurashi/gomirisaikuru/dashikata/sodaigomi/sodaigomidasikata.html)を変換したcsvを
[src/data/fuchu-gomi.csv](https://github.com/junara/vue-fuchu-gomi-fee/blob/main/src/data/fuchu-gomi.csv)に用意しています。

こちらは、 東京都府中市が上記で提供しているデータを改変して使用しています。

* テキストエリアに書き込む or CSVファイルを選択ボタンで読み込む

```csv
品目,料金,ふりがな
布,200,ぬの
机,800,つくえ
鉄,不可,てつ
```

### 検索
データ読み込み後検索ボックスが現れます。検索テキストと品目もしくはふりがながマッチした検索結果が画面に絞り込まれます。
