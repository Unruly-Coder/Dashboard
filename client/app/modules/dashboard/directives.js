angular.module('dashboard').directive('gridster', [
    function () {
        return {
            restrict: 'E',
            template: '<ul class="gridster" ng-transclude></ul>',
            transclude: true,
            replace: true,
            scope: {
                serializeChanged: '&'
            },
            controller: function ($scope) {
                var gr;
                return {
                    init: function (elem, options) {

                        gr = $(elem).gridster(angular.extend({
                            widget_selector: 'gridster-item',
                            widget_base_dimensions: [140, 140],
                            draggable: {
                                stop: function() {
                                    $scope.serializeChanged({ data: gr.serialize()});
                                }
                            }
                        }, options)).data('gridster');

                    },

                    addItem: function (elm, options)  {
                        gr.add_widget(elm, options.sizex, options.sizey, options.col, options.row);
                    },

                    removeItem: function (elm, index) {
                        gr.disable().remove_widget(elm, true);
                        setTimeout(gr.enable.bind(gr), 500);

                    }
                };
            },
            link: function (scope, elem, attrs, controller) {
                var options = scope.$eval(attrs.options);
                controller.init(elem, options);

            }
        };
    }
]);

angular.module('dashboard').directive('gridsterItem', [
    function () {
        return {
            restrict: 'E',
            require: '^gridster',
            template: '<li><a class="icon-close" ng-click="remove()"></a><div ng-include="options.template"></div></li>',
            replace: true,
            scope: {
                options: '=',
                removeTile: '&'
            },
            link: function (scope, elm, attrs, controller) {
                scope.remove = function() {
                    controller.removeItem(elm);
                };

                elm.css('background-color', scope.options.color);
                elm.bind('destroyTile', function() {
                    scope.removeTile();
                });

                controller.addItem(elm, scope.options);
            }
        };
    }
]);