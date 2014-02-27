angular.module('dashboard',[])
    .controller('DashboardCtrl', ['$scope', 'widgetManager', function($scope, widgetManager) {


        $scope.dashboard =  widgetManager.getAllWidgets();

        $scope.remove = function(index) {
            console.log(index);
            widgetManager.removeWidget(index);
        }

        $scope.serialize = function(data) {
            widgetManager.updateWidgetsPosition(data);
        }

        widgetManager.loadAllWidgets();
    }]);