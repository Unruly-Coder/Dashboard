var serialport = require('serialport');

module.exports = function setup(options, imports, register) {

    var logger = imports.logger;

    if(!options.path) {
        throw 'serial port cannot be initialized. Missing path';
    }

    options.parser = serialport.parsers.readline("\n");


        var serial,
            polyfill = function(error) {
                if(error) {
                    logger.error('serialport - ' + error.message);
                }

                serial = { on : function() { }};
            };

        serial =  new serialport.SerialPort(options.path, options, true, polyfill);

    register(null, { 'serialport': serial });
};