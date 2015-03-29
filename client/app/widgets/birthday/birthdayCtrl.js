angular.module('widget')
    .controller('birthdayCtrl', ['$scope', function($scope){

        $scope.slides = $scope.options.data;
        $scope.interval = 5000;
        $scope.noTransition = false;
        $scope.noPause = true;

    }])

    .controller('birthdayEditCtrl', ['$scope', function($scope) {

    }]);