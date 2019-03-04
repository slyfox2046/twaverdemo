//<input type="text" lay-date class="laydate-icon" id="startDate" istime="true" format="YYYY-MM-DD hh" ng-model="startDate">
angular.module('layDate', [])
		.directive(
				'layDate',
				function() {
					return {
						require : '?ngModel',
						restrict : 'A',
						scope : {
							ngModel : '=',
							  maxDate:'@',
							  minDate:'@',
						},
						link : function(scope, element, attr, ngModel) {
							// Specify how UI should be updated
							ngModel.$render = function() {
								element.val(ngModel.$viewValue || '');
							};
							// Listen for change events to enable binding

							element.on('blur keyup change propertychange',
									function() {
										scope.$apply(read);
									});
							read(); // initialize
							// Write data to the model

							function read() {
								var val = element.val();
								if (val && '' != val) {
									ngModel.$setViewValue(val);
								}
							}

							function readClear() {
								var val = element.val();
								ngModel.$setViewValue(val);
							}

							if (attr.skin)
								laydate.skin(attr.skin);

							function start(){
								setTimeout(setDate, 500);
							}
							start();

							if(attr.range){
								if(attr.range=="true"){
									attr.range = true;
								}
								if(attr.range=="false"){
									attr.range = false;
								}
							}

							function setDate(){
								attr.istoday =(attr.istoday=="false"?false:true);
								attr.isclear =(attr.isclear=="true"?true:false);
								laydate.render({
									elem : '#' + attr.id,
			                        type: attr.layType? attr.layType:'date',
			                        range: attr.range? attr.range:false,
			                        calendar: attr.calendar? attr.calendar:false,
									done: function(value, date){
									    if(value==""){
											scope.$apply(readClear);
										}
										if (value && '' != value) {
											ngModel.$setViewValue(value);
										}
										scope.$apply();
									}
								});
							}


						}

					}
				});