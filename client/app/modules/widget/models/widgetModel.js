angular.module('widget').factory('WidgetModel', ['$q', function($q) {
    function Widget(settings) {
        this.data = undefined;
        angular.extend(this, angular.copy(settings));
        this.bindDataSource();
    }

    Widget.prototype = {

        getData: function() {
            var deferred = $q.defer();

            this.data = {};
            deferred.resolve();

            return deferred.promise;
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
