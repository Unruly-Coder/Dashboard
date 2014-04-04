angular.module('dashboard')
    .config(function(widgetServiceProvider) {
        widgetServiceProvider.register('rooms', {
            sizex: 1,
            sizey: 1,
            template: 'rooms.html',
            editTemplate: 'roomsEdit.html',
            dataBind: {
                type: 'internal',
                source: '/api/rooms'
            }
        });
    });