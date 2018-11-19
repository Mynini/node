
// svg图片批量下载

var fs=require("fs");
var path=require("path");
var request=require("request");
var async=require("async");

var spriteJson=require("./json/sprites.json");
var costumesJson=require("./json/costumes.json");
var soundsJson =require("./json/sounds.json");
var backdropJson =require("./json/backdrops.json");

var index = 1;
var imagesMd5=[];

spriteJson.forEach((item,index)=>{
	for(let itemKey in item){
		if(itemKey=="md5"){
			imagesMd5.push(item[itemKey])
		}else if(itemKey=="json"){
			if(item[itemKey]["sounds"][0]["md5"]){
				imagesMd5.push(item[itemKey]["sounds"][0]["md5"])
			}
			item[itemKey].costumes.forEach((key,jndex)=>{
				imagesMd5.push(key.baseLayerMD5)
			})


		}
	}
})


costumesJson.forEach((item,index)=>{
	for(let itemKey in item){
		if(itemKey=="md5"){
			imagesMd5.push(item[itemKey])
		}
	}
})

soundsJson.forEach((item,index)=>{
	for(let itemKey in item){
		if(itemKey=="md5"){
			imagesMd5.push(item[itemKey])
		}
	}
})

backdropJson.forEach((item,index)=>{
	for(let itemKey in item){
		if(itemKey=="md5"){
			imagesMd5.push(item[itemKey])
		}
	}
})


let resultJson=Array.from(new Set(imagesMd5))

/**
 * [downloadImage description]
 * @Author   liyulan
 * @DateTime 2018-11-19T15:46:44+0800
 * @param    {[type]}                 src      [http src link]
 * @param    {[type]}                 dest     [new name for download file]
 * @param    {Function}               callback [description]
 * @return   {[type]}                          [description]
 */
var downloadImage = function(src, dest, callback) {
    request.head(src, function(err, res, body) {
        if (src) {
            request(src).pipe(fs.createWriteStream(dest)).on('close', function() {
                callback(null, dest);
            });
        }
    });
};



async.mapSeries(resultJson, function(item, callback) {
	setTimeout(function() {
		let url="https://cdn.assets.scratch.mit.edu/internalapi/asset/"+item+"/get/";
		var destImage = path.resolve("./image/", item);
		downloadImage(url, destImage, function(err, data){
			console.log("["+ index++ +"]: " + data);
		});
		callback(null, item);
	}, 50);

}, function(err, results) {});

