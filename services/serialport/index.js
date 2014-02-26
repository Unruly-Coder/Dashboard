var serialport = require('serialport');

module.exports = function setup(options, imports, register) {

    if(!options.path) {
        throw 'serial port cannot be initialized. Missing path';
    }

   // var serial =  new serialport.SerialPort(options.path, options);
    var serial = { on : function() { }};
    register(null, { 'serialport': serial });
}