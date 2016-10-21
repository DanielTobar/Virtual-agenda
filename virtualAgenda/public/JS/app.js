angular.module('agendaApp',['ui.router', 'satellizer'])
.config(function($authProvider) {
  $authProvider.google({
    clientId: '293948357119-61c96dirr2p43mgd17i8i0r9vn64bqst.apps.googleusercontent.com'
  });
  $authProvider.facebook({
    clientId: '1774231396191765'
  });

});
