const path = require('path');

module.exports = {
  mode:'production',  
  entry: './frontend/main.js',
  output: {
      path: path.resolve(__dirname, 'public','assets','js'),
      filename: 'Bunble.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  devtool:'source-map'
};