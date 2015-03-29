angular.module('widget')
    .config(function(widgetServiceProvider) {
        widgetServiceProvider.register('birthday', {
            sizex: 2,
            sizey: 2,
            color: '#e9367a',
            template: 'birthday/birthday.html',
            dataBind: {
                type: 'internal',
                source: '/api/birthday'
            }
        });
    });