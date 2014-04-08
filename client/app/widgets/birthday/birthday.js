angular.module('dashboard')
    .config(function(widgetServiceProvider) {
        widgetServiceProvider.register('birthday', {
            sizex: 2,
            sizey: 2,
            color: '#ffffff',
            template: 'birthday.html',
            dataBind: {
                type: 'internal',
                source: '/api/birthday'
            }
        });
    });