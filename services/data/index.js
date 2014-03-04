var Emitter = require('events').EventEmitter;

module.exports = function setup(options, imports, register) {
    var emitter = new Emitter,
        buffer = {};

    function set(key, value) {
        if(!key || !value) {
            console.error("Data service: You have to specified argument 'key' and 'value' in 'set' method");
            throw new Error("Data service: You have to specified argument 'key' and 'value' in 'set' method");
        }

        buffer[key] = value;
        emitter.emit('newData', key, value);
    }

    function get(key) {
        if(key) {
           return buffer[key];
        }

        return buffer;
    }


    register(null, {
        data : { set : set,
                 get : get,
                 on  : emitter.on.bind(emitter)
        }
    });
}
