const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

function postcssPlugins() {
  const plugins = [
    require('postcss-preset-env')({
      stage: 0,
      features: ['css-nesting']
    })
  ];

  if (process.env.NODE_ENV === 'production') {
    plugins.push(require('cssnano'));
  }

  return plugins;
}

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  target: 'web',
  devtool: 'source-map',

  entry: './src/index',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: './dist'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.css?$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: postcssPlugins()
              }
            }
          ]
        })
      }
    ],
  },

  plugins: [
    new ExtractTextPlugin("styles.css")
  ],

  resolve: {
    modules: [
      'node_modules'
    ],

    extensions: ['.js', '.jsx']
  }
}
