
// svg图片下载本事
var fs = require("fs");
var path = require('path');
var request = require('request');
var downloadImage = function(src, dest, callback) {
    request.head(src, function(err, res, body) {
        // console.log('content-type:', res.headers['content-type']);
        // console.log('content-length:', res.headers['content-length']);
        if (src) {
            request(src).pipe(fs.createWriteStream(dest)).on('close', function() {
                callback(null, dest);
            });
        }
    });
};

downloadImage("https://cdn.assets.scratch.mit.edu/internalapi/asset/afab2d2141e9811bd89e385e9628cb5f.svg/get/", "./image/afab2d2141e9811bd89e385e9628cb5f.svg", function(err, data){
    if (err) {
        console.log(err)
    }
    if (data) {
        console.log("done: " + data);
    }
})