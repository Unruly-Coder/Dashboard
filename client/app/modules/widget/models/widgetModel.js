angular.module('widget').factory('WidgetModel', ['$http', function($http) {
    function Widget(settings) {
        this.data = undefined;
        angular.extend(this, angular.copy(settings));
        this.bindDataSource();
    }

    Widget.prototype = {

        getData: function() {
            if(!this.options.dataBind) {
                return;
            }

            var self = this,
                request = {
                    url: self.options.dataBind.source,
                    method: 'GET'
                };

            if (angular.isObject(this.options.dataBind.request)) {
                request = angular.extend(request, angular.copy(this.options.dataBind.request))
            }
            var promise = $http(request);

            promise.then(function(response){
                self.data = response.data;
            }, function() {
                console.error('can not connect with ' + self.options.dataBind.source );
            });

            return promise;
        },
        flip: function() {
            this.options.flip = !this.options.flip;
        },
        bindDataSource: function() {

        },
        unbindDataSource: function() {

        }
    };

    return Widget;
}]);
