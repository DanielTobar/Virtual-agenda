angular.module('agendaApp').controller('profileCtrl', function($state,$scope, $auth, $location, mainService){


      mainService.getData().then(function(response){

          $scope.users = response || [];
          console.log('TEST',$scope.users);
        }, function(err) {
          console.log(err);
      });


      $scope.sendData = function(obj){

        console.log('$scope.users', $scope.users);
        // $scope.users.push(obj)
        mainService.postDate(obj).then(function(newDate) {
            console.log('new DAte',newDate.data[0]);
          $scope.users.push(newDate.data[0])
        });
        $state.go('mainPage');
      };
});
