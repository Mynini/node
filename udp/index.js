var dgram = require('dgram');
var server = dgram.createSocket('udp4');

server.on('close',()=>{
    console.log('socket已关闭');
});

server.on('error',(err)=>{
    console.log(err);
});

server.on('listening',()=>{
    console.log('socket正在监听中...');
    server.setBroadcast(true);//开启广播
    server.setTTL(128);//路由一跳TTL减一，减到零抛弃数据包
    server.send('大家好啊，我是服务端.',8061,'10.108.95.255');
    //在send {msg=close} 可以发送 colse 事件
});
//通过message事件接收数据，
server.on('message',(msg,rinfo)=>{
    console.log(`receive message from ${rinfo.address}:${rinfo.port}`);
});
//绑定，要接收数据的话必须绑定
server.bind('8060','10.108.92.2');