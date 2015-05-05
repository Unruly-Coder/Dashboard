angular.module('widget')
    .provider('widgetService', function(){

        var widgetList = [];

        return {
            register: function(name, widgetSettings) {
                var widget = {
                    name: name,
                    options: widgetSettings
                };

                angular.extend(widget.options, {
                    col: 0,
                    row: 0,
                    flip: false,
                    template: 'widgets/' + widget.options.template,
                    editTemplate: widget.options.editTemplate ? 'widgets/' + widget.options.editTemplate : undefined
                });

                widgetList.push(widget);
            },
            $get: function(WidgetModel, InternalWidgetModel, ExternalWidgetModel) {

                function getWidgetList() {
                    return widgetList;
                }

                function createWidget(widgetData) {
                    var widget;

                    if(widgetData.options.dataBind) {
                        switch(widgetData.options.dataBind.type) {
                            case 'internal':
                                widget = new InternalWidgetModel(widgetData);
                                break;
                            case 'external':
                                widget = new ExternalWidgetModel(widgetData);
                                break;
                            default:
                                widget = new WidgetModel(widgetData);
                                break;
                        }
                    } else {
                        widget = new WidgetModel(widgetData);
                    }

                    return widget;
                }


                return {
                    getWidgetList: getWidgetList,
                    createWidget: createWidget
                };
            }
        };
    });