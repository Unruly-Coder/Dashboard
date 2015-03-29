angular.module('dashboard')
.controller('ConfigurationCtrl', ['$scope', 'widgetService', 'widgetManager', function($scope, widgetService, widgetManager) {
    var widgetList = widgetService.getWidgetList();

    $scope.widgets = widgetList;
    $scope.addWidget = function(index) {
        var widget = widgetService.createWidget(widgetList[index].settings);
        widgetManager.addWidget(widget);
    };
}]);