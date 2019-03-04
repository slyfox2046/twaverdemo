/*悬浮下拉*/
angular.module('navSelect', []).directive('navSelect', function(){
    return {
        scope : {
            id : "@",
            config : "=",
            hover:"="
        },
        restrict : 'EA',
        template : '<div class="o-nav-select">\
                <span  ng-show="hover">{{configDefault.title}}</span>\
                <span  ng-hide="hover">{{configDefault.selItem[configDefault.name]}}</span>\
                <ul class="select-content">\
                    <li ng-click="firstClick(info)" ng-show="configDefault.showAll" ng-class="{\'true\':\'active\'}[!configDefault.selItem[configDefault.id]]">\
                        <span>全部</span>\
                    </li>\
                    <li ng-repeat="info in configDefault.infoList" ng-click="firstClick(info)" ng-class="{\'true\':\'active\'}[configDefault.selItem[configDefault.id] == info[configDefault.id]]">\
                        <span>{{info[configDefault.name]}} </span>\
                    </li>\
                </ul>\
                <span class="arrow-box">\
                    <i class="arrow arrow-up"></i>\
                </span>\
            </div>',
        replace : true,
        link : function($scope, element, attrs, controller) {
            $scope.firstClick=function(info){
                if(info){
                	// $.extend(true,$scope.configDefault,$scope.config);
                	 $scope.configDefault.selItem = angular.copy(info);
                }else {
                    $scope.configDefault.selItem[$scope.configDefault.name] = "全部";
                    $scope.configDefault.selItem[$scope.configDefault.id] = '';
                }
                $scope.config.selItem = $scope.configDefault.selItem;
                $scope.configDefault.onClick(info);
            }
            element.bind('mouseover', function(){
                $scope.$apply(function(){
                    $scope.hover = true;
                });
            });
            element.bind('mouseleave', function(){
                $scope.$apply(function(){
                    $scope.hover = false;
                });
            });
            element.on('click', '.select-content > li', function($event){
                $scope.$apply(function(){
                    $($event.currentTarget).addClass('active').siblings().removeClass('active');
                });
            });

            //设置默认的配置，避免出现空异常
            $scope.configDefault={
                title:'',
                infoList:[],
                id:'id',
                name:'name',
                showAll: true,
                selItem: {} ,
                onClick:function(info){

                },
            }


            $scope.$watch('config',function(newValue,oldValue){
                $scope.configDefault.infoList = [];
                $.extend(true,$scope.configDefault,$scope.config);
                if($scope.config.selItem){
                    $scope.configDefault.selItem = $scope.config.selItem;
                }

                if($scope.configDefault.selItem&&!$scope.configDefault.selItem[$scope.configDefault.id]){
                    if(!$scope.configDefault.showAll){
                        $scope.configDefault.selItem = $scope.configDefault.infoList[0];
                    }else {
                        $scope.configDefault.selItem[$scope.configDefault.name] = '全部';
                        $scope.configDefault.selItem[$scope.configDefault.id] = '';

                    }
                }

                if(!$scope.configDefault.selItem){
                    $scope.configDefault.selItem[$scope.configDefault.name] = '全部';
                    $scope.configDefault.selItem[$scope.configDefault.id] = '';
                }
           },true);

        }
    }
})