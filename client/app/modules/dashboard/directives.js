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
            template: '<li class="card"><div class="cardContainer" ng-class="{flip : options.flip, active : options.editTemplate}"><a class="icon-close" ng-click="remove()"></a><a class="settings-tile icon-menu2" ng-click="options.flip=!options.flip"></a><a class="front-tile icon-undo2" ng-click="options.flip=!options.flip"></a><div class="front" style="background-color: {{options.color}}" ng-include="options.template" ></div><div class="back" ng-include="options.editTemplate"></div></div></li>',
            replace: true,
            scope: {
                options: '=',
                removeTile: '&'
            },
            link: function (scope, elm, attrs, controller) {
                scope.remove = function() {
                    controller.removeItem(elm);
                };

                elm.find(".front").css('background-color', scope.options.color);
                elm.bind('destroyTile', function() {
                    scope.removeTile();
                });

                controller.addItem(elm, scope.options);
            }
        };
    }
]);