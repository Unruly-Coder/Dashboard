module.exports = function status(options, imports, register) {

    var webserver = imports['webserver'],
        data = imports['data'];

    var api = {

        getById: function(request, response) {

           var tmpData = data.get(request.params.id);

            if(tmpData) {
                response.json({
                    success: true,
                    data: tmpData
                })
            } else {
                response.json({
                    success: false,
                    error: 'undefined variable'
                })
            }

        },

        getAll: function(request, response) {
            var tmpData = data.get();

            if(tmpData) {
                response.json({
                    success: true,
                    data: tmpData
                })
            } else {
                response.json({
                    success: false,
                    error: 'no data'
                })
            }
        }
    }


    webserver.app.get('/api/', api.getAll);
    webserver.app.get('/api/:id', api.getById);

    register(null, {});
}
