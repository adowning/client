const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  // transpileDependencies: ['vuetify'],
  configureWebpack: {
    devtool: 'source-map',
    plugins: [
      // new webpack.NormalModuleReplacementPlugin(/^any-promise$/, 'bluebird'),
      new CopyWebpackPlugin([
        {
          from: 'node_modules/push-receiver/src/gcm/checkin.proto',
          to: 'dist_electron/checkin',
          toType: 'file',
        },
      ]),
    ],
  },
  // devServer: {
  // proxy: {
  // '/': {
  //   target: 'https://app.ashdevtools.com/',
  //   ws: true,
  //   changeOrigin: true,
  // },
  // '^/foo': {
  //   target: '<other_url>',
  // },
  // },
  // },
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

    notes: {
      entry: 'src/notes/notes.js',
      template: 'public/notes.html',
      filename: 'notes.html',
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
            arch: ['x64'],
          },
        },
        win: {
          target: [
            {
              target: 'nsis',
              arch: ['x64'],
            },
            {
              target: 'zip',
              arch: ['x64'],
            },
          ],
        },
        nsis: {
          oneClick: false,
          allowToChangeInstallationDirectory: true,
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
