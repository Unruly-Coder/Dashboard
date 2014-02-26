angular.module('dashboard')
    .config(function(widgetServiceProvider) {
        widgetServiceProvider.register('foosball-table', {
            name: 'foosball table state',
            sizex: 2,
            sizey: 2,
            color: '#ffffff',
            template: 'something'
        })
    });