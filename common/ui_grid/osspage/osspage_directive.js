angular
	.module("ossPage", [])
	.directive(
		'ossPage',
		function($log) {
			return {
				restrict: 'EA',
				replace: false,
				scope: {
					config: '='
				},
				link: function($scope, element, attrs) {
					// 生成分页
					var generatePaging = function(pageConfig) {
						// 如果总页数大于1
						if(pageConfig && pageConfig.records > 0) {
							laypage({
								cont: element,
								refresh: pageConfig.refresh ? pageConfig.refresh : false, //是否第一次新建
								curr: pageConfig.page && !pageConfig.refresh ? pageConfig.page : 1, // 当前页
								records: pageConfig.records ? pageConfig.records : 0, // 当前页
								ckarr: pageConfig.ckarr != null && pageConfig.ckarr != undefined ? pageConfig.ckarr : true,
								pagarr: pageConfig.pagarr ? pageConfig.pagarr : [10, 20, 30, 50], //每页显示条数
								pagesize: pageConfig.pagesize ? pageConfig.pagesize : 10, //默认显示
								groups: pageConfig.groups ? pageConfig.groups : 5, // 连续显示分页数,建议奇数
								skip: pageConfig.skip != null && pageConfig.skip != undefined ? pageConfig.skip : true, // 是否开启跳页
								skin: pageConfig.skin ? pageConfig.skin : 'molv', // 皮肤，可以是颜色值
								first: pageConfig.first != null && pageConfig.first != undefined ? pageConfig.first : null, // 将首页显示为1。若不显示，设置false即可
								last: pageConfig.last != null && pageConfig.last != undefined ? pageConfig.last : null, // 将尾页显示为总页数。若不显示，设置false即可
								prev: pageConfig.prev ? pageConfig.prev : '上一页', // 若不显示，设置false即可
								next: pageConfig.next ? pageConfig.next : '下一页', // 若不显示，设置false即可
								hash: pageConfig.hash ? pageConfig.hash : false, // 自定义hash值,看看URL的变化
								jump: function(e, first) { // 触发分页后的回调
									if(!first) { // 一定要加此判断，否则初始时会无限刷新
										pageConfig.page = e.curr; //当前页
										pageConfig.pagesize = e.pagesize;
										pageConfig.refresh = false;
										$scope.$apply();
									}
								}
							});
						} else {
							element.html("");
						}

					};
					generatePaging($scope.config);
					// 监控page（当前页码）
					$scope.$watch('config.page', function(
						newValue, oldValue) {
						if(newValue && !(newValue === oldValue)) {
							$scope.config.refreshData();
							// $scope.config.ifWatch = true; //监听了不再监听pagesize;
						}
					});
					// 监控pageSize（每页数量）
					$scope.$watch('config.pagesize', function(newValue,
						oldValue) {
						if($scope.config.ifWatch) {
							$scope.config.ifWatch = false;
						} else {
							if(newValue && !(newValue === oldValue)) {
								$scope.config.refreshData();

							}
						}

					});
					// 监控records（总记录数）
					$scope.$watch('config.records', function(
						newValue, oldValue) {
						if(!(newValue === oldValue)) {
							// 重新生成分页
							generatePaging($scope.config);
						}
					});
					// 监控是否初始化
					$scope.$watch('config.refresh', function(newValue, oldValue) {
						if(newValue) {
							// 重新生成分页
							generatePaging($scope.config);
						}
					});

				}
			};
		});