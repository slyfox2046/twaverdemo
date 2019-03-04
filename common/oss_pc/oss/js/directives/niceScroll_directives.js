/*滚动条*/
angular.module('nicescroll', []).directive('nicescroll', function(){
    return {
        restrict : 'EA',
        link : function(scope, element, attr, ngModel) {
            element .niceScroll({
                cursorcolor : "rgba(8, 151, 207, 0.4)",
                cursorborder : "",
                autohidemode : false,
                cursorwidth : 8,
                cursordragontouch : true
            });
        }
    }
})