angular.module('dashboard')
    .config(function(widgetServiceProvider) {
        widgetServiceProvider.register('weather widget',
            {
                sizex: 1,
                sizey: 1,
                color: 'hotpink',
                template: 'weather.html',
                dataBind: {
                    type: 'external',
                    source: 'http://api.openweathermap.org/data/2.5/forecast/daily?id=3094802&units=metric&cnt=7',
                    interval: 6000
            }
        });
    });