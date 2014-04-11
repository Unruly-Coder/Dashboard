module.exports = function setup(options, imports, register) {

    var dataService, xml2js, logger, request, parser, q,  projects;

    request = require('request');
    xml2js = require('xml2js');
    dataService = imports.data;
    _ = require('underscore');
    q = require('q');
    parser = new xml2js.Parser();
    projects = {};

    function parseData(data) {
        var deffered = q.defer(),
            projects = {};

        parser.parseString(data, function (err, result) {
            if(err) {
                deffered.reject(err);
            }

            _.each(result.Projects.Project, function(project) {
                projects[project.$.name.split(' ').join('_')] = {
                    name: project.$.name,
                    lastBuildStatus: project.$.lastBuildStatus,
                    activity: project.$.activity
                }
            });

            deffered.resolve(projects);
        });

        return deffered.promise;
    }

    function getData(url) {
        var deffered = q.defer();

        request(url, function(err, res, body) {
            if(err) {
                deffered.reject(err)
            }

            deffered.resolve(body);
        });

        return deffered.promise;
    }

    function updateData() {
        var amount = 0;

        _.each(options.servers, function(url, index, list) {
            getData(url)
                .then(parseData)
                .then(function(parsedData) {
                    _.extend(projects, parsedData);
                })
                .finally(function() {
                    if(++amount === list.length) {
                        dataService.set('buildserver', projects);
                    }
                });
        });
    }

    updateData();
    setInterval(updateData, 60000);

    register(null, {});
};