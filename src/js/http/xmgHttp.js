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
