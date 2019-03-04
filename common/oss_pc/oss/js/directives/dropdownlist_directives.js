/*搜索下拉*/
angular.module('dropdownlist', []).directive('dropdownlist', function(){
    return {
        restrict : 'EA',
        scope : {
            id : "@",
            config : "=",
            dropModel:'='
        },
        template : '<div class="o-dropdownlist">\
                        <input type="text" class="form-control ng-valid ng-dirty ng-valid-parse ng-touched" ng-model="dropModel" placeholder="{{configDefault.placeholder}}" aria-describedby="basic-addon1" >\
                        <ul class="select-content">\
                            <li ng-repeat="info in configDefault.infoList" ng-if="info.indexOf(dropModel)!=-1&&focus" ng-click="setValue(info)">{{info}}</li>\
                        </ul>\
                    </div>',
        replace : true,
        link : function($scope, element, attrs, controller) {
            element.find("input").bind('focus', function(){
                $scope.$apply(function(){
                    $scope.focus = true;
                });
            });
            element.find("input").bind('blur', function(){
                $scope.$apply(function(){
                    $.extend(true,$scope.config,$scope.configDefault);
                });
            });
            element.bind('mouseleave', function(){
                $scope.$apply(function(){
                    $scope.focus = false;
                    $.extend(true,$scope.config,$scope.configDefault);
                });
            });
            $scope.setValue=function(info){
                $scope.dropModel= info;
            };

            //设置默认的配置，避免出现空异常
            $scope.configDefault={
                infoList:[],
                placeholder:'',
            }

            $scope.$watch('config',function(newValue,oldValue){
                $scope.configDefault.infoList = [];
                $.extend(true,$scope.configDefault,$scope.config);
                $.extend(true,$scope.model,$scope.configDefault.value);
            },true);

            $scope.$watch('dropModel',function(newValue,oldValue){
                if($scope.dropModel){
                    $scope.configDefault.value = $scope.dropModel;
                }
            },true);

        }
    }
})