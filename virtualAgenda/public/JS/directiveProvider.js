angular.module("agendaApp").directive("apointment", function() {
    return {
        restrict: "E",
        templateUrl: "../Templetate/item.html",
        scope: {
          usersData:'='
        },
        controller: function($scope, mainService) {
          $scope.deleteItem = function(user) {
            var index = $scope.usersData.indexOf(user);

            mainService.deleteApointment(user.id)
            .then(function(data) {
              console.log(data);
              $scope.usersData.splice(index, 1);
            }, function(err) {
              console.log(err);
            })
          }
        }

    };
});
