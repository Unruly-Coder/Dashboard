var io = require('socket.io'),
	ioClient = require('socket.io-client');

module.exports = function setup(options, imports, register) {

	var webserver = imports.webserver;

	io = io.listen(webserver.http);
	register(null, {
		socketServer: io,
		socketClient: ioClient
	});
};