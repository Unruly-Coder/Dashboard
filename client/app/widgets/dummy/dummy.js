angular.module('dashboard')
    .config(function(widgetServiceProvider) {
        widgetServiceProvider.register('dummy', {
            name: 'dummy widget',
            sizex: 3,
            sizey: 2,
            color: 'hotpink',
            template: ''
        })
    });