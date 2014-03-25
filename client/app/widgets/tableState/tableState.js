angular.module('dashboard')
    .config(function(widgetServiceProvider) {
        widgetServiceProvider.register('foosballState', {
            name: 'foosball table state',
            sizex: 2,
            sizey: 2,
            color: '#ffffff',
            template: 'tableState.html'
        });
    });