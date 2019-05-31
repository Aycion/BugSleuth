const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { resolve, join } = require('path');

const context = __dirname + '/src';



module.exports = (env) => {
  const node_env = process.env.NODE_ENV || 'production';
  const appEntryPoints = 'index';

  const config = {
    name: 'bugsleuth',
    target: 'web',
    // @ts-ignore
    mode: node_env,
    //context,
    entry: './src/index.tsx'
    ,
    output: {
      filename: 'bugsleuth.js',
      path: resolve(__dirname, 'dist')
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.tsx?$/,
          loader: 'tslint-loader',
          exclude: /node_modules/,
          options: {
            configFile: resolve(__dirname, './tsconfig.json'),
            emitErrors: true,
            failOnHint: true,
            typeCheck: true
          }
        },
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
/*     optimization: {
      minimizer: [ new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
          warnings: false,
          parse: {},
          compress: {},
          mangle: true, // Note `mangle.properties` is `false` by default.
          output: null,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_fnames: true,
        }
      }) ],
    }, */
    plugins: []
  };
  
  return config;
};
