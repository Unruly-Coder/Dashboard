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
                this[key].options.col = value.col;
                this[key].options.row = value.row;
            }, $scope.widgets);
            $scope.$digest();
        }

        function saveDashboardState() {
            localStorage.widgets = prepareWidgetsToStore(widgetManager.getAllWidgets());
        }

        function prepareWidgetsToStore(data) {
            data = angular.copy(data);
            data.forEach(function(item){
                item.data = undefined;
            });

            return angular.toJson(data);
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