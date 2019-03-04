/*悬浮下拉*/
angular.module('multiSelect', []).directive('multiSelect', function(){
    return {
        scope : {
            id : "@",
            config : "=",
            hover:"=",
            isMultiselect:'='
        },
        restrict : 'EA',
        template : '<div class="o-multi-select" ng-class="{true:\'is-multiselect\',false:\'\'}[isMultiselect]" ng-mouseover="hideSelectContent = false">\
                <div class="select-input" ng-class="{\'true\':\'select-input-multi\'}[isMultiselect]">\
                    <div  ng-show="!configDefault.selItem[configDefault.name] && !(configDefault.selItem.length> 0)" class="pl15">{{configDefault.title}}</div>\
                    <div  ng-show="configDefault.selItem[configDefault.name]&&!$scope.isMultiselect" class="pl15">{{configDefault.selItem[configDefault.name]}}</div>\
                    <div  ng-show="configDefault.selItem.length> 0 && isMultiselect" class="pl15">\
                        <div ng-repeat="selItem in  configDefault.selItem track by $index" class="multi-Select-item">{{selItem[configDefault.name]}} <i class="icon-delete" title="删除" ng-click="deleteSel($index,selItem)">&times;</i></div>\
                    </div>\
                    <span class="arrow-box">\
                        <i class="arrow arrow-up"></i>\
                    </span>\
                </div>\
                <ul class="select-content" ng-hide="hideSelectContent&&!isMultiselect" >\
                    <li ng-repeat="info in configDefault.infoList" >\
                    <span title="{{info[configDefault.name]}}">{{info[configDefault.name]}} <i class="arrow arrow-right" ng-show="info[configDefault.child]"></i></span>\
                        <ul class="select-content second-select-content" ng-if="info[configDefault.child]">\
                            <li ng-repeat="secondMenu in info[configDefault.child]" ng-class="{true:\'active\',false:\'\'}[secondMenu.checked]">\
                            <span ng-click="firstClick(secondMenu,$event)" title="{{secondMenu[configDefault.name]}}">\
                                <i class="icon icon-check" ng-show="!isMultiselect"></i>\
                                <label class="o-checkbox" ng-show="isMultiselect" ng-click="firstClick(secondMenu,event)">\
                                    <input type="checkbox" name="c1" ng-model="secondMenu.checked">\
                                    <i class="icon-chkbox"></i>\
                                </label>\
                                {{secondMenu[configDefault.name]}}<i class="arrow arrow-right" ng-show="secondMenu[configDefault.child]"></i></span></span>\
                                <ul class="select-content third-select-content" ng-if="secondMenu[configDefault.child]">\
                                    <li ng-repeat="thirdMenu in  secondMenu[configDefault.child]"  ng-class="{true:\'active\',false:\'\'}[thirdMenu.checked]">\
                                        <span ng-click="firstClick(thirdMenu,$event)" title="{{thirdMenu[configDefault.name]}} ">\
                                        <i class="icon-check" ng-show="!isMultiselect"></i>\
                                        <label class="o-checkbox" ng-show="isMultiselect" ng-click="firstClick(thirdMenu,$event)">\
                                            <input type="checkbox" name="c1" ng-model="thirdMenu.checked">\
                                            <i class="icon-chkbox"></i>\
                                        </label>\{{thirdMenu[configDefault.name]}} </span>\
                                    </li>\
                                </ul>\
                            </li>\
                        </ul>\
                    </li>\
                </ul>\
            </div>',
        replace : true,
        link : function($scope, element, attrs, controller) {
            $scope.firstClick=function(info,$event){
                // if ($($event.currentTarget).is("input")){
                //     return;
                // }
                if($scope.isMultiselect){ //复选
                    if(!info.checked){
                        info.checked = true;
                        var item = {};
                        item[$scope.configDefault.id] = info[$scope.configDefault.id];
                        item[$scope.configDefault.name] = info[$scope.configDefault.name];


                        //添加过的不添加
                        var count =0;
                        for (var i=0;i< $scope.configDefault.selItem.length;i++) {
                            if( $scope.configDefault.selItem[i][$scope.configDefault.id] == info[$scope.configDefault.id]){
                                count = count + 1;
                            }
                        }
                        if(count==0){
                            if(info.checked){
                                $scope.configDefault.selItem.push(item);
                                $.extend(true,$scope.config,$scope.configDefault);
                            }
                        }


                    }else{
                        info.checked = false;
                        for (var index=0;index<$scope.configDefault.selItem.length;index++){
                            if ($scope.configDefault.selItem[index][$scope.configDefault.id] == info[$scope.configDefault.id]){
                                $scope.configDefault.selItem.splice(index,1);
                                $.extend(true,$scope.config,$scope.configDefault);
                                $scope.config.selItem = $scope.configDefault.selItem;
                            }
                        }
                    }
                }else { //单选
                    if(!info.checked){
                        $scope.setAllFalse($scope.configDefault.infoList);
                        info.checked = true;
                        $scope.configDefault.selItem = {};
                        $scope.configDefault.selItem[$scope.configDefault.id] = info[$scope.configDefault.id];
                        $scope.configDefault.selItem[$scope.configDefault.name] = info[$scope.configDefault.name];
                        $.extend(true,$scope.config,$scope.configDefault);
                    }else{
                        info.checked = false;
                        $.extend(true,$scope.config,$scope.configDefault);
                        $scope.configDefault.selItem = {};
                        $scope.config.selItem = $scope.configDefault.selItem;
                    }
                }
                $scope.configDefault.onClick(info);
                $scope.hideSelectContent=true;
            }

            $scope.deleteSel = function(index,selItem){
                selItem.checked = false;

                for ( var i =0; i < $scope.configDefault.infoList.length; i++){
                    if(selItem[$scope.configDefault.id] == $scope.configDefault.infoList[i][$scope.configDefault.id]){
                        $scope.configDefault.infoList[i].checked = selItem.checked;
                        break;
                    }

                    $scope.checkDownFun(selItem,$scope.configDefault.infoList[i]); //向下--递归改变选中节点的状态
                }

                $scope.configDefault.selItem.splice(index,1);
                $.extend(true,$scope.config,$scope.configDefault);
                $scope.config.selItem = $scope.configDefault.selItem;
            }

            //递归判断孩子节点
            $scope.checkDownFun = function(treeNode, treeList) {
                // 是否有孩子
                if (treeList[$scope.configDefault.child] != undefined
                    && treeList[$scope.configDefault.child].length > 0) {
                    for (var n = 0; n < treeList[$scope.configDefault.child].length; n++) {

                        if(treeList[$scope.configDefault.child][n][$scope.configDefault.id] == treeNode[$scope.configDefault.id]){
                            treeList[$scope.configDefault.child][n].checked = treeNode.checked;
                            break;
                        }

                        if (treeList[$scope.configDefault.child][n][$scope.configDefault.child] != undefined && treeList.checked!=false) {
                            $scope.checkDownFun(treeNode,treeList[$scope.configDefault.child][n]);// 递归判断
                        }
                    }
                }
            }


            //全部设为false
            $scope.setAllFalse = function(treeList) {
                for ( var i = 0; i < treeList.length; i++){
                    treeList[i].checked = false;
                    if(treeList[i][$scope.configDefault.child] != undefined && treeList[i][$scope.configDefault.child].length > 0){
                        $scope.setAllFalse(treeList[i][$scope.configDefault.child]);
                    }
                }
            }

            // element.on('click', '.select-content > li', function($event){
            //     $event.stopPropagation();
            //     if(!$scope.isMultiselect){
            //         $scope.$apply(function(){
            //             if($($event.currentTarget).hasClass('active')){ //通过ng-class改变了active，所以active相反
            //                 $($event.currentTarget).parents(".o-multi-select").find(".second-select-content > li").removeClass('active');
            //                 $($event.currentTarget).removeClass('active');
            //             }else{
            //                 $($event.currentTarget).parents(".o-multi-select").find(".second-select-content > li").removeClass('active');
            //                 $($event.currentTarget).parents(".second-select-content > li").addClass('active');

            //                 //判断自身能不能点击
            //                 var count = 0;
            //                 $($event.currentTarget).children().each(function(){
            //                     if($(this).hasClass('select-content')){
            //                         count = count + 1;
            //                     }
            //                 })
            //                 if ( count ==0){
            //                     $($event.currentTarget).addClass('active').siblings().removeClass('active');
            //                 }

            //                 //孩子节点有选中的，点击自身不改变状态
            //             }
            //         });
            //     }else{
            //         if($($event.currentTarget).hasClass('active')){ //通过ng-class改变了active，所以active相反
            //             $($event.currentTarget).parents(".second-select-content > li").addClass('active');
            //         }else{
            //             var count = 0;
            //             $($event.currentTarget).siblings().each(function(){
            //                 if($(this).hasClass('active')){
            //                     count = count + 1;
            //                 }
            //             })
            //             if ( count ==0){
            //                 $($event.currentTarget).parent().parent(".select-content > li").removeClass('active');
            //             }
            //         }
            //     }

            // });

            //设置默认的配置，避免出现空异常
            $scope.configDefault={
                title:'',
                infoList:[],
                id:'id',
                name:'name',
                selItem: {} ,
                onClick:function(info){

                },
            }


            $scope.$watch('config',function(newValue,oldValue){
                $scope.configDefault.infoList = [];
                $.extend(true,$scope.configDefault,$scope.config);
           },true);

        }
    }
})