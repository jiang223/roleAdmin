const path = require('path')

const svgSpriteDirs = [
  path.resolve(__dirname, 'src/svg/'),
  require.resolve('antd').replace(/index\.js$/, ''),
]

export default {
  entry: 'src/index.js',
  svgSpriteLoaderDirs: svgSpriteDirs,
  "theme": "./theme.config.js",

   "proxy": {
    /* "/api/v1": {
       "target": "http://api.zuiidea.com",
       "changeOrigin": true,
       "pathRewrite": { "^/api/v1" : "/v1" }
     },*/
     "/api/v2": {
       "target": "http://localhost:8080",
       "changeOrigin": true,
       "pathRewrite": { "^/api/v2" : "" }
     },
     "/updload/file/": {
       "target": "http://localhost:8080",
       "changeOrigin": true,
       "pathRewrite": { "^" : "" }
     }
   },
  "env": {
      "development": {
        "extraBabelPlugins": [
          "dva-hmr",
          "transform-runtime",
  		    ["import", { "libraryName": "antd", "style": true }]
        ]
      },
      "production": {
        "extraBabelPlugins": [
          "transform-runtime",
  		    ["import", { "libraryName": "antd", "style": true}]
        ]
      }
  }
}
