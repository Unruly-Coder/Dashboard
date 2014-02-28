angular.module('dashboard',[])
    .controller('DashboardCtrl', ['$scope', 'widgetManager', function($scope, widgetManager) {

        widgetManager.loadAllWidgets();
        $scope.dashboard =  widgetManager.getAllWidgets();

        $scope.remove = function(index) {
            widgetManager.removeWidget(index);
        }

        $scope.serialize = function(data) {
            widgetManager.updateWidgetsPosition(data);
            $scope.$digest();
        }

        $scope.$watch('dashboard', function(){
           widgetManager.saveAllWidgets();
        }, true);
    }]);