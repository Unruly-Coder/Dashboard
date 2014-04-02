angular.module('dashboard')
    .controller('smogAlertEditCtrl', ['$scope', '$collection', function($scope, $collection) {
        var stationCollection = $collection.getInstance();

        stationCollection.addAll([
            {address: 'Al.Krasińskiego', city: 'Kraków', 'url': 'http://smogalert.pl/api/stats/krakow-krasinskiego'},
            {address: 'ul. Bulwarowa', city: 'Kraków', 'url': 'http://smogalert.pl/api/stats/krakow-bulwarowa'},
            {address: 'ul. Bujaka', city: 'Kraków', 'url': 'http://smogalert.pl/api/stats/krakow-bujaka'},
            {address: 'ul. Sienkiewicza', city: 'Zakopane', 'url': 'http://smogalert.pl/api/stats/zakopane'},
            {address: 'ul. Nadbrzeżna', city: 'Nowy Sącz', 'url': 'http://smogalert.pl/api/stats/nowy-sacz'},
            {address: 'os. Ogrody', city: 'Skawina', 'url': 'http://smogalert.pl/api/stats/skawina'}
        ]);

        $scope.station = stationCollection.find('url', $scope.options.dataBind.source);

        $scope.stations = stationCollection.all();

        $scope.save = function() {
            $scope.options.dataBind.source = $scope.station.url;
            $scope.options.getData().then(function() {
                $scope.options.flip = false;
            });
        };
    }]);