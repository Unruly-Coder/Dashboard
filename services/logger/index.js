var winston = require('winston');

module.exports = function setup(options, imports, register) {


    var exitOnError = options.exitOnError;
    var logger = new winston.Logger({
        transports: [],
        exitOnError: (exitOnError || true)
    });

    var transports = options.transports||{};

    for(transport in transports) {
        var transportOptions = transports[transport];

        switch(transportOptions.type){
            case 'console':
                logger.add(winston.transports.Console, transportOptions);
                break;
            case 'file':
                logger.add(winston.transports.File, transportOptions);
                break;
        }
    }


    register(null, {
        logger: logger
    });
};