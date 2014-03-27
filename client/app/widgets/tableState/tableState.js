angular.module('dashboard')
    .config(function(widgetServiceProvider) {
        widgetServiceProvider.register('foosball table state', {
            sizex: 2,
            sizey: 2,
            color: '#ffffff',
            template: 'tableState.html',
            dataBind: {
                type: 'internal',
                source: '/api/foosballState'
            }
        });
    });