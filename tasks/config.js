const env = process.env.NODE_ENV || 'development'

export const isProduction = env === 'production'

// 入出力パス
export const PATHS = {
  src: './src/',
  root: './public_html/',
  dest: './build/',
}

export const SCRIPTS_PATH = {
  srcRoot: `${PATHS.src}`,
  src: `${PATHS.src}js/**/*.js`,
  dest: `${PATHS.dest}`,
}

export const GA_ACCOUNT = 'UA-XXXXXXXXXX-1'

export const GOOGLE_MAP_API_KEY = {
  production: 'XXXXXXXXX', // 本番用
  develop: 'XXXXXXXXX', // 開発用
}

// 本番用ドメイン
export const DOMAIN_URL = 'http://www.hoge.com/'
// ステージング用ドメイン
export const STG_DOMAIN_URL = 'http://stg.hoge.com/'
