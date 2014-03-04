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
                }
            }
        }
    })
    .factory('widgetManager', ['$http', 'socket', function($http, socket) {

        var _widgetsInUse = [];

        function _load(widget){
            var promise = $http.get('/api/' + widget.channel)
                .then(function(response){
                   widget.data = response.data;

                   socket.on(widget.channel, function(data) {
                       widget.data = data;
                   })
                }, function(response) {
                    console.log('smth-wrong');
                });
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
                var widget = angular.copy(widget);

                _load(widget)
                .then(function(){
                        _widgetsInUse.push(widget)
                    });
            },

            removeWidget: function(index) {
                _widgetsInUse.splice(index, 1);
            }
        };

        return widgetManager;


    }]);
