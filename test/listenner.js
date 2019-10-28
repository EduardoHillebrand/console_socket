var consoleSocket = require("../index.js");

function cbkLog(contents) {
	console.log('impostação',contents);
}
function cbkError(contents) {
	console.error(contents);
}

consoleSocket.setPort('8181'); //default
consoleSocket.setIp('localhost'); //default
consoleSocket.Listen(cbkLog);