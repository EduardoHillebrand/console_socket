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
var ifaces = os.networkInterfaces();
const Server = require('socket.io');
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
	'setChannel':setChannel
};

/**
 * Replace function console.log && error by io.emit.
 *
 * @public
 */
function Replacer (channel=false) {
	if(!Channel)
		Channel = channel;
	io = new Server(Port);
	io.on('connection', function(socket){
		console.error('ccc');
		io.on('subscribe', function(room){
			console.error('jjj');
			socket.join(room);
		});
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
	console.error(arguments);
	if(Channel)
		io.sockets.in(Channel).emit('log', JSON.stringify(arguments));
	else
		io.emit('log', JSON.stringify(arguments));		
}
function ConsoleErrorSocket () {
	if(Channel)
		io.sockets.in(Channel).emit('error', JSON.stringify(arguments));
	else
		io.emit('error', JSON.stringify(arguments));		
}

function Listener(ip='localhost', callbackLog=console.log, callbackError=console.error) {
	var socket = ioCli.connect('http://'+ip+':'+Port);
	console.error(ip,Port,Channel);
	if(Channel)
		socket.emit('subscribe', Channel);  

	socket.on('log', function (data) {
		data = JSON.parse(data)
	  	callbackLog(data);
	});

	socket.on('error', function (data) {
		data = JSON.parse(data)
	  	callbackError(data);
	});
}
