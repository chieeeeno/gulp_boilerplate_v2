# Gulp の基本セット v3

## ディレクトリ構成

ディレクトリ構成は以下の構成となる。

```
root
　├build        -> ビルド時に納品用ファイルが出力されるディレクトリ
　│
　├public_html      -> 開発時のルートディレクトリ
　│
　├src          -> 開発用ファイルのディレクトリ
　│ ├assets
　│ │  ├csv   -> JSONファイル生成用のCSVファイル
　│ │  │ └[ファイル名].csv
　│ │  ├images
　│ │  │   └[ページ名]
　│ │  │        └xxxxxx.jpg など
　│ │  ├js
　│ │  │ └[ページ名].js
　│ │  │
　│ │  └scss   -> .scssファイルを格納するディレクトリ。FLOCCSをベースとして命名を行う。
　│ │    ├foundation
　│ │    ├layout
　│ │    ├object
　│ │    └style.scss
　│ │
　│ └ejs
　│    ├include        -> EJSで共通に読み込むファイルを入れる（GAタグなど）
　│    ├index.ejs
　│    └[ディレクトリ名]
　│        └index.ejs
　│
　├tasks               -> Gulpタスクなどが入っているディレクトリ
　├gulpfile.babel.js   -> Gulpの実行ファイル
　└package.json
```

## コマンド

### 開発時

```
npm run start
```

public_html 配下をサーバーが参照し、ビルドしたファイルがコピーされ、ファイルが watch 状態に突入します。

JavaScript は ES2016 に対応してます。

JavaScript を新規作成する時は、 `webpack.config.js` にエントリーポイントを追記してください。



### 納品時

```
npm run build
```

minify や画像の圧縮を実行し、`build`ディレクトリにファイル一式を出力する


### CSVファイルをJSONファイルに変換

```
npm run convert
```
`src/assets/csv/*.csv` を対象に、JSONファイルを生成する。
出力先は、`public_html/assets/json/` （開発時）または `build/assets/json/` （納品時）に出力される。