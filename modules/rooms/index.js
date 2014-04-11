module.exports = function setup(options, imports, register) {

    var _,  dataService, servicehub, logger;

    dataService = imports.data;
    servicehub  = imports.servicehub;
    logger = imports.logger;
    _ = require('underscore');

    dataService.set('rooms', {

    });

    register(null, {});
};
