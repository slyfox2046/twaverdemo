/*标签集*/
angular.module('ossTags', []).directive('ossTags', function(){
    return {
        scope : {
            id : "@",
            tagData : "=",
            config:"=",
            selectTags:"="
        },
        restrict : 'EA',
        template : '<div class="o-list-tags" >\
                        <span class="o-tag o-tag-all" ng-click="setSelect(null)" ng-class="{true:\'active\',false:\'\'}[configDefault.checkAll]">{{configDefault.title}}</span>\
                        <span class="o-tag" ng-repeat="tag in tagData" ng-click="setSelect(tag)" ng-class="{true:\'active\',false:\'\'}[tag.checked]">{{tag[configDefault.name]}}</span>\
                    </div>',
        replace : true,
        link : function($scope, element, attrs, controller) {
            // $scope.firstClick=function(info){
            //     if(info){
            //     	$.extend(true,$scope.configDefault,$scope.config);
            //     	 $scope.configDefault.selItem = angular.copy(info);
            //     }else {
            //         $scope.configDefault.selItem[$scope.configDefault.name] = "全部";
            //     }
            //     $scope.configDefault.onClick(info);
            // }
            // element.bind('mouseover', function(){
            //     $scope.$apply(function(){
            //         $scope.hover = true;
            //     });
            // });
            // element.bind('mouseleave', function(){
            //     $scope.$apply(function(){
            //         $scope.hover = false;
            //     });
            // });
            // element.on('click', '.o-tag', function($event){
            //     $scope.$apply(function(){
            //         if($($event.currentTarget).hasClass('o-tag-all')){
            //             $($event.currentTarget).addClass('active').siblings().removeClass('active');
            //         }else{
            //             if($($event.currentTarget).hasClass('active')){
            //                 $($event.currentTarget).removeClass('active');
            //             }else{
            //                 $($event.currentTarget).addClass('active');
            //                 $($event.currentTarget).siblings('.o-tag-all').removeClass('active');
            //             }
            //         }

            //     });
            // });
            $scope.selectTags = angular.copy($scope.tagData);
            $scope.setSelect = function(tag){
                if(tag){
                    if(tag.checked){
                        tag.checked = false;
                        for ( var i= 0; i < $scope.selectTags.length;i++){
                            if($scope.selectTags[i][$scope.configDefault.id]==tag[$scope.configDefault.id]){
                                $scope.selectTags.splice(i, 1);
                                if($scope.selectTags.length<1){
                                    $scope.configDefault.checkAll=true;
                                    for ( var j=0;j< $scope.tagData.length;j++){
                                        $scope.tagData[j].checked=false;
                                    }
                                    $scope.selectTags = angular.copy($scope.tagData);
                                }
                                break;
                            }
                        }
                    }else {
                        tag.checked = true;
                        $scope.selectTags = [];
                        for ( var j=0;j< $scope.tagData.length;j++){
                            if($scope.tagData[j].checked){
                                $scope.selectTags.push($scope.tagData[j]);
                            }
                        }
                        if($scope.selectTags.length==$scope.tagData.length){
                            $scope.configDefault.checkAll=true;
                            for ( var j=0;j< $scope.selectTags.length;j++){
                                $scope.selectTags[j].checked=false;
                            }
                        }else{
                            $scope.configDefault.checkAll=false;
                        }
                    }
                }else{
                    $scope.configDefault.checkAll=true;
                    for ( var j=0;j< $scope.tagData.length;j++){
                        $scope.tagData[j].checked=false;
                    }
                    $scope.selectTags = angular.copy($scope.tagData);
                }
            }

            //设置默认的配置，避免出现空异常
            $scope.configDefault={
                checkAll: true,
                title:'全部', //全选的文字描述
                id:'id',    //主键的默认值
                name:'name', //标签的文字表述
            }


            $scope.$watch('config',function(newValue,oldValue){
                $.extend(true,$scope.configDefault,$scope.config);

            },true);
        }
    }
})