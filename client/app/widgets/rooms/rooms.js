angular.module('widget')
    .config(function(widgetServiceProvider) {
        widgetServiceProvider.register('rooms', {
            sizex: 1,
            sizey: 1,
            template: 'rooms/rooms.html',
            editTemplate: 'rooms/roomsEdit.html',
            dataBind: {
                type: 'internal',
                source: '/api/rooms'
            }
        });
    });