/*Home控制器*/
angular.module('app').controller('HomeController',['$scope','xmgHttp',function ($scope,xmgHttp) {
    /*发送请求*/
    /*$http({
        /!*本地服务器(php文件地址，不是热更新的地址)*!/
        url:'http://localhost/api/home.php',
        /!*本地服务器利用jsonp 来echo数据*!/
        method:'jsonp'
    }).then(function (regs) {
        // console.log(regs.data);
        $scope.homeData = regs.data;
    }).catch(function (err) {
        console.log(err);
    });*/
    var url = 'http://localhost/api/home.php';
    xmgHttp.jsonp(url,null,function (regs) {
        $scope.homeData = regs.data;
    },function (err) {
        console.log(err);
    })
}]);