angular.module('widget').factory('WidgetModel', ['$http', function($http) {
    function Widget(settings) {
        this.options = {
            col: 0,
            row: 0,
            flip: false
        };

        this.data = undefined;

        angular.extend(this, angular.copy(settings));

        this.bindDataSource();
    }

    Widget.prototype = {

        getData: function() {
            if(!this.options.dataBind) {
                return;
            }

            var promise = $http.get(this.options.dataBind.source),
                self = this;

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