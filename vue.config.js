const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'renderer'),
      }
    }
  },
  pluginOptions: {
    electronBuilder: {
      chainWebpackMainProcess: (config) => {
        // Chain webpack config for electron main process only
        config.resolve.alias
          .set('@', path.resolve(__dirname, 'main'))
      },
      // 主进程入口
      mainProcessFile: 'main/index.js',
      mainProcessWatch: ['main/**/*.js'],
      // 渲染进场入口
      rendererProcessFile: 'renderer/index.js',
    }
  }
}