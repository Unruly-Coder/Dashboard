angular.module('ui.bootstrap.setNgAnimate', ['ngAnimate'])
.directive('setNgAnimate', ['$animate', function ($animate) {
    return {
        link: function ($scope, $element, $attrs) {
            $scope.$watch( function() {
                return $scope.$eval($attrs.setNgAnimate, $scope);
            }, function(valnew, valold){
                console.log('Directive animation Enabled: ' + valnew);
                $animate.enabled(!!valnew, $element);
            });
        }
    };
}]);