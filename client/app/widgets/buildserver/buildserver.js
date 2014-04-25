angular.module('dashboard')
    .config(function(widgetServiceProvider) {
        widgetServiceProvider.register('buildserver', {
            sizex: 2,
            sizey: 2,
            color: '#63c3b5',
            template: 'buildserver.html',
            editTemplate: 'buildserverEdit.html',
            dataBind: {
                type: 'internal',
                source: '/api/buildserver'
            }
        });
    });