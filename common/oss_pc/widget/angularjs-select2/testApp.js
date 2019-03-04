var app = angular.module('app', ['select2']);



/**
 * select2 内置查询功能
 */
app.factory('select2Query', function ($timeout) {
    return {
        testAJAX: function () {
            var config = {
                minimumInputLength: 1,
                ajax: {
                    url: "http://api.rottentomatoes.com/api/public/v1.0/movies.json",
                    dataType: 'jsonp',
                    data: function (term) {
                        return {
                            q: term,
                            page_limit: 10,
                            apikey: "ju6z9mjyajq2djue3gbvv26t"
                        };
                    },
                    results: function (data, page) {
                        return {results: data.movies};
                    }
                },
                formatResult: function (data) {
                    return data.title;
                },
                formatSelection: function (data) {
                    return data.title;
                }
            };

            return config;
        }
    }
});

app.controller('appCtrl', function ($scope, $timeout) {
    $scope.config1 = {
        data: [],
        placeholder: '尚无数据'
    };

    $timeout(function () {
        $scope.config1.data = [{id:1,text:'bug'},{id:2,text:'duplicate'},{id:3,text:'invalid'},{id:4,text:'wontfix'}]
        $scope.config1.placeholder = '加载完毕'
    }, 1000);


    $scope.config2 = [
        {id: 6, text: '来自ng-options1'},
        {id: 7, text: '来自ng-options2'},
        {id: 8, text: '来自ng-options3'}
    ];

    $scope.config3 = {
        data: [{id:1,text:'bug'},{id:2,text:'duplicate'},{id:3,text:'invalid'},{id:4,text:'wontfix'}]
        // 其他配置略，可以去看看内置配置中的ajax配置
    };

});

angular.bootstrap(document, ['app']);
