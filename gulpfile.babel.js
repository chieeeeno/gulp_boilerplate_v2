// Gulp
import { series, parallel, watch } from 'gulp'

// Tasks
import { convertCsvToJson } from './tasks/convert'
import { cleanTask } from './tasks/clean'
import { ejsTask } from './tasks/ejs'
import { sassCompileTask } from './tasks/sass'
import { browserSyncTask, reloadTask } from './tasks/server'
import { optimizeImageTask, copyImageTask, copyMovieTask } from './tasks/optimizeImage'
import { jsCompileTask } from './tasks/scripts'

import { PATHS } from './tasks/config'

function watchTask(callback) {
  watch([`${PATHS.src}**/*.ejs`, '!node_modules'], series(ejsTask, reloadTask))
  watch([`${PATHS.src}**/*.{sass,scss}`, '!node_modules'], series(sassCompileTask, reloadTask))
  watch([`${PATHS.src}**/*.js`, `!${PATHS.src}**/*.min.js`, '!node_modules'], jsCompileTask)
  watch([`${PATHS.src}**/*.{jpg,jpeg,gif,png,svg}`], copyImageTask)
  watch([`${PATHS.src}**/*.{mp4,m4v}`], copyMovieTask)
  watch([`${PATHS.src}**/assets/csv/*.csv`], convertCsvToJson)
  callback()

  console.log(
    '\n' +
      '-------------------------------------------------\n' +
      "🧐  < OK, I'm watching now...\n" +
      '-------------------------------------------------\n'
  )
}

export const start = series(
  parallel(ejsTask, sassCompileTask, jsCompileTask, copyImageTask, copyMovieTask, convertCsvToJson, watchTask),
  browserSyncTask
)
export const build = series(cleanTask, ejsTask, sassCompileTask, jsCompileTask, optimizeImageTask, copyMovieTask, convertCsvToJson)
export const convert = series(convertCsvToJson)
