# Gulp の基本セット v2

## ディレクトリ構成

ディレクトリ構成は以下のような感じです。

```
root
　├build        -> ビルド時に納品用ファイルが出力されるディレクトリ
　├docRoot      -> 開発時のルートディレクトリ
　├src          -> 開発用ファイルのディレクトリ
　│ ├assets
　│ │  ├images
　│ │  │   └[ページ名]
　│ │  │        └xxxxxx.jpg など
　│ │  ├js
　│ │  │ └[ページ名].js
　│ │  └scss
　│ │      └[ページ名]
　│ │           └[ページ名].scss
　│ │
　│ └sponsored
　│    ├include        -> EJSで共通に読み込むファイルを入れる（GAタグなど）
　│    └[ページ名]
　│        └index.ejs
　│
　├tasks               -> Gulpタスクなどが入っているディレクトリ
　├gulpfile.babel.js   -> Gulpの実行ファイル
　└package.json
```

## コマンド

### 開発時

docRoot 配下をサーバーが参照し、ビルドしたファイルがコピーされ、ファイルが watch 状態に突入します。

JavaScript は ES2016 に対応してます。

JavaScript を新規作成する時は、 `webpack.config.js` にエントリーポイントを追記してください。

```
npm run start
```

### 納品時

minify や画像の圧縮を実行し、納品用のディレクトリにファイル一式を出力する

```
npm run build
```
