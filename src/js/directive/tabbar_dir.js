/*底部*/
angular.module('app').directive('tabbar',function () {
    return{
        restrict:'EA',
        replace:true,
        templateUrl:'../views/tabbar_tpl.html',
        controller:'TabbarController',
        link:function ($scope,ele,attr) {
            // console.log(ele);
            /*id在父控制器中已绑定*/
            /*实时监听点击的tab*/
            $scope.$watch('id',function (newV,oldV) {
                // console.log(newV);
                /*获取li*/
                var lis = ele.children()[0].children;
                // console.log(lis);
                for (var i = 0; i < lis.length; i++) {
                    lis[i].className = '';
                }
                lis[$scope.id].className = 'active';
            })
        }
    }
});