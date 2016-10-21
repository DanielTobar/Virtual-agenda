var exports = module.exports = {};
var app = require('./server.js');
var config = require('./secret/key.js');
var request = require('request');
var db = app.get('db');
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
exports.facebookLog = function(req, res) {
    var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
    var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
    var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
    var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: config.FACEBOOK_SECRET,
        redirect_uri: req.body.redirectUri
    };
    request.get({
        url: accessTokenUrl,
        qs: params,
        json: true
    }, function(err, response, accessToken) {
        if (response.statusCode !== 200) {  
            return res.status(500).send({
                message: accessToken.error.message
            });
        }
    });
    request.get({
        url: graphApiUrl,
        qs: accessToken,
        json: true
    }, function(err, response, profile) {
        if (response.statusCode !== 200) {
            return res.status(500).send({
                message: profile.error.message
            });
        } else {
            db.queries.get_Users([profile.sub], function(err, response) {
                if (response.length === 0) {} else {
                    // console.log('hi');
                }
            });
        }
    });
};
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
exports.basicInfo = function(req, res, next) {
    db.queries.get_basic_info([req.user.id],function(err, response) {
        if (err) {
          console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).send(response);
        }
    });
};
exports.postInfo = function(req, res, next){
  function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
      return next()
  } else {
      res.redirect("/")
  }
}
  console.log("////////////////////",req.isAuthenticated());
  db.queries.post_date([ req.body.owner, req.user.id,
    req.body.bigining_date, req.body.ending_date, req.body.squetch_name, req.body.date],
    function(err, response){
    if(err) {
      res.status(500).json(err);
    }else{
      console.log("======>",response);
      res.status(200).json(response);
      // res.send(response);
    }
  });
};
exports.deleteApointment = function(req, res, next){
  console.log('*****REQ.PARAMS.ID', req.params.id);
  db.queries.deleteItem([req.params.id], function(err, response){
    if (err){
      res.status(500).json(err)
    }
    else{
      res.send({message: 'deleted!'})
      console.log("item deleted");
    }
  })
}
