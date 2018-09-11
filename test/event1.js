
var events=require("events");
var eventsEmitter=new events.EventEmitter();

//监听器1
var lister1=function lister1(){
	console.log("监听器list1执行");
}


// 监听器 #2
var lister2=function lister2(){
	console.log("监听器list2执行")
}

// 绑定 connection 事件，处理函数为 listener1 
eventsEmitter.addListener("connection",lister1);


// 绑定 connection 事件，处理函数为 listener2
eventsEmitter.on("connection",lister2);


var eventListeners =eventsEmitter.listenerCount("connection");
console.log(eventListeners + " 个监听器监听连接事件。");


// 处理 connection 事件 
eventsEmitter.emit("connection");


// 移除监听
eventsEmitter.removeListener("connection",lister1);
console.log("listener1 不再受监听。");

// 触发连接事件
eventsEmitter.emit('connection');


eventListeners = eventsEmitter.listenerCount('connection');
console.log(eventListeners + " 个监听器监听连接事件。");

console.log("程序执行完毕。");



//结果
// 2 个监听器监听连接事件。
// 监听器list1执行
// 监听器list2执行
// listener1 不再受监听。
// 监听器list2执行
// 1 个监听器监听连接事件。
// 程序执行完毕。