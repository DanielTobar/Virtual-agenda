angular.module('agendaApp')
    .config(['$stateProvider', '$urlRouterProvider','$locationProvider',
    function($stateProvider, $urlRouterProvider,$locationProvider){

        $stateProvider
        .state('home', {
              url:'/',
              templateUrl : './../views/mainView.html',
              controller: 'mainCtrl'
        })
        .state('mainPage',{
          url:'/userProfile',
          templateUrl: './../views/userProfile/userProfile.html',
          controller:'profileCtrl'
        });
        $urlRouterProvider.otherwise("/");
        $locationProvider.html5Mode(true);

}]);
