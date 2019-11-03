const path = require('path');
const moment = require('moment');
const webpack = require('webpack');

// get git info from command line
const commitHash = require('child_process')
  .execSync('git rev-parse --short HEAD')
  .toString();

const common = require('./webpack-common');

const $ = process.env;
const date = moment().format('MMMM Do YYYY, h:mm:ss a');
const version = $.npm_package_version;
const infoDataStr = {
  info: `v${version} - ${date} - commit hash ${commitHash}`
};

const target = `${__dirname}/dist`;

module.exports = ({ target_env, production } = {}) => {
  const mode = production ? 'production' : 'development';
  const debug = target_env !== 'production';
  const isLocal = target_env === 'local';
  const devtool =
    isLocal || target_env === 'development' ? 'inline-source-map' : false;
  const plugins = [
    common.writeInfoDataFilePlugin(path.join(target, 'info.json'), infoDataStr),
    new webpack.DefinePlugin({
      __DEBUG: debug,
      TARGET_ENV: JSON.stringify(target_env)
    }),
    new webpack.ProvidePlugin({
      React: 'react'
    })
  ];
  if (!isLocal)
    plugins.push(
      common.writePackageJsonPlugin(path.join(target, 'package.json'))
    );

  return {
    mode,
    devtool,
    entry: './src/index.js',
    output: {
      path: path.resolve('public'),
      filename: 'cortes-interface.js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '/fonts/[name].[ext]'
              }
            }
          ]
        }
      ]
    },
    plugins,
    devServer: {
      contentBase: 'public'
    },
    resolve: {
      extensions: ['.js', '.jsx']
    }
  };
};