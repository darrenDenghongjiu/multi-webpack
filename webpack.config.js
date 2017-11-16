/*配置多个js文件用手动引入 11111111111*/
var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var merge =  require("./merge.js");

var CopyWebpackPlugin = require('copy-webpack-plugin');

/*读取所有的html*/
var glob = require('glob');
function getEntry(globPath, pathDir) {
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, basename, pathname, extname;
    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename);
        pathname = pathDir ? pathname.replace(pathDir, '') : pathname;
        console.log(2, pathname, entry);
		/*可以在这里添加路径 ./ + entry */
        entries[pathname] = entry;
    }
    return entries;
}

function getAllHtml(globPath, pathDir) {
	var files = glob.sync(globPath);
	var entries = {},
        entry, dirname, basename, pathname, extname;
    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename);
        pathname = pathDir ? pathname.replace(pathDir, '') : pathname;
        console.log(2, pathname, entry);
		/*可以在这里添加路径 ./ + entry */
        entries[pathname] = entry;
    }
	//debugger;
    return entries;
}

var htmls = {};
//getEntry("webapp/**/entry.jsx",'webapp//');
//读取规定文件夹类的所有html
var arrhtms = getAllHtml("html/*.html","htm//");

var Outside_arrhtms = getAllHtml("outside/*.html","outside//");
merge(arrhtms,Outside_arrhtms,false);
//debugger;
for(var name in arrhtms){
	var htmlUrlarr =  name.split(path.sep);//path.sep 兼容操作系统的
	//debugger;
	if(/outside/g.test(name)){
		//debugger;
		var objname = htmlUrlarr[1];
		htmls[objname] = {};
		htmls[objname].path = arrhtms[name];
		htmls[objname].level =  1;
		//htmls[htmlUrlarr[htmlUrlarr.length-1]] = arrhtms[name];
		//debugger;
	}else{
		//htmlUrlarr
		//debugger;
		var objname = htmlUrlarr[htmlUrlarr.length-1];
		htmls[objname] = {};
		htmls[objname].path =  arrhtms[name];
		htmls[objname].level =  htmlUrlarr.length;
		//htmls[htmlUrlarr[htmlUrlarr.length-1]] = arrhtms[name];
	}
	
}
//debugger;

//读取一级文件下的html

/*获取一级目录的html文件*/
/*如果需要增加一级目录请在这里配置*/
//debugger;
var ArrHtmlWebpackPlugin = [];

for(var name in htmls){
	/*把抓取到的页面添加到 HtmlWebpackPlugin 插件中并且 分成多个*/
	/*path.sep 系统兼容的 分隔符号 /*/
	var fileArr = name.split(path.sep);
	//双斜杠在这里代表单斜杠
	//var htmlFileName =  fileArr[fileArr.length-1];
	console.log(name,"=================");
	//debugger;
	var tepobj = htmls[name];
	if(tepobj.level === 1){
		//debugger;
		ArrHtmlWebpackPlugin.push(new HtmlWebpackPlugin({
			filename:'./'+tepobj.path.split('/')[1], //filename可以修改文件访问的路径;
			//template:'./webapp/'+htmls[name],
			template:'./'+tepobj.path,
			inject:true,
			chunks: [name]////加载相对应的只有相对应的文件;
	   }));
	}else{
		ArrHtmlWebpackPlugin.push(new HtmlWebpackPlugin({
			filename:tepobj.path, //  //filename可以修改文件访问的路径;
			//template:'./webapp/'+htmls[name],
			template:'./'+tepobj.path, // 真实路径
			inject:true, //允许注入
			chunks: [name]//加载相对应的只有相对应的文件;
	   }));
		
	}
	//inject false 不允许自动加入css js 等文件
	//template表示使用自己的模板
}

//debugger;

/*读取所有的入口文件*/
var arrEntryJsx = getEntry("webapp/**/entry.jsx",'webapp//');

/*{
'js\darren\index\entry':"js/darren/index/entry.jsx"
'js\ina\joined-policy\entry':"js/ina/joined-policy/entry.jsx"
}
*/


var EntryJsx = {};
for(var name in arrEntryJsx){
	var jsxUrlarr =  name.split(path.sep);
	EntryJsx[jsxUrlarr[jsxUrlarr.length-2]] = __dirname+"/"+arrEntryJsx[name];
}


/*{index:"g:\webpack/js/darren/index/entry.jsx"
joined-policy:"g:\webpack/js/ina/joined-policy/entry.jsx"
}*/

/*添加移动文件*/


/*plugins: [
    //把指定文件夹下的文件复制到指定的目录
    new TransferWebpackPlugin([
      {from: 'www'}
    ], path.resolve(__dirname,"src"))
  ]
  */
  
/*http://blog.csdn.net/zaichuanguanshui/article/details/53611379  CopyWebpackPlugin*/

//to	定义要烤盘膛的目标目录	from: __dirname + ‘/dist’
  /*
  ArrHtmlWebpackPlugin.push( 
	  new CopyWebpackPlugin([{from: __dirname + '/webapp/public',to:__dirname + '/WebRoot/public'}])
  );
  ArrHtmlWebpackPlugin.push( 
	  new CopyWebpackPlugin([{from: __dirname + '/webapp/images',to:__dirname + '/WebRoot/images'}])
  );
  
  ArrHtmlWebpackPlugin.push( 
	  new CopyWebpackPlugin([{from: __dirname + '/html',to:__dirname + '/WebRoot/html'}])
  );
  */
  
 /* 
  //不压缩打包 
   ArrHtmlWebpackPlugin.push(
 	 new webpack.optimize.UglifyJsPlugin({
 		 
		output: {
 			comments:true,
 		},
 		compress: {
 			warnings:false,
			//drop_debugger: true, //去除debugger
			//drop_console: true   //去除console.log();
 		}
 	})
 );
*/
 
 /*
 
 测试js 调取bat文件；
  */
//debugger;
var config = {
	 entry:EntryJsx,
	 output:{
		 path:__dirname+"/WebRoot",
		 filename:"[name].bundle.js"
	 },
	 /*模块加载*/
	 module:{
		 loaders:[
			{
                test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel',
            },
			{
               test: /\.css$/,
				exclude: /node_modules/,
               loader: 'style!css'
            },
			{
               test: /\.less$/,
				exclude: /node_modules/,
               loader: 'style!css!less'
            },

			{
                test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
				loader: 'file-loader?limit=8192&name=images',
			    loader: 'file-loader?limit=8192&name=images/[hash:8].[name].[ext]'
            }
		],
	 },
	 //externals: {
      //  'react': 'window.React'
    // },
	 plugins:ArrHtmlWebpackPlugin
};



module.exports = config;


