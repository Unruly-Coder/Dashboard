angular.module('dashboard')
    .config(function(widgetServiceProvider) {
        widgetServiceProvider.register({
            data: 'http://api.openweathermap.org/data/2.5/forecast/daily?id=3094802&units=metric&cnt=7',
            interval: 60000
        }, {
            name: 'weather widget',
            sizex: 7,
            sizey: 1,
            color: 'hotpink',
            template: 'weather.html'
        });
    });