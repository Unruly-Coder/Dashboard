angular.module('widget').factory('ExternalWidgetModel', ['$http', 'WidgetModel', function($http, WidgetModel) {
    function ExternalWidgetModel(settings){
        WidgetModel.apply(this, arguments);
    }

    function bindDataSource() {
        var self = this;
        this.options.dataBind.bindReference = setInterval(function() {
            self.getData.apply(self);
        }, this.options.dataBind.interval);
    }

    function unbindDataSource() {
        clearInterval(this.options.dataBind.bindReference);
    }

    ExternalWidgetModel.prototype = Object.create(WidgetModel.prototype);
    ExternalWidgetModel.prototype.constructor = ExternalWidgetModel;
    ExternalWidgetModel.prototype.bindDataSource = bindDataSource;
    ExternalWidgetModel.prototype.unbindDataSource = unbindDataSource;

    return ExternalWidgetModel;

}]);