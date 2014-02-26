var Emitter = require('eventemitter2').EventEmitter2;

module.exports = function setup(options, imports, register) {

    var eventbus =  new Emitter({
        wildcard: true,
        delimiter: '::',
        newListener: false,
        maxListeners: 20
    });

    register(null, {
        eventbus: eventbus
    });
};