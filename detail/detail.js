/**
 * Created by Administrator on 2016/9/29.
 */
(function(){
    var detailModule=angular.module('doubanApp.detailModule',['doubanApp.service']);
   detailModule.config(['$routeProvider',function($routeProvider){
       $routeProvider.when('/detail/:movieId?',{
           templateUrl:'detail/detail.html',
           controller:'DetailController'
       })
   }]);
    detailModule.controller('DetailController',['$scope','$http','JsonpService','$routeParams','$timeout','$rootScope','$location','appConfig',
        function($scope,$http,JsonpService,$routeParams,$timeout,$rootScope,$location,appConfig){

                JsonpService.jsonp(appConfig.detailUrl+$routeParams.movieId,{},function(res){
                    console.log($location.path());
                    console.log(res);
                    //电影名
                    $scope.res=res;
                    $timeout(function () {
                        $scope.title=res.title;
                        //评分
                        //console.log($scope.title);
                        $scope.average=res.rating.average;
                        //年份
                        $scope.year=res.year;
                        //电影图片
                        $scope.image=res.images.large;
                        //类型
                        $scope.genres=res.genres;
                        //主演员
                        $scope.casts=res.casts;
                        //详情介绍
                        $scope.summary=res.summary;
                        //导演
                        $scope.directors=res.directors;
                        //又名
                        $scope.aka=res.aka;
                        //    制片国家/地区
                        $scope.countries=res.countries;
                    },0)

                   })
    }])
})();