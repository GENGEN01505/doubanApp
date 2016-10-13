(function(){
    var listModule=angular.module('doubanApp.listModule',['doubanApp.service']);
    listModule.config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/list/:category/:page?',{
            templateUrl:'list/list.html',
            controller:'ListController'
        })
    }]);
    listModule.controller('ListController',['$scope','$http','JsonpService',
        '$routeParams','$route','$rootScope','$location','appConfig',function($scope,$http,JsonpService,$routeParams,$route,$rootScope,$location,appConfig){
        //给当前作用域设置当前的分类信息 控制左侧三个分类按钮的选中
            $rootScope.category=$routeParams.category;
            //$rootScope.search= function () {
            ////    如果路由表中没有配置 q参数 则会自动加到 ?后
            //
            //    $route.updateParams({category:'search',q:$rootScope.input});
            ////      $rootScope.search= function () {
            //    //    如果路由表中没有配置 q参数 则会自动加到 ?后
            //    //$route.updateParams({subject:'search',movieId:'',q:$rootScope.input})
            //};


        //得到当前的页码
        var count=appConfig.pageCount;
        var currentPage=parseInt($routeParams.page || 1);
        $scope.currentPage=currentPage;
        var start=($scope.currentPage-1)*count;
        //跨域请求豆瓣数据
        JsonpService.jsonp(appConfig.listUrl+$routeParams.category,{count:count,start:start,q:$routeParams.q}, function (res) {
            $scope.subjects=res.subjects;
            //标题
            $scope.title=res.title;
            //数据总条数
            $scope.total=res.total;
            //共有几页
            $scope.totalPage=Math.ceil( $scope.total/count);
            //配置分页控件 数据请求完毕后 pageConfig才有值
            console.log('数据请求成功');
            $scope.pageConfig={totalPage: $scope.totalPage,currentPage:$scope.currentPage,showPage:7,click: function (index) {
                //更改路由的参数 控制分页 需要用到$route
                $route.updateParams({page:index});
                //刷新路由
                //$route.reload();
            }};
            //告诉 angular 刷新界面上的数据
            $scope.$apply();
        //    分页
        //    $scope.hundlePage=function(page){
        //        page=Math.min(Math.max(page,1),$scope.totalPage);
        //        //更改路由参数 需要用到 $route
        //        $route.updateParams({page:page})
        //    };


        });

    }])
})();