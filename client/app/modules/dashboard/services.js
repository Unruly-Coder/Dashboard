angular.module('dashboard')
    .provider('widgetService', function( ){

        var widgetList = [];

        return {
            register: function(name, widgetSettings) {
                var widget = {
                    name: name,
                    settings: widgetSettings
                };

                angular.extend(widget.settings, {
                    col: 0,
                    row: 0,
                    template: 'views/widgets/' + widget.settings.template,
                    editTemplate: widget.settings.editTemplate ? 'views/widgets/' + widget.settings.editTemplate : undefined
                });

                widgetList.push(widget);
            },
            $get: function($http, socket) {

                return {
                    getWidgetList: function() {
                        return widgetList;
                    },
                    createWidget: function(widgetData) {
                        var bindReference, url, widget = {};

                        widget.flip = false;

                        angular.extend(widget, widgetData);

                        widget.getData = function() {
                           var promise = $http.get(widget.dataBind.source);

                            promise.then(function(response){
                                widget.data = response.data;
                            }, function() {
                                console.error('can not connect with ' + url );
                            });

                            return promise;
                        };

                        switch(widget.dataBind.type) {
                            case 'internal':

                                bindReference = {
                                    channel: widget.dataBind.source.substring(5),
                                    fn: function(data) {
                                        widget.data = data;
                                    }
                                };

                                socket.on(bindReference.channel, bindReference.fn);

                                widget.unbindData = function() {
                                    socket.off(bindReference.channel, bindReference.fn);
                                };

                                break;

                            case 'external':

                                bindReference = setInterval(widget.getData, widget.dataBind.interval);

                                widget.unbindData = function() {
                                    clearInterval(bindReference);
                                };

                                break;

                            default:
                                widget.unbindData = function(){};
                                break;
                        }

                        widget.getData();

                        return widget;
                    }
                };
            }
        };
    })
    .factory('widgetManager', ['$http', 'socket', function($http, socket) {

        var _widgetsInUse = [];

        return {

            getAllWidgets: function() {
                return _widgetsInUse;
            },

            addWidget: function(widget) {
                widget.getData();
                _widgetsInUse.push(widget);
            },

            removeWidget: function(index) {
                _widgetsInUse.splice(index, 1)[0].unbindData();
            }
        };
    }]);
