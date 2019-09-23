var consoleSocket = require("../index.js");
consoleSocket.setChannel('impostacao');
consoleSocket.Replace();

function test(){
	var t = setInterval(function() {
		console.log(Date.now());
	},1500);
}

test();