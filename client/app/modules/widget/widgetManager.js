angular.module('widget')
.factory('widgetManager', [function() {

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
            _widgetsInUse.splice(index, 1)[0].unbindDataSource();
        }
    };
}]);