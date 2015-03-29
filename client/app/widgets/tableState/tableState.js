angular.module('widget')
    .config(function(widgetServiceProvider) {
        widgetServiceProvider.register('foosball table state', {
            sizex: 2,
            sizey: 2,
            color: '#ffffff',
            template: 'tableState/tableState.html',
            dataBind: {
                type: 'internal',
                source: '/api/foosballState'
            }
        });
    });