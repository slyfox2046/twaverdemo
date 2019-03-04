angular.module('clamp', [])
		.directive(
				'clamp',
				function() {
					return {
						restrict : 'EA',
						scope : {
							ngModel : '=',
							clampLine:'=' //显示的行数
						},
						link : function(scope, element, attr, ngModel) {
							var module = document.getElementById(attr.id);
                			$clamp(module, {clamp: scope.clampLine});
						}
					}
				});