const buf=Buffer.from("runbbo","ascii");

console.log(buf.toString("hex"))   //// 输出 72756e6f6f62

console.log(buf.toString('base64')); // 输出 cnVub29i


// 创建一个长度为 10、且用 0 填充的 Buffer。
const buf1=Buffer.alloc(10) 

// 创建一个长度为 10、且用 0x1 填充的 Buffer。 
const buf2 = Buffer.alloc(10, 1);


// 创建一个长度为 10、且未初始化的 Buffer。
// 这个方法比调用 Buffer.alloc() 更快，
// 但返回的 Buffer 实例可能包含旧数据，
// 因此需要使用 fill() 或 write() 重写。
const buf3 = Buffer.allocUnsafe(10);


// 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。
const buf4 = Buffer.from([1, 2, 3]);


// 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
const buf5 = Buffer.from('tést');


// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
const buf6 = Buffer.from('tést', 'latin1');


//写入数据到缓冲区
// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
const buf7 = Buffer.alloc(256);

len=buf7.write("wwww.baidu.com")

console.log("写入字节数 : "+  len); //---->14


//从缓冲区读取数据
for (var i = 0 ; i < 26 ; i++) {
  buf[i] = i + 97;
}
console.log( buf7.toString('ascii'));       // 输出: abcdefghijklmnopqrstuvwxyz
console.log( buf7.toString('ascii',0,5));   // 输出: abcde
console.log( buf7.toString('utf8',0,5));    // 输出: abcde
console.log( buf7.toString(undefined,0,5)); // 使用 'utf8' 编码, 并输出: abcde


//将 Buffer 转换为 JSON 对象
const buf8 = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5]);

const json=JSON.stringify(buf8);

console.log(json)  //=--->{"type":"Buffer","data":[1,2,3,4,5]}

const copy = JSON.parse(json,(key,value)=>{
	return value&&value.type=="buffer"? Buffer.from(value.data):value;
})


console.log(copy)  //-->{ type: 'Buffer', data: [ 1, 2, 3, 4, 5 ] }



// 缓冲区合并
var buffer1 = Buffer.from(('菜鸟教程'));
var buffer2 = Buffer.from(('www.runoob.com'));
var buffer3 = Buffer.concat([buffer1,buffer2]);
console.log("buffer3 内容: " + buffer3.toString());



// 缓冲区比较var 
var buffer3 = Buffer.from('ABC');
var buffer4 = Buffer.from('ABCD');
var result = buffer1.compare(buffer2);

if(result < 0) {
   console.log(buffer3 + " 在 " + buffer4 + "之前");
}else if(result == 0){
   console.log(buffer3 + " 与 " + buffer4 + "相同");
}else {
   console.log(buffer3 + " 在 " + buffer4 + "之后");
}


//拷贝缓冲区
var buf11 = Buffer.from('abcdefghijkl');
var buf12 = Buffer.from('RUNOOB');

//将 buf2 插入到 buf1 指定位置上
buf12.copy(buf11, 2);

console.log(buf11.toString());  //--->abRUNOOBijkl



// 缓冲区裁剪
var buffer13 = Buffer.from('runoob');
// 剪切缓冲区
var buffer14 = buffer13.slice(0,2);
console.log("buffer14 content: " + buffer14.toString());  //--->ru


// 缓冲区长度
console.log(buffer14.length) //--->2