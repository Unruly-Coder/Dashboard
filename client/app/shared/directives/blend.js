angular.module('app').directive('blend', function() {
    return {
        restric: 'A',
        scope: {
            blend: '='
        },
        link: function(scope, elem, attrs) {
            elem.blend(scope.blend);
        }
    }
});