angular.module('dashboard')
    .controller('weatherEditCtrl', ['$scope', '$collection', function($scope, $collection) {

        var cityCollection = $collection.getInstance(),
            colors = {
                good : '#e9367b',
                bad : '#008b9c'
            };

        cityCollection.addAll([
            {city: 'Kraków', 'url': 'http://api.openweathermap.org/data/2.5/weather?id=3094802&units=metric'},
            {city: 'Oslo', 'url': 'http://api.openweathermap.org/data/2.5/weather?id=3143244&units=metric'}
        ]);

        $scope.city = cityCollection.find('url', $scope.options.dataBind.source);

        $scope.cities = cityCollection.all();

        $scope.$watch(function() {
            return $scope.options.data.weather[0].icon;
        }, function(newData) {
            if(newData === "01d" || newData === "02d" ||  newData === "01n" ||  newData === "02n") {
                $scope.options.color = colors.good;
            } else {
                $scope.options.color = colors.bad;
            }
        });

        $scope.save = function() {
            $scope.options.dataBind.source = $scope.city.url;
            $scope.options.getData().then(function() {
                $scope.options.flip = false;
            });
        };
    }]);