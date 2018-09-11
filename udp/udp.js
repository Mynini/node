var dgram = require("dgram");

var server = dgram.createSocket("udp4");

server.on("error", function(err) {
    console.log("server error:\n" + err.stack);
    server.close();
});


//定义缓存对象，目前做的事请求一次后清空同时超过固定条数时清空
var myarr = new Array(0)
var bufmgs;
server.on("message", function(msg, rinfo) {
    var str = msg.toString("utf-8");

    myarr.push(str) //==msg的arr集合

    console.log("server got: " + msg + " from " + rinfo.address + ":" + rinfo.port);

    bufmgs += msg + "##";

    if (bufmgs.length > 3000) {
        bufmgs = '';
    
}
    if (myarr.length > 100) {
        myarr = [];
    }

    var buf = new Buffer('客户端(' + rinfo.address + ':' + rinfo.port + '):' + msg);
    server.setBroadcast(true);
    //在本例中，客户端需要将端口号指定为40404
    server.send(buf, 0, buf.length, 40404, 'localhost');

});


server.on("listening", function() {
    var address = server.address();
    console.log("server listening " +
        address.address + ":" + address.port);
});
server.bind(6005, 'localhost');





var http = require("http");
http.createServer(function(request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    var obj2 = JSON.stringify(myarr);
    response.write(obj2);
    myarr = [];
    bufmgs = '';

    response.end();
}).listen(8888);
console.log("nodejs start listen 8888 port!");