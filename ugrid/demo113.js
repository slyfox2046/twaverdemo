var app = angular.module('app', ['ngAnimate', 'ngTouch', 'ui.grid']);

app.controller('MainCtrl', function MainCtrl($scope, $http, uiGridConstants) {
    var vm = this;

    vm.columns = [{ field: 'name' }, { field: 'gender' }];
    vm.gridOptions = {
        enableSorting: true,
        columnDefs: vm.columns,
        onRegisterApi: function(gridApi) {
            vm.gridApi = gridApi;
        }
    };

    vm.remove = function() {
        vm.columns.splice($scope.columns.length-1, 1);
    };

    vm.add = function() {
        vm.columns.push({ field: 'company', enableSorting: false,displayName:"Time:"+new Date() });
    };

    vm.splice = function() {
        vm.columns.splice(1, 0, { field: 'company', enableSorting: false });
    };

    vm.unsplice = function() {
        vm.columns.splice(1, 1);
    };

    vm.toggleDisplayName = function() {
        if( vm.columns[1].displayName === 'GENDER' ){
            vm.columns[1].displayName = 'Gender';
        } else {
            vm.columns[1].displayName = 'GENDER';
        }
        vm.gridApi.core.notifyDataChange( uiGridConstants.dataChange.COLUMN );
    };

    vm.toggleVisible = function() {
        var firstColumn = vm.gridApi.grid.columns[0];

        if (firstColumn.visible) {
            firstColumn.hideColumn();
        } else {
            firstColumn.showColumn();
        }
        vm.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
    };

    // $http.get('/data/100.json')
    $http.get('http://ui-grid.info/data/100.json')
        .then(function(response) {
            vm.gridOptions.data = response.data;
        });

    $scope.$on('$destroy', function() {
        vm.gridApi = null;
    });
});
