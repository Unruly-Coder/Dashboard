angular.module('widget')
    .controller('smogAlertCtrl', ['$scope', function($scope){

        var chartData = [];

        $scope.chartData = function() {
            var pollutant =  $scope.options.data.pollutants[2].normPercent,
                space = 100 - pollutant,
                color = '#89ae0d';

            if(space < 0) {
                space = 0;
                color = '#ec1414';
            }

            chartData.length = 0;
            chartData.push({value: pollutant, color: color});
            chartData.push({value: space, color: '#000'});

            return chartData;
        };

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

        $scope.station = $scope.options.dataBind.source;

        $scope.stations = stationCollection.all();

        $scope.save = function() {
            $scope.options.dataBind.source = $scope.station;
            $scope.options.getData().then(function() {
            $scope.options.flip = false;
            });
        };
    }]);