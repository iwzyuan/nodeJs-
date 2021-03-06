var http = require('http');
var fs = require('fs');
var mime = require('mime'); // 引入文件类型模块
var urlFn = require('url');  //对URL进行处理，把字符串转成对象
/*
*
* 每当请求来的时候调用serve函数对客户端请求进行处理
*       request：请求  response:响应
* */

function serve(request, response) {
    /*
    *
    * 此处parse(...,true)若此处传true则返回值的query属性变为对象模式<{name : iwzyuan,age : 10}>
    * 若不传则query<name=iwzyuan&age=10>
    *
    * */
    var urlObj = urlFn.parse(request.url,true);
    //console.log(urlObj);
    //console.log(request.url);
    var url = urlObj.pathname;
    console.log(url);
    if (url == '/') {
        response.statusCode = 200;//设置状态码
        response.setHeader('Content-Type', 'text/html;charset=utf-8');
        response.setHeader('name', 'iwzyuan');//设置响应头
        fs.readFile('index.html', function (err, data) {  //读取文件得内容，并且将读取到得内容写入到相应提
            response.write(data);
            response.end();
        })
    } else if (url == '/clock'){
        var counter = 0;
        response.statusCode = 200;//设置状态码
        response.setHeader('Content-Type', 'text/html;charset=utf-8');
        // console.log('进入clock');
        var init = setInterval(function () {
            response.write(new Date().toString());
            counter++;
            if (counter == 5){
                clearInterval(init);
                response.end();
            }
        },1000)

        // response.end();
    }else {
        astatic(url, response);
    }
}

function astatic(url, response) {  // 文件类型不为html的回掉函数
    var arr = url.match(/\/.+/g);
    var curUrl = arr[arr.length-1].slice(1);
    var curType = curUrl.split('.')[1];
    response.statusCode = 200;//设置状态码
    response.setHeader('name','iwzyuan');
    if(typeof mime._types[curType] !== "undefined"){

        response.setHeader('Content-Type', mime._types[curType] + ';charset=utf-8');
        fs.readFile(curUrl, function (err, data) {  //读取文件得内容，并且将读取到得内容写入到相应提
            // response.write(data);
            // console.log(data);
            response.end();
        })
    }
}

var server = http.createServer(serve);//创建服务器

server.listen(7070, 'localhost');