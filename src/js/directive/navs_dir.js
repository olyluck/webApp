/*导航*/
angular.module('app').directive('navs',function () {
    return{
        restrict:'EA',
        replace:true,
        templateUrl:'../views/nav_tpl.html',
        controller:['$scope',function ($scope) {
            /*此处省去了监听，也不用设置 $scope.title，直接去父控制器获取*/
        }]
        // link:function ($scope,ele,attr) {
        //     // console.log(ele);
        //     // console.log(ele.find('span'));
        //     /*默认主页无返回键，详情页设置isBack为true*/
        //     if(attr.isBack == 'false'){
        //         ele.find('span').css({
        //             display:'none'
        //         })
        //     }
        // }
    }
});