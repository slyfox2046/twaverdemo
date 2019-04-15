angular.module('stockMarketApp',[])
.controller('MainCtrl',[function(){
    var self =this;
    self.stocks=[
        {name:"腾讯",price:100,previous:220},
        {name:"阿里",price:140,previous:210},
        {name:"京东",price:110,previous:200},
        {name:"天猫",price:100,previous:120},
    ]
}]);
