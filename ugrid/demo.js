var app = angular.module('app', ['ngTouch', 'ui.grid', 'ui.grid.selection', 'ui.grid.cellNav', 'ngAria']);

app.controller('MainCtrl', ['$scope', '$http', '$log', '$timeout', 'uiGridConstants', function ($scope, $http, $log, $timeout, uiGridConstants) {
    $scope.gridOptions = {
        //-------- 基础属性----------------
        enableSorting : true, //是否排序（列）
        fastWatch: true,
        useExternalSorting : false, //是否使用自定义排序规则
        //enableGridMenu : true, //是否显示grid 菜单
        showGridFooter : false, //是否显示grid footer
        enableHorizontalScrollbar : 1, //grid水平滚动条是否显示, 0-不显示  1-显示
        enableVerticalScrollbar : 0, //grid垂直滚动条是否显示, 0-不显示  1-显示
        enableFiltering :false,//是否支持过滤

        //--------  选中--------------
        enableRowHeaderSelection : false, //是否显示选中checkbox框 ,默认为true
        enableSelectAll : false, // 选择所有checkbox是否可用，默认为true;
        enableRowSelection : false, // 行选择是否可用，默认为true;



    };

    $scope.gridOptions.columnDefs = [
        //width 宽度，可以百分比
        //allowCellFocus 是否允许焦点

        {name: 'id', width: "5%"},
        {name: 'name', width: "20%"},
        {name: 'age', width: "20%", displayName: 'Age (not focusable)', allowCellFocus: false},

        {name: 'operate', width: "20%",cellTemplate:'<button class="btn primary" ng-click="grid.appScope.showMe()">Click Me</button>' },
        {name: 'address.city', width: "20%",allowCellFocus: false,cellTemplate:'<div' +
                ' style="height:25px;background-color:' +
                ' red;color:yellow;text-align: center">hell</div>' }
    ];

    $scope.gridOptions.multiSelect = true;

    $http.get(' http://ui-grid.info/data/500_complex.json')
        .then(function (response) {
            $scope.gridOptions.data = response.data;
            $timeout(function () {
                if ($scope.gridApi.selection.selectRow) {
                    $scope.gridApi.selection.selectRow($scope.gridOptions.data[0]);
                }
            });
        });

    $scope.info = {};

    $scope.toggleMultiSelect = function () {
        $scope.gridApi.selection.setMultiSelect(!$scope.gridApi.grid.options.multiSelect);
    };

    $scope.toggleModifierKeysToMultiSelect = function () {
        $scope.gridApi.selection.setModifierKeysToMultiSelect(!$scope.gridApi.grid.options.modifierKeysToMultiSelect);
    };

    $scope.selectAll = function () {
        $scope.gridApi.selection.selectAllRows();
    };

    $scope.clearAll = function () {
        $scope.gridApi.selection.clearSelectedRows();
    };

    $scope.toggleRow1 = function () {
        $scope.gridApi.selection.toggleRowSelection($scope.gridOptions.data[0]);
    };

    $scope.toggleFullRowSelection = function () {
        $scope.gridOptions.enableFullRowSelection = !$scope.gridOptions.enableFullRowSelection;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
    };

    $scope.setSelectable = function () {
        $scope.gridApi.selection.clearSelectedRows();

        $scope.gridOptions.isRowSelectable = function (row) {
            if (row.entity.age > 30) {
                return false;
            } else {
                return true;
            }
        };
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);

        $scope.gridOptions.data[0].age = 31;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.EDIT);
    };

    $scope.gridOptions.onRegisterApi = function (gridApi) {
        //set gridApi on scope
        $scope.gridApi = gridApi;
        gridApi.selection.on.rowSelectionChanged($scope, function (row) {
            var msg = 'row selected ' + row.isSelected;
            $log.log(msg);
        });

        gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
            var msg = 'rows changed ' + rows.length;
            $log.log(msg);
        });
    };
}]);

app.controller('SecondCtrl', ['$scope', '$http', '$interval', 'uiGridConstants', function ($scope, $http, $interval, uiGridConstants) {
    $scope.gridOptions = {enableRowSelection: true, enableRowHeaderSelection: false};

    $scope.gridOptions.columnDefs = [
        {name: 'id'},
        {name: 'name'},
        {name: 'age', displayName: 'Age (not focusable)', allowCellFocus: false},
        // {name: 'address.city',cellTemplate:'<div style="background-color: #ff5215;">aaaa</div>'}
        {name: 'address.city',cellTemplate:'<button class="btn primary" ng-click="grid.appScope.showMe()">Click' +
                ' Me</button>' }
    ];

    $scope.gridOptions.multiSelect = false;
    $scope.gridOptions.modifierKeysToMultiSelect = false;
    $scope.gridOptions.noUnselect = true;
    $scope.gridOptions.onRegisterApi = function (gridApi) {
        $scope.gridApi = gridApi;
    };

    $scope.toggleRowSelection = function () {
        $scope.gridApi.selection.clearSelectedRows();
        $scope.gridOptions.enableRowSelection = !$scope.gridOptions.enableRowSelection;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
    };

    $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/500_complex.json')
        .then(function (response) {
            $scope.gridOptions.data = response.data;

            // $interval whilst we wait for the grid to digest the data we just gave it
            $interval(function () {
                $scope.gridApi.selection.selectRow($scope.gridOptions.data[0]);
            }, 0, 1);
        });
}]);
