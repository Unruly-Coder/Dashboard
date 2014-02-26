var io = require('socket.io');

module.exports = function setup(options, imports, register) {

	var webserver = imports['webserver'],
		logger = imports['logger'];

	io.listen(webserver.http);

	register(null, {
		websocket: io
	});

};