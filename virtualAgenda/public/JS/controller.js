angular.module('agendaApp').controller('mainCtrl', function($scope, $auth, $location, mainService){
    $scope.authenticate = function(provider) {
      $auth.authenticate(provider);
    };



/////////////////////////////////
});
