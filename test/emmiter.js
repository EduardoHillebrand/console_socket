var consoleSocket = require("../index.js");
consoleSocket.setChannel('ChannelA');
consoleSocket.setPort('8181'); //default
consoleSocket.setIp('localhost');//default
consoleSocket.Replace();

function test(){
	var t = setInterval(function() {
		console.log(Date.now());
	},1500);
}

test();