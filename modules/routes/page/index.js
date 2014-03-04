module.exports = function setup(options, imports, register) {

    var webserver = imports['webserver'];

    function staticPage(request, response) {
        response.sendfile(options.path);
    }

    webserver.app.get('/', staticPage);

    register(null, {});
}
