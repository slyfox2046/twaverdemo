/**
 * name: tm.pagination Version: 0.0.2
 */
angular.module('zTree', []).directive('zTree', [ function() {
	return {
		scope : {
			id : "@",
			treeData : '=',
			treeSetting : '=',
			expandFlag :'='
		},
		restrict : 'EA',
		template : "<ul class='ztree' ></ul>",
		replace : true,
		link : function($scope, element, attrs, ngModel) {
			$.fn.zTree.init(element, $scope.treeSetting, $scope.treeData);
			//是否全部张开
			if($scope.expandFlag){
				var treeObj = $.fn.zTree.getZTreeObj($scope.id);
				treeObj.expandAll($scope.expandFlag);
			}
			$scope.$watch("treeData", function() {
				$.fn.zTree.destroy($scope.id);
				$.fn.zTree.init(element, $scope.treeSetting, $scope.treeData);
				//是否全部张开
				if($scope.expandFlag){
					var treeObj = $.fn.zTree.getZTreeObj($scope.id);
					treeObj.expandAll($scope.expandFlag);
				}
			});

		}
	};
} ]);