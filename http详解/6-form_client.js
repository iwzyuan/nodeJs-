var http = require('http');
var querystring = require('querystring')
var options = {
    hostname:'localhost',
    port : '8089',
    headers : {
        'Content-Type':'application/x-www-form-urlencoded'
    },
    path : '/',
    method : 'POST'
}
var request = http.request(options,function (response) {
    response.setEncoding('utf8');
    var result = '';
    response.on('data',function (data) {
        result += data;
    })
    response.on('end',function (data) {
        console.log(result);
        //console.log(JSON.parse(result));
    })

});
request.write(querystring.stringify({name:'zfpx'}));
request.end();