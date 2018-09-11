// 链式流
// 链式是通过连接输出流到另外一个流并创建多个流操作链的机制。链式流一般用于管道操作

// 压缩文件


var fs = require("fs");
var zlib = require('zlib');

// 压缩 input.txt 文件为 input.txt.gz
fs.createReadStream('fs.txt')
  .pipe(zlib.createGzip())  //压缩
  .pipe(fs.createWriteStream('input.txt.gz')); //压缩后新建立一个文件名
  
console.log("文件压缩完成。");


