var consoleSocket = require("../index.js");

function cbkLog(contents) {
	console.log(contents);
}
function cbkError(contents) {
	console.error(contents);
}

consoleSocket.setChannel('ChannelA');
consoleSocket.setPort('8181'); //default
consoleSocket.setIp('localhost'); //default
consoleSocket.Listen();