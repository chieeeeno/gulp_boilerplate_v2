import { src, dest } from 'gulp'
import convert from 'gulp-convert'
import rename from 'gulp-rename'

import { isProduction, PATHS } from './config'

/**
 * CSVファイルをJSONファイルに変換する
 * @returns {*}
 */
export function convertCsvToJson() {
  const outDir = isProduction ? PATHS.dest : PATHS.root

  return src(`${PATHS.src}**/assets/csv/*.csv`)
    .pipe(
      convert({
        from: 'csv',
        to: 'json',
      })
    )
    .pipe(
      rename((path) => {
        path.dirname += '/../../json' // 出力先をjsonフォルダに変更
      })
    )
    .pipe(dest(outDir))
}
