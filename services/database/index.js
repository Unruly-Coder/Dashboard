var mongoose = require('mongoose');

module.exports = function setup(options, imports, register) {

    var logger = imports.logger,
        db;

    if(!options.path) {
        console.error("Data service: You have to specified argument 'key' and 'value' in 'set' method");
        throw new Error("Data service: You have to specified argument 'key' and 'value' in 'set' method");
    }

    mongoose.connect(options.path);
    db = mongoose.connection;

    db.on('error', function() {
        logger.error('Database connection error :(');
    });

    db.once('open', function callback () {
        logger.info('Database connection established - ready to go ;)');
    });

    register(null, { database : db });
};
