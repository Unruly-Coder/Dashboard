angular.module('widget').directive('widget', [
    function () {
        return {
            restrict: 'E',
            require: '^widgetContainer',
            template: '<li class="card">' +
            '<div class="cardContainer" ng-class="{flip : widget.options.flip, active : widget.options.editTemplate}">' +
            '<a class="icon-close" ng-click="remove()"></a>' +
            '<a class="settings-tile icon-menu2" ng-click="widget.options.flip=!widget.options.flip"></a>' +
            '<a class="front-tile icon-undo2" ng-click="widget.options.flip=!widget.options.flip"></a>' +
            '<div class="front" style="background-color: {{widget.options.color}}">' +
            '<div class="card_spinner spinner" ng-if="widget.data == undefined"></div>' +
            '<div class="content" ng-include="widget.options.template" ng-if="widget.data !== undefined"></div>' +
            '</div>' +
            '<div class="back">' +
            '<div class="card_spinner spinner" ng-if="widget.data == undefined"></div>' +
            '<div class="content" ng-include="widget.options.editTemplate" ng-if="widget.data"></div>' +
            '</div>' +
            '</div>' +
            '</li>',
            replace: true,
            scope: {
                widget: '=options',
                removeTile: '&'
            },
            link: function (scope, elm, attrs, controller) {

                if(scope.widget.options.color !== undefined && color2color(scope.widget.options.color,'hsl').components.l > 50) {
                    elm.addClass('light');
                } else {
                    elm.addClass('dark');
                }

                scope.remove = function() {
                    controller.removeItem(elm);
                };

                elm.find(".front").css('background-color', scope.widget.options.color);
                elm.bind('destroyTile', function() {
                    scope.removeTile();
                });

                controller.addItem(elm, scope.widget);
            }
        };
    }
]);