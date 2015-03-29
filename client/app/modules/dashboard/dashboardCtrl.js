angular.module('dashboard')
    .controller('DashboardCtrl', ['$scope', 'widgetManager', 'widgetService', function($scope, widgetManager, widgetService) {
        init();

        function init() {
            loadDashboardState();

            $scope.widgets = widgetManager.getAllWidgets();
            $scope.remove = widgetManager.removeWidget;
            $scope.updateWidgets = updateWidgets;

            $scope.$watch('widgets', function(){
                saveDashboardState();
            }, true);
        }

        function updateWidgets(data) {
            angular.forEach(data, function(value, key) {
                this[key].col = value.col;
                this[key].row = value.row;
            }, $scope.widgets);
            $scope.$digest();
        }

        function saveDashboardState() {
            localStorage.widgets = angular.toJson($scope.widgets);
        }

        function loadDashboardState() {
           var storage = angular.fromJson(localStorage.widgets);

           if(storage === undefined) {
               return;
           }

           angular.forEach(storage, function(value) {
               this.addWidget(widgetService.createWidget(value));
           }, widgetManager);
        }

    }]);