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
var os = require('os');
const SServer = require('socket.io');
var io = null;
var ioCli = require('socket.io-client');
var ip = [];
var Channel = false;
var Port = 8181;

/**
 * Module exports.
 * @public
 */

module.exports = {
	'Replace': Replacer,
	'Listen': Listener,
	'setChannel':setChannel,
	'setPort': setPort
};

/**
 * Replace function console.log && error by io.emit.
 *
 * @public
 */
function Replacer () {
	if(!Channel)
		io = new SServer(Port);
	else
		io = SServer.of('/'+Channel);
		

	io.on('connection', function(socket){
		console.error('ccc');
	});
	
	
	console.log("console_socket: Replace Called. the last console.log message you will see here. ");
	console.log = ConsoleLogSocket;
	//console.error = ConsoleErrorSocket;
}

function setChannel(channel) {
	Channel = channel;
}

function setPort(port) {
	Port = port;
}

function ConsoleLogSocket () {
	console.error(Channel, arguments);
	io.emit('log', JSON.stringify(arguments));		
}

function ConsoleErrorSocket () {
	io.emit('error', JSON.stringify(arguments));		
}

function Listener(ip='localhost', callbackLog=console.log, callbackError=console.error) {
	if(Channel)
		var socket = ioCli('/'+Channel);
	else
		var socket = ioCli.connect('http://'+ip+':'+Port);
		
	console.error(ip,Port,Channel);
	 
	socket.on('log', function (data) {
		data = JSON.parse(data)
	  	callbackLog(data);
	});

	socket.on('error', function (data) {
		data = JSON.parse(data)
	  	callbackError(data);
	});
}