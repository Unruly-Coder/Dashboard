angular.module('dashboard',[])
    .controller('DashboardCtrl', ['$scope', 'widgetService', function($scope, widgetService) {
        $scope.dashboard = {
            widgets : widgetService.widgetInUse
        }
        $scope.remove = function(index) {
            console.log(index);
            $scope.dashboard.widgets.splice(index, 1);
        }
    }]);