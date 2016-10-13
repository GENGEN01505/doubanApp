(function(){
    var doubanApp=angular.module('doubanApp',['ngRoute','doubanApp.listModule','doubanApp.detailModule']);
    //路由 每个模块的路由单独放到了模块中配置
    doubanApp.config(['$routeProvider',function($routeProvider){
        $routeProvider.otherwise({
            redirectTo:'/list/in_theaters'
        })
    }]);
    //    定义一个不变的值
    doubanApp.constant('appConfig',{
        listUrl:'https://api.douban.com/v2/movie/',
        detailUrl:'https://api.douban.com/v2/movie/subject/',
        pageCount:5
    });
    doubanApp.directive('search',['$route','$routeParams','$location','$timeout',function($route,$routeParams,$location,$timeout){
        return {
            replace:true,
            template:' <form class="navbar-form navbar-right" ng-submit="search()">\
                     <input type="text" ng-model="input" class="form-control" placeholder="Search...">\
                    </form>',
            link:function($scope,iEtm,iAttrs,controller){
                   //这里的$scope指的是根作用于$rootScope
                   $scope.search= function () {
                       if($routeParams.category){
                           $route.updateParams({category:'search',q:$scope.input})
                       }else{
                           $location.path('search');
                           $timeout(function () {
                               $route.updateParams({category:'search',q:$scope.input})
                           },0)
                       }
                   }
            }
        }
    }]);

    doubanApp.directive('page',[function () {
          return {
              replace:true,
              template:'<ul class="pagination">\
                     <li ng-click="hundlePage(item)" ng-class="{active:item==current}" ng-repeat="item in pages"><a>{{item}}</a></li> \
              </ul>',
              link:function($scope,iElm,iAttrs,controller){
                  $scope.$watch('pageConfig',function(n){
                      console.log(n);
                     if(n){
                         var total= n.totalPage,
                             show= n.showPage,
                             current= n.currentPage;

                         //左右两边数字的个数
                         var region=Math.floor(show/2);
                         var begin=current-region;
                         begin=Math.max(1,begin);
                         var end=begin+show;
                         if(end>total){
                             end=total+1;
                             begin=end-show;
                             begin=Math.max(1,begin);
                         }
                         var pagination=iElm[0];
                         var pages=[];
                          $scope.pages=pages;
                         $scope.current=current;
                         $scope.hundlePage= function (index) {
                             //调用控制器传递过来的方法
                             n.click(index);
                         };
                         for(var i=begin;i<end;i++){
                             pages.push(i)
                         }
                     }

                  })
              }
          }
    }])

})();