const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  configureWebpack: {
    externals: {
      'BMap': 'BMap',
      'BMapGL': 'BMapGL'
    }
  },
  transpileDependencies: true,
  devServer: {
    port: 8082,
    client: {

      overlay: false

    },
  }
})
