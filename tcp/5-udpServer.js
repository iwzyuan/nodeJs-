var dgram = require('dgram');
/*
* UDP服务端
* */
var socket = dgram.createSocket('udp4');
socket.bind(41234,'localhost');
socket.on('message',function (msg,rinfo) {
    console.log(msg.toString());
    console.log(rinfo);
    socket.send(msg,0,msg.length,rinfo.port,rinfo.address);
})