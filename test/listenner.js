const consoleSocket = require("../index.js");

function cbkLog(contents) {
	console.log(contents);
}
function cbkError(contents) {
	console.error(contents);
}

//consoleSocket.setChannel('impostacao');
consoleSocket.Listen('localhost',cbkLog,cbkError);