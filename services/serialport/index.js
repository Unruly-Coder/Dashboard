var serialport = require('serialport');

module.exports = function setup(options, imports, register) {

    if(!options.path) {
        throw 'serial port cannot be initialized. Missing path';
    }

    options.parser = serialport.parsers.readline("\n");

   // var serial =  new serialport.SerialPort(options.path, options);
    var serial = { on : function() { }};
    register(null, { 'serialport': serial });
}