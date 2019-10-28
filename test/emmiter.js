var consoleSocket = require("../index.js");
consoleSocket.Replace(8181);

function test(){
	var t = setInterval(function() {
		console.log(Date.now(),'a','b',Date.now());
	},1500);
}

test();