/*angular配置白名单*/
angular.module('app').config(['$sceDelegateProvider',function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'http://localhost/api/**'
    ])
}]);

/*配置内容路由*/
angular.module('app').config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
    $stateProvider.state('index',{
        url:'/home',
        views:{
            home:{
                templateUrl:'../views/home_tpl.html',
                /*home页控制器*/
                controller:'HomeController'
            },
            author:{
                template:'<h1>author</h1>'
            },
            section:{
                template:'<h1>section</h1>'
            },
            my:{
                template:'<h1>my</h1>'
            }
        }
    }).state('index.detail',{
        url:'/detail/:id',
        template:'<details></details>',
        controller:'DetailController'
    }).state('index.list',{
        url:'/list',
        templateUrl:'../views/list_tpl.html'
    });
    $urlRouterProvider.otherwise('home/list')
}]);