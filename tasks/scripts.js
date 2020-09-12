import { src, dest, series } from 'gulp'
import gulpIf from 'gulp-if'
import plumber from 'gulp-plumber'
import gulpEslint from 'gulp-eslint'
import webpack from 'webpack'
import webpackStream from 'webpack-stream'
import changedInPlace from 'gulp-changed-in-place'

import { SCRIPTS_PATH as config, isProduction, PATHS } from './config'

const outDir = isProduction ? PATHS.dest : PATHS.root

export function esTranspile() {
  return src(config.src)
    .pipe(plumber())
    .pipe(webpackStream(require('../webpack.config.js'), webpack))
    .pipe(dest(`${outDir}/assets/js`))
}

export function esLint() {
  return src(config.src)
    .pipe(changedInPlace({ firstPass: true }))
    .pipe(gulpEslint())
    .pipe(gulpEslint.format())
    .pipe(gulpIf(isProduction, gulpEslint.failAfterError()))
}

export const jsCompileTask = series(esLint, esTranspile)
