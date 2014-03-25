var serialport = require('serialport');

module.exports = function setup(options, imports, register) {

    if(!options.path) {
        throw 'serial port cannot be initialized. Missing path';
    }

    options.parser = serialport.parsers.readline("\n");


        var serial,
            polyfill = function(error) {
                console.log(error);
                serial = { on : function() { }};
            };

        serial =  new serialport.SerialPort(options.path, options, true, polyfill);

    register(null, { 'serialport': serial });
};