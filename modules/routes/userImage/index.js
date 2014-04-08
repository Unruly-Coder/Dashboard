module.exports = function setup(options, imports, register) {

    var webserver = imports.webserver,
        servicehub = imports.servicehub;

    function userImageHandler(request, response) {
        servicehub.getData(options.url + request.params.id).then(function(data) {
            response.set('Content-Type', 'image/jpeg');
            response.send(data);
        });
    }

    webserver.app.get('/user/:id.jpg', userImageHandler);


    register(null, {});
};
