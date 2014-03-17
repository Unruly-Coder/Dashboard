var config = require('config'),
    _ = require('underscore'),
    aConfig = [];

    _.each(config, function(val, key) {
        aConfig.push(_.extend({
            packagePath: './' + key
        }, val));
    });

module.exports = aConfig;