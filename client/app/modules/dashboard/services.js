angular.module('dashboard')
    .provider('widgetService', function(){

        var widgetList = [];

        return {
            register: function(chanel, widget) {
                widget.data = 'test';
                widgetList.push(widget);
            },
            $get: function() {

                widgetInUse = [];

                return {
                    getWidgetList: function() {
                        return widgetList;
                    },
                    addWidget: function(index) {
                        widgetInUse.push(angular.copy(widgetList[index]))
                    },
                    widgetInUse: widgetInUse

                }
            }
        }
    });
