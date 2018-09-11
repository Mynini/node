
/**
 * 应用程序启动入口
 */


var express=require("express");
var swig=require("swig");
var mongoose=require("mongoose")

// 创建app应用 ==>http.createServer();
var app=express()

//设置静态文件托管
//当客户端请求url/public开始，那么直接返回对应的__dirname+"/publick"下的文件
app.use("/public",express.static(__dirname+"/public"));


/**
 * 配置应用模板
 * 定义当前应用所使用的模板引擎
 * 第一个参数：模板引擎的名称，同时也是模板文件的后缀，第二个参数表示用于解析处理模板内容的方法
 */
app.engine("html", swig.renderFile);




//设置模板文件存放的目录：第一人必须是views, 
app.set("views","./views");

//注册所使用的模板引擎
//arg1：必须是view engine  arg2:app.engine的名称
app.set("view engine","html")

//设置模板缓存为false
swig.setDefaults({cache:false});

/**
 * 路由于绑定
 * 	req:客户端发送过来的数据对象
 * 	res:服务端返回的对象
 * 	next：执行下一个要匹配的函数
 */
app.get("/",function(req,res,next){

	/**
	 * 读取views下的index文件且返回给客户端
	 * arg1:文件名称==views/index.html
	 * arg2:传给模板的数据
	 */
	res.render("index");

})

// app.get("/main.css",function(req,res,next){
// 	res.setHeader("Content-Type","text/css");
// 	res.send("body {background:red;}")
// })

//监听http请求
mongoose.connect("mongdb://localhost:20178/blog",function(err){
	if(err){
		console.log("链接失败");
	}else{
		console.log("链接成功");
		app.listen(8081)
	}
})





