var app = angular.module('app', []);

app.factory('MessageFactory', function ($http, $locale, $log) {
    var obj = {
        resp : {},
        selectIndexGroup : function(){
            return $http({
                method  :   'get',
                url     :   "http://127.0.0.1:9090/api/dispatch/index/selectIndexGroup",
                // params  :   params,
                cache   :   true
            }).then(function (data) {
                console.log(data);
                obj.resp.data = data;
                return obj.resp;
            })
        },
        selectIndexGroupSer : function () {
            return $http({
                method  :   'get',
                url     :   "http://127.0.0.1:9090/api/dispatch/index/selectIndexGroup",
                // params  :   params,
                cache   :   true
            })
        }
    }
    return obj;
});

app.filter('test',function (MessageFactory) {

    // MessageFactory.selectIndexGroupSer().then(function (data) {
    //     return function (input) {
    //         console.log(input);
    //         return "shanghai!"
    //     }
    // })
    var fn = function (input,data) {
        console.log(data);
        return "www.baidu.com";
    }
    MessageFactory.selectIndexGroupSer().then(fn)


    return fn;
})

app.controller('MainCtrl', ['$scope', '$http','MessageFactory',  function ($scope, $http,MessageFactory) {
    console.log("abcdefg");

    $scope.ttt = function () {
       console.log( MessageFactory.selectIndexGroup());
    }
    $scope.ttt2 = function () {
        console.log(MessageFactory.resp);
    }
    $scope.itemCount = '0';

}]);
