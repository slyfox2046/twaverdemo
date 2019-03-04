/*滚动条*/
angular.module('nicescroll', []).directive('nicescroll', function(){
    return {
        restrict : 'EA',
        scope : {
            init:"="
        },
        link : function(scope, element, attr, ngModel) {
            if(!scope.init){
                scope.defaultInt = true;
            }

            scope.$watch('init',function(newValue,oldValue){
                if(scope.init!=undefined){
                  scope.defaultInt = scope.init;
                }
            },true);

            scope.$watch('defaultInt',function(newValue,oldValue){
                if(scope.defaultInt){
                    function start(){
                      setTimeout(setNicescroll, 200);
                    }
                    start();
                    function setNicescroll(){
                      element.niceScroll({
                          cursorcolor : "#ccc",
                          cursorborder : "",
                          autohidemode : false,
                          cursorwidth : 8,
                          cursordragontouch : true,
                          zIndex: "9999999999999999999",
                      });
                    }
                }
            },true);

        }
    }
})