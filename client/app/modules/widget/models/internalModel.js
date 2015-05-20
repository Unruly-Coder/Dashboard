angular.module('widget').factory('InternalWidgetModel', ['socket', '$http', 'WidgetModel', function(socket, $http, WidgetModel) {
    function InternalWidgetModel(settings){
        WidgetModel.apply(this, arguments);
    }

    function getData() {
        var promise = $http.get(this.options.dataBind.source),
            self = this;

        promise.then(function(response){
            self.data = response.data;
        }, function() {
            console.error('can not connect with ' + self.options.dataBind.source );
        });

        return promise;
    }

    function bindDataSource() {
        var self = this;

        this.options.dataBind.bindReference = {
            channel: this.options.dataBind.source.substring(5),
            fn: function(data) {
                self.data = data;
            }
        };

        socket.on(this.options.dataBind.bindReference.channel, this.options.dataBind.bindReference.fn);
    }

    function unbindDataSource() {
        socket.off(this.options.dataBind.bindReference.channel, this.options.dataBind.bindReference.fn);
    }

    InternalWidgetModel.prototype = Object.create(WidgetModel.prototype);
    InternalWidgetModel.prototype.constructor = InternalWidgetModel;
    InternalWidgetModel.prototype.bindDataSource = bindDataSource;
    InternalWidgetModel.prototype.unbindDataSource = unbindDataSource;
    InternalWidgetModel.prototype.getData = getData;

    return InternalWidgetModel;

}]);
