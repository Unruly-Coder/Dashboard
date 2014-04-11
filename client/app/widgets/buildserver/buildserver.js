angular.module('dashboard')
    .config(function(widgetServiceProvider) {
        widgetServiceProvider.register('buildserver', {
            sizex: 2,
            sizey: 2,
            color: '#ffffff',
            template: 'buildserver.html',
            editTemplate: 'buildserverEdit.html',
            dataBind: {
                type: 'internal',
                source: '/api/buildserver'
            }
        });
    });