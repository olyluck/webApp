var app = angular.module('app',[]);
app.controller('AppController',['$scope',function ($scope) {
    $scope.appTitle = '今日一刻';
}]);
/*导航*/
app.directive('navs',function () {
    return{
        restrict:'EA',
        templateUrl:'../views/nav_tpl.html'
    }
});

/*底部*/
app.directive('tabbar',function () {
    return{
        restrict:'EA',
        templateUrl:'../views/tabbar_tpl.html'
    }
});