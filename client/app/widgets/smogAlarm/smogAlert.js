angular.module('dashboard')
    .config(function(widgetServiceProvider) {
        widgetServiceProvider.register('smog alert', {
            sizex: 2,
            sizey: 2,
            color: '#ffffff',
            template: 'smogAlert.html',
            editTemplate: 'smogAlertEdit.html',
            dataBind: {
                type: 'external',
                source: 'http://smogalert.pl/api/stats/krakow-krasinskiego',
                interval: 600000
            }
        });
    });