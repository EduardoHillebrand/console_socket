/*!
 * accepts
 * Copyright(c) 2019 Eduardo Hillebrand
 * MIT Licensed
 */
'use strict'

/**
 * Module dependencies.
 * @private
 */
const SServer = require('socket.io');
var io = null;
var ioCli = require('socket.io-client');
var Ip = 'localhost';
var Port = 8181;
var alreadyHasOne = false;

/**
 * Module exports.
 * @public
 */

module.exports = {
	'Replace': Replacer,
	'Listen': Listener,
	'setPort': setPort,
	'setIp': setIp
};

/**
 * Replace function console.log && error by io.emit.
 *
 * @public
 */
function Replacer (_port) {
	if(_port)
		Port = _port;

	io = new SServer(Port);

	io.on('connection', function(socket){
		console.error('ccc');
	});
	
	
	console.log("console_socket: Replace Called. Port: "+Port+" \nThe last console.log message you will see here. ");
	console.log = ConsoleLogSocket;
	console.error = ConsoleErrorSocket;
}

function setPort(port) {
	Port = port;
}

function setIp(ip) {
	Ip = ip;
}

function ConsoleLogSocket () {
	//console.error(Channel, arguments);
	io.emit('log', JSON.stringify(arguments));		
}

function ConsoleErrorSocket () {
	io.emit('error', JSON.stringify(arguments));		
}

function Listener(callbackLog=console.log, callbackError=console.error) {

	var socket = ioCli.connect('http://'+Ip+':'+Port);
		
	//console.error(Ip,Port,Channel);
	 
	socket.on('log', function (data) {
		data = JSON.parse(data)
	  	callbackLog(data);
	});

	socket.on('error', function (data) {
		data = JSON.parse(data)
	  	callbackError(data);
	});
}
