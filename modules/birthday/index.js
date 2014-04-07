module.exports = function setup(options, imports, register) {

    var data, _, dataService, ntlm, ntlmrequest;

    dataService = imports.data;
    _ = require('underscore');
    ntlm = require('ntlm');
    ntlmrequest = require('request').defaults({
        agentClass: require('agentkeepalive').HttpsAgent
    });


    ntlmrequest(options.url, {
        headers: {
            'Authorization': ntlm.challengeHeader(options.hostname, options.domain)
        }
    }, function (err, res) {
        ntlmrequest(options.url, {
            headers: {
                'Authorization': ntlm.responseHeader(res, options.url, options.domain, options.username, options.password)
            }
        }, function (err, res, body) {
            data = JSON.parse(body);
            _.each(data, function(item) {
                _.each(item, function(property) {
                    if(property.Key === 'makingwavesemployeebirthdate') {
                        console.log(property.Value);
                    }
                });
              // console.log(item);
            });
        });
    });

    register(null, {});
};