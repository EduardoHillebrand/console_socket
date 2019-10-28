var consoleSocket = require("../index.js");

function cbkLog(contents) {
	console.log('impostação',contents);
}
function cbkError(contents) {
	console.error(contents);
}


consoleSocket.Listen(8181,'localhost',cbkLog,cbkError);