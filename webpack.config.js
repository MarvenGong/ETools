const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  entry: {
    index: './src/index.ts'
  },
  output: {
    library: 'ETools',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        loader: 'ts-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      dry: false, // 是否打印删除的内容
    }),
  ],
  resolve: {
    extensions: ['...', '.ts']
  },
  watchOptions: {
    // 设置不监听的⽂件或⽂件夹，默认为空
    ignored: /node_modules/,
    // ⽂件改变不会⽴即执⾏，⽽是会等待300ms之后再去执⾏
    aggregateTimeout: 300,
    // 原理是轮询系统⽂件有⽆变化再去更新的，默认1秒钟轮询1000次
    poll: 1000
  },
}