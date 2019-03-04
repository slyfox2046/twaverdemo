angular.module("dropDownButton",[]).directive("dropDownButton",function(){
	return{
		scope:{
			config:"="
		},
		restrict:"EA",
		template:'<div style="display: flex;">\
			        <div ng-mouseover="display=true" ng-mouseleave="display=false" class="selectTitle">\
			            <div class="db_blockBtn">\
			                <div class="db_btn">{{config.btnName}}</div>\
			                <div class="db_arrow"><div ng-show="!display" class="db_dowm"></div> <div ng-show="display" class="db_up"></div></div>\
			            </div>\
			            <div  class="db_content" ng-hide="!display">\
			                <div class="db_selectSpan" ng-click="config.clickItem(item)" ng-show="item.isShow" ng-repeat="item in config.selectOption">{{item.text}}</div>\
			            </div>\
			        </div>\
			    </div>',
		replace:true
	}
})