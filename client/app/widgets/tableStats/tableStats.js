angular.module('dashboard')
    .config(function(widgetServiceProvider) {
        widgetServiceProvider.register('foostable', {
            name: 'foosball table statistic',
            sizex: 1,
            sizey: 1,
            template: ''
        })
    });