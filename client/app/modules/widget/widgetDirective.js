angular.module('widget').directive('widget', [
    function () {
        return {
            restrict: 'E',
            require: '^widgetContainer',
            template: '<li class="card">' +
            '<div class="cardContainer" ng-class="{flip : options.flip, active : options.editTemplate}">' +
            '<a class="icon-close" ng-click="remove()"></a>' +
            '<a class="settings-tile icon-menu2" ng-click="options.flip=!options.flip"></a>' +
            '<a class="front-tile icon-undo2" ng-click="options.flip=!options.flip"></a>' +
            '<div class="front" style="background-color: {{options.color}}">' +
            '<div class="card_spinner spinner" ng-if="options.data == undefined"></div>' +
            '<div class="content" ng-include="options.template" ng-if="options.data !== undefined"></div>' +
            '</div>' +
            '<div class="back">' +
            '<div class="card_spinner spinner" ng-if="options.data == undefined"></div>' +
            '<div class="content" ng-include="options.editTemplate" ng-if="options.data"></div>' +
            '</div>' +
            '</div>' +
            '</li>',
            replace: true,
            scope: {
                options: '=',
                removeTile: '&'
            },
            link: function (scope, elm, attrs, controller) {

                if(scope.options.color !== undefined && color2color(scope.options.color,'hsl').components.l > 50) {
                    elm.addClass('light');
                } else {
                    elm.addClass('dark');
                }

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