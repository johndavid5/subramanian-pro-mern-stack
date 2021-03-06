const path = require('path');
const webpack = require('webpack');

module.exports = {
  target: 'node',
  //entry: './server/server.js',
  entry: ['./server/index.js', './node_modules/webpack/hot/poll?1000'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.bundle.js',
    libraryTarget: 'commonjs',
  },
  resolve: {
    //extensions: ['', '.js','.jsx'],
    extensions: ['*', '.js','.jsx'],
  },
  // Assume anything not imported as a local
  // dependency...or not starting with './'
  // to be an external dependency...so if
  // begins with a letter between a-z, it
  // is an external...
  externals: [/^[a-z]/],
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        query: {
          //presets: ['react', 'es2015-node4'],
          presets: ['react', 'es2015'],
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          //presets: ['es2015-node4'],
          presets: ['es2015'],
        },
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: 'source-map',
};
