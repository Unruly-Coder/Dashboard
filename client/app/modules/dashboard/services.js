angular.module('dashboard')
    .provider('widgetService', function(){

        var widgetList = [];

        return {
            register: function(channel, widget) {
                widget.channel = channel;
                widget.col = 0;
                widget.row = 0;
                widget.template = 'views/widgets/' + widget.template;
                widgetList.push(widget);
            },
            $get: function() {
                return {
                    getWidgetList: function() {
                        return widgetList;
                    }
                };
            }
        };
    })
    .factory('widgetManager', ['$http', 'socket', function($http, socket) {

        var _widgetsInUse = [];

        function _loadData(url, widget) {
            var promise = $http.get(url)
                .then(function(response){
                    widget.data = response.data;
                }, function() {
                    console.error('can not connect with' + url );
                });

            return promise;
        }

        function _load(widget){
            var promise;

            switch(typeof widget.channel) {
                case 'string':
                    promise = _loadData('/api/' + widget.channel, widget)
                    .then(function() {
                        var fn = function(data) {
                            widget.data = data;
                        };

                        socket.on(widget.channel, fn);

                        widget.unbindData = function() {
                            socket.off(this.channel, fn);
                        };

                     });
                    break;
                case 'object':
                    if(!widget.channel.data) {
                        console.error('"data" attribute missing');
                        return;
                    }
                    promise = _loadData(widget.channel.data, widget)
                    .then(function() {
                        var id = setInterval(function() {
                            _loadData(widget.channel.data, widget);
                        }, widget.channel.interval);

                        widget.unbindData = function() {
                            clearInterval(id);
                        };
                    });
                    break;
                default:
                    widget.unbindData = function(){};
                    break;
            }
            return promise;
        }

        var widgetManager = {

            saveAllWidgets: function() {
                localStorage.widgets = angular.toJson(_widgetsInUse);
            },

            loadAllWidgets: function() {
                var storage = angular.fromJson(localStorage.widgets);

                if(storage === undefined) {
                    return;
                }

                _widgetsInUse.length = 0;
                angular.forEach(storage, function(value) {
                    this.addWidget(value);
                }, widgetManager);
            },

            getAllWidgets: function() {
                return _widgetsInUse;
            },

            updateWidgetsPosition: function(data) {
                angular.forEach(data, function(value, key) {
                    this[key].col = value.col;
                    this[key].row = value.row;
                }, _widgetsInUse);
            },

            addWidget: function(widget) {
                widget = angular.copy(widget);

                if(widget.channel) {
                    _load(widget).then(function(){
                        _widgetsInUse.push(widget);
                    });
                } else {
                    _widgetsInUse.push(widget);
                }

            },

            removeWidget: function(index) {
                _widgetsInUse.splice(index, 1)[0].unbindData();
            }
        };

        return widgetManager;


    }]);
