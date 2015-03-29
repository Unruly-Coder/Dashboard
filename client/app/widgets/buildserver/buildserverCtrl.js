angular.module('widget')
    .controller('buildserverCtrl', ['$scope', function($scope){


    }])

    .controller('buildserverEditCtrl', ['$scope', function($scope) {

        $scope.project = $scope.options.project;

        $scope.save = function() {
            $scope.options.project = $scope.project;
            $scope.options.flip = false;
        };
    }]);