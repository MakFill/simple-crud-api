const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = () => ({
  mode: 'production',
  entry: {
    app: './src/index.js',
  },
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [new CleanWebpackPlugin()],
});
