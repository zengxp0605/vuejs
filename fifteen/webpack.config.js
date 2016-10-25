var path = require('path')
var projectRoot = path.resolve(__dirname, '../')
var webpack = require('webpack')

module.exports = {
  // 入口文件  
  entry: {
    app:[
      './src/main.js',
      //'./dev-server.js'
    ]
  },
  // 编译输出的文件路径  
  output: {
    //`dist`文件夹  
    path: '/dist/',
    // 文件 `build.js` 即 dist/build.js  
    filename: 'build.js',
    publicPath: '/dist/',
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEBUG__: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),

  ],
  resolve: {
    extensions: ['', '.js', '.vue'],
  },
  //加载器  
  module: {
    // preLoaders: [
    //   {
    //     test: /\.vue$/,
    //     loader: 'eslint',
    //     include: projectRoot,
    //     exclude: /node_modules/
    //   },
    //   {
    //     test: /\.js$/,
    //     loader: 'eslint',
    //     include: projectRoot,
    //     exclude: /node_modules/
    //   }
    // ],
    loaders: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader'
      }, {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader'
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }, {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
      },
    ]
  },
  babel: {
    presets: ['es2015', 'stage-0'],
    plugins: ['transform-runtime']
  }
}  