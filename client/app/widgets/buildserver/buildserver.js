angular.module('widget')
    .config(function(widgetServiceProvider) {
        widgetServiceProvider.register('buildserver', {
            sizex: 2,
            sizey: 2,
            color: '#63c3b5',
            template: 'buildserver/buildserver.html',
            editTemplate: 'buildserver/buildserverEdit.html',
            dataBind: {
                type: 'internal',
                source: '/api/buildserver'
            }
        });
    });