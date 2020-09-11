import { src, dest } from 'gulp'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'
import gulpIf from 'gulp-if'
import sourcemaps from 'gulp-sourcemaps'
import sass from 'gulp-sass'
import cleanCSS from 'gulp-clean-css'
import rename from 'gulp-rename'
import postcss from 'gulp-postcss'
import browserSync from 'browser-sync'
import cssnano from 'cssnano'
import easings from 'postcss-easings'
import packageImporter from 'node-sass-package-importer'
import postcssGapProperties from 'postcss-gap-properties'
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes'
import autoprefixer from 'autoprefixer'
import mqpacker from 'css-mqpacker'
// import csscomb from 'gulp-csscomb';

import { isProduction, PATHS } from './config'

/**
 * SASSのコンパイルを実行する
 * @returns {*}
 */
export function sassCompileTask() {
  const outDir = isProduction ? PATHS.dest : PATHS.root
  const postCssPlugins = [
    easings(),
    postcssGapProperties(),
    postcssFlexbugsFixes(),
    autoprefixer({
      grid: true,
      cascade: false,
    }),
    mqpacker({
      sort: true,
    }),
  ]
  if (isProduction) {
    postCssPlugins.push(cssnano())
  }
  return (
    src(`${PATHS.src}**/*.{sass,scss}`)
      .pipe(
        plumber({
          errorHandler: notify.onError('<%- error.message %>'),
        })
      )
      // 開発時はソースマップを出力する
      .pipe(gulpIf(!isProduction, sourcemaps.init()))
      .pipe(
        sass({
          importer: packageImporter({
            extensions: ['.scss', '.csv'],
          }),
        })
      )
      .pipe(postcss(postCssPlugins))
      // .pipe(csscomb())
      // プロダクション版はminify化してファイル名を*.min.cssに変更する
      .pipe(gulpIf(isProduction, cleanCSS()))
      .pipe(gulpIf(isProduction, rename({ extname: '.min.csv' })))
      .pipe(
        rename((path) => {
          path.dirname += '/../../csv' // 出力先をcssフォルダに変更
        })
      )
      .pipe(gulpIf(!isProduction, dest(outDir, { sourcemaps: './_sourcemaps' })))
      .pipe(gulpIf(isProduction, dest(outDir)))
      .pipe(browserSync.stream())
  )
}
