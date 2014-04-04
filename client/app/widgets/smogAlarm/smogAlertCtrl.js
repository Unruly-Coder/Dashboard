angular.module('dashboard')
    .controller('smogAlertCtrl', ['$scope', '$interval', function($scope, $interval){

        function getParseData(value) {
            var pollutant =  value,
                space = 100 - pollutant,
                color = '#89ae0d';

            if(space < 0) {
                space = 0;
                color = '#ec1414';
            }

            return [
                {value: pollutant, color: color},
                {value: space, color: '#000'}
            ];
        }

        $scope.chartData = getParseData($scope.options.data.pollutants[2].normPercent);

        $scope.$watch(function() {
            return $scope.options.data.pollutants[2].normPercent;
        }, function(newValue) {
            $scope.chartData = getParseData(newValue);
        });

        $scope.chartOptions = {
            segmentShowStroke : false,             //Boolean - Whether we should show a stroke on each segment
            percentageInnerCutout : 95,            //The percentage of the chart that we cut out of the middle.
            animation : true,                      //Boolean - Whether we should animate the chart
            animateRotate : false,                 //Boolean - Whether we animate the rotation of the Doughnut
            animateScale : true                    //Boolean - Whether we animate scaling the Doughnut from the centre
        };
    }])

    .controller('smogAlertEditCtrl', ['$scope', '$collection', function($scope, $collection) {
        var stationCollection = $collection.getInstance();

        stationCollection.addAll([
            {address: 'Al.Krasińskiego', city: 'Kraków', 'url': 'http://smogalert.pl/api/stats/krakow-krasinskiego'},
            {address: 'ul. Bulwarowa', city: 'Kraków', 'url': 'http://smogalert.pl/api/stats/krakow-bulwarowa'},
            {address: 'ul. Bujaka', city: 'Kraków', 'url': 'http://smogalert.pl/api/stats/krakow-bujaka'}
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