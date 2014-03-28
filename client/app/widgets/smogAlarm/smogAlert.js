angular.module('dashboard')
    .config(function(widgetServiceProvider) {
        widgetServiceProvider.register('smog alert', {
            sizex: 2,
            sizey: 2,
            color: 'white',
            template: 'smogAlert.html',
            editTemplate: 'smogAlertEdit.html',
            dataBind: {
                type: 'external',
                source: 'http://smogalert.pl/api/stats/krakow',
                interval: 6000
            }
        });
    });