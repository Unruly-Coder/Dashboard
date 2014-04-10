module.exports = function setup(options, imports, register) {

    var q, ntlm, ntlmrequest;

    q = require('q');
    ntlm = require('ntlm');
    ntlmrequest = require('request').defaults({
        agentClass: require('agentkeepalive').HttpsAgent,
        timeout: 1000
    });

    function getData(url) {
        var deffered = q.defer();

        ntlmrequest(url, {
            encoding: null,
            headers: {
                'Authorization': ntlm.challengeHeader(options.hostname, options.domain)
            }
        }, function (err, res) {
            if(err) {
                deffered.reject(err)
            } else {
                ntlmrequest(url, {
                    encoding: null,
                    headers: {
                        'Authorization': ntlm.responseHeader(res, url, options.domain, options.username, options.password),
                        'Connection': 'Close'
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