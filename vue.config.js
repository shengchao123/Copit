'use strict'
const path = require('path')
const defaultSettings = require('./src/config.js')

function resolve (dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || '商旅管理后台' // page title

module.exports = {
  // 在开发环境下，如果想把开发服务器架设在根路径，设置一个条件的值
  publicPath: './',
  // 打包输入的路径
  outputDir: 'dist',
  // 静态资源的目录
  assetsDir: 'static',
  // eslint 检测环境
  lintOnSave: process.env.NODE_ENV === 'development',
  // 生产环境是否构建生成 source map, 可以将其设置为 false 以加速生产环境构建
  productionSourceMap: false,
  // 本地服务的配置
  devServer: {
    port: 9527,
    open: true,
    // 设置跨域代理
    proxy: {
      '/cb-api': {
        // target: 'http://172.168.102.2:9032',
        target: 'https://release.hzslonline.com.cn/cb-api',
        changeOrigin: true,
        pathRewrite: {
          '^/cb-api': ''
        }
      }
    }
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src'),
        '@c': resolve('src/components'),
        '@u': resolve('src/utils'),
        '@v': resolve('src/views'),
        '@m': resolve('src/mixins')
      }
    },
    devtool: 'source-map',
    externals: {
      AMap: 'AMap',
      moment: 'moment',
      Swiper: 'Swiper'
    }
  },

  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/styles/colors.scss";
          @import "@/styles/flex.scss";
          @import "@/styles/global.scss";
          @import "@/styles/atom.scss";
        `
      }
    }
  }

}
