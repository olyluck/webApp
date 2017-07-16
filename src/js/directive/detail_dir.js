// 通过自定义指令的link来操作dom
angular.module('app').directive('details',function () {
    return{
        restrict:'EA',
        replace:'true',
        template:'<div class="home_detail"></div>',
        link:function ($scope,ele,attr) {
            //$scope.item.content
            ele.html($scope.item.content)
        }
    }
});