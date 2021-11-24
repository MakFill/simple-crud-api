const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = () => ({
  mode: 'production',
  entry: {
    app: './src/index.js',
  },
  target: 'node16.13',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    module: true,
  },
  experiments: {
    outputModule: true,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.cjs', '.json'],
    fallback: {
      http: require.resolve('stream-http'),
      fs: false,
      os: false,
      path: false,
      url: false,
      buffer: false,
    },
  },
  plugins: [new CleanWebpackPlugin()],
});
