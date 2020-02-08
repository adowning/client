module.exports = {
  // transpileDependencies: ['vuetify'],
  configureWebpack: {
    devtool: 'source-map',
  },
  pages: {
    index: {
      entry: 'src/main.js', //entry for the public page
      template: 'public/index.html', // source template
      filename: 'index.html', // output as dist/*
    },
    maps: {
      entry: 'src/maps.js',
      template: 'public/maps.html',
      filename: 'maps.html',
    },
    worker: {
      entry: 'src/worker.js',
      template: 'public/worker.html',
      filename: 'worker.html',
    },
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: 'AndrewsApp',
        appId: 'com.ashdevtools.app',
        linux: {
          target: {
            target: 'appimage',
            // arch: ['armv7l'],
            arch: ['amd64'],
          },
        },
      },
    },
  },
}
// const path = require('path')

// // eslint-disable-next-line no-underscore-dangle
// global.__rootDirname = path.join(__dirname, 'dist')

// const fs = require('fs')
// const merge = require('webpack-merge')
// const defaultConfiguration = require('./vue-config/config.default')

// const environmentConfigurationPath = `./vue-config/config.${process.env.NODE_ENV}.js`

// const environmentConfiguration = fs.existsSync(environmentConfigurationPath)
//   ? require(environmentConfigurationPath) // eslint-disable-line
//   : {}

// const config = merge(defaultConfiguration, environmentConfiguration)
// function chainWebpackMainProcess(config) {
//   config.resolve.alias.set('@', path.join(__dirname, 'src'))
// }
// module.exports = config
