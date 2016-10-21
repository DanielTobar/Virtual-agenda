angular.module('agendaApp').service('mainService', function($http){
  var currentUserId = 0;
  this.getData = function(){
    return $http({
      method: "GET",
      url: "/api/userProfile"
    }).then(function(response){
      if(response.data[0]){
        currentUserId = response.data[0].creator;
        console.log(response.data);
        return response.data;
      }
      else{
        console.log('no squetches')
      }
    });
  };
  this.postDate = function(obj){
    // console.log('from service', obj);
    return $http({
      method:"POST",
      url:"/api/userProfile",
      data: obj
    });
  };
  this.deleteApointment = function(id){
    return $http (
      {
        method:"DELETE",
        url:"/api/userProfile/" + id,
      }
    )

  }

});
