angular.module('app').controller('TabbarController',['$scope',function ($scope) {
    $scope.tabChange = function (index) {
        // alert(index);
        /*将数据通过广播发送给父控制器*/
        $scope.$emit('tab_notification',{id:index});
    };
}]);