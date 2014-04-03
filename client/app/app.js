angular.module('app', ['dashboard', 'ngAnimate', 'ngCollection', 'chartjs'])

    .controller('AppCtrl', ['$scope','$location', function($scope, $location) {
        $scope.$watch(function() {
            return $location.path();
        }, function(path) {
           if(path === '/config') {
               $scope.configuration = true;
           } else {
               $scope.configuration = false;
           }
        });
    }])

    .controller('ConfigurationCtrl', ['$scope', 'widgetService', 'widgetManager', function($scope, widgetService, widgetManager) {
        var widgetList = widgetService.getWidgetList();

        $scope.widgets = widgetList;
        $scope.addWidget = function(index) {
            var widget = widgetService.createWidget(widgetList[index].settings);
            widgetManager.addWidget(widget);
        };
    }]);