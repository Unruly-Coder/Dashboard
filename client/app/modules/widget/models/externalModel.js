angular.module('widget').factory('ExternalWidgetModel', ['$http', 'WidgetModel', function($http, WidgetModel) {
    function ExternalWidgetModel(settings){
        WidgetModel.apply(this, arguments);
    }

    function getData() {
        var promise,
            self = this,
            request = {
                url: self.options.dataBind.source,
                method: 'GET'
            };

        if (angular.isObject(this.options.dataBind.request)) {
            request = angular.extend(request, this.options.dataBind.request);
        }

        promise = $http(request).then(function(response){
            self.data = response.data;
        }, function() {
            console.error('can not connect with ' + self.options.dataBind.source );
        });

        return promise;
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
    ExternalWidgetModel.prototype.getData = getData;

    return ExternalWidgetModel;

}]);
