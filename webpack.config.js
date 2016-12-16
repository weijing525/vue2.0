var path = require('path')
var webpack = require('webpack')

var fs = require('fs');

var HtmlWebpackPlugin = require("html-webpack-plugin");

//独立样式文件
var ExtractTextPlugin = require("extract-text-webpack-plugin");


var isProduction = process.env.NODE_ENV === "production";

var publicPath = isProduction ? "./" : '/';


//删除文件夹 ，递归删除
function deleteFolderRecursive(path) {
    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse 查看文件是否是文件夹
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};



deleteFolderRecursive('./build');




//格式化日期
function formatDate(fmt) { //author: meizz
      var o = {
           "M+": this.getMonth() + 1, //月份
           "d+": this.getDate(), //日
           "h+": this.getHours(), //小时
           "m+": this.getMinutes(), //分
           "s+": this.getSeconds(), //秒
           "q+": Math.floor((this.getMonth() + 3) / 3), //季度
           "S": this.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
}

//每次编译的时候，增加时间戳
fs.readFile('./index.html','utf-8',function(err,data){
    if(err){
        console.log("error");
    }else{
      var devhtml = data.replace(/<div style=\"display:none\" t=.*?<\/div>/, '<div style="display:none" t="prev build time '+formatDate.call(new Date(),'yyyy-MM-dd hh:mm:ss')+'"><\/div>');
      fs.writeFileSync('./index.html', devhtml);
      //将index.html里面的hash值清除掉
      var devhtml2 = data.replace(/((?:href|src)="[^"]+\.)(\w{20}\.)(js|css)/g, '$1$3');
      fs.writeFileSync('index.html', devhtml2);
    }
});

var entryNameTime  = formatDate.call(new Date(),'yyyyMMddhhmmS');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname,'./build'),
    publicPath: publicPath,
    filename: isProduction ? "./js/build.[hash].js" : "build.js"
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue',
        options: {
          // vue-loader options go here
        }
      },
      {
         test: /\.css$/, 
         loader: ExtractTextPlugin.extract({
                   fallbackLoader: 'style-loader',
                   loader: 'css-loader'
          })
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
          test: /\\.(eot|woff|woff2|ttf)([\\?]?.*)$/,
          loader: "file"
      },
      {
        //图片转化，小于8K自动转化为base64的编码
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url-loader?limit=8192&name=assets/[name].[hash].[ext]',
      }
    ]
  },
  resolve: {
    // 别名，可以直接使用别名来代表设定的路径以及其他
    alias: {
       'vue' : 'vue/dist/vue.js',
       components: path.join(__dirname, './src/components')
    }
  },
  plugins:[
    new ExtractTextPlugin(
      { 
        filename: isProduction ? "css/common.[hash].css" : 'css/common.css', 
        disable: false, 
        allChunks: false 
      }
    ),
  ],
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    port: 9090, //默认8080
    inline: true //监控文件变化,自动重加载整个页面
  },
  devtool: '#eval-source-map',
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    //将上面生成的js和css的引用追加到./src/html-tpl/tpl.html中，并重新生成index.html
    new HtmlWebpackPlugin({
        filename: "./index.html",
        template: "./index_dev.html"
    })
    
  ])
}
