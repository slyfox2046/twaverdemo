/*多级下拉*/
angular.module('dropSelect', []).directive('dropSelect', function(){
    return {
        scope : {
            id : "@",
            config : "=",
            hover:"=",
            selectModel:"=",
            isMultiselect:'='
        },
        restrict : 'EA',
        template : '<div class="o-drop-select">\
                        <ul class="list-select-tags">\
                            <li ng-repeat="select in selectModel">\
                                <span class="select-tag">{{select[config.name]}}</span>\
                            </li><li ng-show="selectModel.length>5">\
                                <span class="more mr10" >...</span>\
                            </li><li>\
                                <div class="box-all-arrow">\
                                    <i class="arrow"></i>\
                                </div>\
                                <ul class="select-list">\
                                    <li ng-repeat="info in config.infoList track by $index">\
                                        <div class="first-menu">\
                                            <span class="box-arrow"><i class="arrow"></i></span>\
                                            <span title="{{info[config.name]}}">{{info[config.name]}}</span>\
                                        </div>\
                                        <ul class="second-menu">\
                                            <li ng-repeat="secondMenu in info[config.secondMenu] track by $index" ng-class="{\'true\':\'active\'}[config.secondMenu.active]">\
                                                <span class="title" title="{{secondMenu[config.name]}}">{{secondMenu[config.name]}}</span>\
                                                <span class="icon icon-delete fright" title="删除" ng-click="delete(secondMenu)">-</span>\
                                                <span class="icon icon-add fright mr5" title="添加" ng-click="add(secondMenu)">+</span>\
                                            </li>\
                                        </ul>\
                                    </li>\
                                </ul>\
                            </li>\
                        </ul>\
                    </div>',
        replace : true,
        link : function($scope, element, attrs, controller) {
            // 点击"+"选中
            element.on('click', '.second-menu > li .icon-add', function($event){
                $scope.$apply(function(){
                	if(!$scope.isMultiselect){
                		// false 单选
                		  $($event.currentTarget).parent().siblings().removeClass('active');
                		  $($event.currentTarget).parent().parent().parent().siblings().children('ul').children('li').removeClass("active");
                	}
                	 $($event.currentTarget).parent().addClass('active');

                });
            });

            // 点击"-"取消选中
            element.on('click', '.second-menu > li .icon-delete', function($event){
                $scope.$apply(function(){
                    $($event.currentTarget).parent().removeClass('active');
                });
            });

            // 点击添加
            $scope.add = function(selInfo){
            	if(!$scope.isMultiselect){
            		// false 单选
            		$scope.selectModel=[];
            	}
                $scope.selectModel.push(selInfo);
                selInfo.active = true;
            }

            // 点击删除
            $scope.delete = function(delInfo){
                delInfo.active = false;
                for ( var i = 0;i<$scope.selectModel.length;i++){
                   if(delInfo[$scope.config.id] == $scope.selectModel[i][$scope.config.id]){
                        $scope.selectModel.splice(i,1);
                   }
                }
            }

            // 点击二级菜单展开
            element.on('click', '.first-menu > .box-arrow', function($event){
                $scope.$apply(function(){
                    if($($event.currentTarget).find(".arrow").hasClass('arrow-up')){
                        $($event.currentTarget).find(".arrow").removeClass('arrow-up');
                        $($event.currentTarget).parent().next().hide();
                    }else{
                        $($event.currentTarget).find(".arrow").addClass('arrow-up');
                        $($event.currentTarget).parent().next().show();
                    }
                });
            });

            // 点击展开菜单
            element.on('click', '.box-all-arrow', function($event){
                $scope.$apply(function(){
                    if($($event.currentTarget).find(".arrow").hasClass('arrow-up')){
                        $($event.currentTarget).find(".arrow").removeClass('arrow-up');
                        $($event.currentTarget).parent().find(".select-list").hide();
                    }else{
                        $($event.currentTarget).find(".arrow").addClass('arrow-up');
                        $($event.currentTarget).parent().find(".select-list").show();
                    }
                });
            });

            // 设置默认的配置，避免出现空异常
            $scope.configDefault={
                infoList:[],
                id:'id',
                name:'name',
                selItem: {} ,
                onClick:function(info){

                },
            }

            $scope.$watch('selectModel',function(newValue,oldValue){
                if($scope.selectModel){
                    for (var j=0;j< $scope.config.infoList.length;j++){
                        for ( var z=0; z< $scope.config.infoList[j][$scope.config.secondMenu].length;z++){
                            var secondMenu = $scope.config.infoList[j][$scope.config.secondMenu][z];
                            for ( var i=0;i< $scope.selectModel.length;i++){
                                if( secondMenu[$scope.config.id]== $scope.selectModel[i][$scope.config.id]){
                                    secondMenu.active=true;
                                }
                            }
                        }
                    }
                    if($scope.selectModel.length<=0){
                    	  $('.select-list  > li .second-menu li').siblings().removeClass('active');
                    }

                }else{
                    $scope.selectModel = [];
                }
           },true);

            $scope.$watch('config',function(newValue,oldValue){
                $scope.configDefault.infoList = [];
                $.extend(true,$scope.configDefault,$scope.config);
                // if(!$scope.configDefault.selItem[$scope.configDefault.id]){
                // if(!$scope.configDefault.showAll){
                // $scope.configDefault.selItem =
				// $scope.configDefault.infoList[0];
                // }else {
                // $scope.configDefault.selItem[$scope.configDefault.name] =
				// '全部';
                // $scope.configDefault.selItem[$scope.configDefault.id] = '';
                // }
                // }
           },true);

        }
    }
})