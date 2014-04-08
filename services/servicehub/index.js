module.exports = function setup(options, imports, register) {

    var q, ntlm, ntlmrequest;

    q = require('q');
    ntlm = require('ntlm');
    ntlmrequest = require('request').defaults({
        agentClass: require('agentkeepalive').HttpsAgent
    });

    function getData(url) {
        var deffered = q.defer();

        ntlmrequest(url, {
            headers: {
                'Authorization': ntlm.challengeHeader(options.hostname, options.domain)
            }
        }, function (err, res) {
            if(err) {
                deffered.reject(err)
            } else {
                ntlmrequest(url, {
                    headers: {
                        'Authorization': ntlm.responseHeader(res, url, options.domain, options.username, options.password)
                    }
                }, function (err, res, body) {
                    if(err) {
                        deffered.reject(err)
                    } else {
                        deffered.resolve(body);
                    }
                });
            }
        });

        return deffered.promise;
    }

    register(null, { 'servicehub': { getData: getData } });
};