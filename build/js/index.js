var app = angular.module('app',['ui.router']);

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
/*多id路由配置--控制器*/
angular.module('app').controller('DetailController',['$scope','$stateParams',function ($scope,$stateParams) {
    var index = $stateParams.id;
    console.log(index);
    $scope.item = $scope.homeData.posts[index];
    console.log($scope.item);

}]);
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
angular.module('app').controller('TabbarController',['$scope',function ($scope) {
    $scope.tabChange = function (index) {
        // alert(index);
        /*将数据通过广播发送给父控制器*/
        $scope.$emit('tab_notification',{id:index});
    };
}]);
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
angular.module('app').service('xmgHttp',['$http',function ($http) {
    /*发送三种请求*/
    this.jsonp = function (url,params,success,error) {
        $http({
            url:url,
            method:'jsonp',
            params:params
        }).then(function (regs) {
            if(success) success(regs);
        }).catch(function (err) {
            if(error) error(err);
        })
    };
    this.getData = function () {

    };
    this.postData = function () {

    }
}]);
