/*悬浮下拉*/
angular.module('repeatEndDo', []).directive('repeatEndDo', function(){
	return {
		link : function(scope, element, attr) {
			if (scope.$last == true) {
				scope.$eval(attr.repeatEndDo)
			}
		}
	}
})