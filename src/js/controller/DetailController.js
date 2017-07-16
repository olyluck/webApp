/*多id路由配置--控制器*/
angular.module('app').controller('DetailController',['$scope','$stateParams',function ($scope,$stateParams) {
    var index = $stateParams.id;
    console.log(index);
    $scope.item = $scope.homeData.posts[index];
    console.log($scope.item);

}]);