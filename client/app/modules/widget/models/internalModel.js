angular.module('widget').factory('InternalWidgetModel', ['socket', 'WidgetModel', function(socket, WidgetModel) {
    function InternalWidgetModel(settings){
        this.options = {
            dataBind: {
                bindReference: {}
            }
        };
        WidgetModel.apply(this, arguments);
    }

    function bindDataSource() {
        var self = this;

        this.options.dataBind.bindReference.chanel = this.options.dataBind.source.substring(5);
        this.options.dataBind.bindReference.fn = function(data) {
                self.data = data;
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

    return InternalWidgetModel;

}]);