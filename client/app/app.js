angular.module('app', [
    'ngAnimate',
    'ngCollection',
    'chartjs',
    'ui.select2',
    'ui.bootstrap',
    'ui.bootstrap.setNgAnimate',
    'dashboard'
]).controller('AppCtrl', ['$scope','$location', function($scope, $location) {
        $scope.$watch(function() {
            return $location.path();
        }, function(path) {
               $scope.configuration = path === '/config';
        });
    }]);