var fs=require("fs");
var data=fs.readFileSync("fs.txt");
console.log(data.toString())
console.log("end")