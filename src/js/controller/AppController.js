angular.module('app').controller('AppController',['$scope','$window','$location',function ($scope,$window,$location) {
    $scope.appTitle = '今日一刻';
    /*设置navs的默认显示*/
    $scope.title = '首页';

    /*设置tabbar默认选中的索引*/
    $scope.id = 0;
    $scope.$on('tab_notification',function (e,regs) {
        // console.log(regs.id);
        /*将数据给navs*/
        /*由于navs自动获取父控制器的内容，因此不用发广播*/
        /*定义navs数组*/
        var navArray = ['首页','作者','栏目','我的'];
        $scope.title = navArray[regs.id];
        /*tabbar当前索引*/
        $scope.id = regs.id;
    });
    $scope.back = function () {
        $window.history.back();
    };
    /*监听url，控制返回按钮和tabbar显示*/
    $scope.location = $location;
    $scope.$watch('location.url()',function (newV,oldV) {
        console.log(newV);
        var href = newV.toString().indexOf('detail');
        /*首页*/
        if(href == -1){
            $scope.hidde = false;
        }else {
            $scope.hidde = true;
        }
        /*详情页*/
    })
}]);
/*直接抽取代码，不用考虑链接js*/