module.exports = function setup(options, imports, register) {

    var webserver = imports.webserver,
        data = imports.data;

    var api = {

        getById: function(request, response) {

           var tmpData = data.get(request.params.id);

            if(tmpData) {
                response.json(tmpData);
            } else {
                response.status(404).send('Not found');
            }

        },

        getAll: function(request, response) {
            response.json(data.get());
        }
    };


    webserver.app.get('/api/', api.getAll);
    webserver.app.get('/api/:id', api.getById);

    register(null, {});
};
