var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cors = require('cors');
var request = require('request');
var massive = require('massive');
var passport= require("passport");
var port = 4000;
var connectionString = "postgress://admin@localhost/virtualagenda";
var massiveInstance = massive.connectSync({connectionString: connectionString});
var config = require('./secret/key.js');
var app = module.exports = express();
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
  app.set('db', massiveInstance);
var db = app.get('db');
var Ctrl = require('./controller.js');

  app.use(express.static('../../public'));
  app.use(cors({origin: 'http://localhost:4000'}));
    app.use(bodyParser.json());
  app.use(session({
    secret: config.config.secret,
    saveUninitialized: true,
    resave: true
}));




  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new GoogleStrategy({
        clientID: "1027516463509-vc5a94fkquck1ag499ltoacenrd5ahgi.apps.googleusercontent.com",
        clientSecret: "pS_n5DflMG3I2AyQ8KbIodjC",
        callbackURL: 'http://localhost:4000/auth/google/callback',
    }, function(accessToken, refreshToken, profile, done) {
          db.queries.get_Users([profile.id], function(err, user){
              if (err) return done(err);
              console.log('user:', user);
              if (!user[0]) {
                db.queries.log_user([profile.name.givenName,profile.id ],  function(err, response){
                      if (err) {
                        console.log("error *****************", err);
                      }
                      console.log('response *********************', response);
                      return done(null, response);
                });
              } else {
                done(null, user);
              }
          });

    }));
    function restrict(req, res, next) {
           if(req.isUnauthenticated()) return res.status(403).json({message: 'please login'});
           next();
       }
    passport.serializeUser(function(user, done) {
      // this is putting the user.id into the whole session
      done(null, user[0].google_id);
    });
    passport.deserializeUser(function(id, done) {
      console.log('ID FROM deserializeUser', id);
      // add in the database call

        db.queries.get_Users([id], function(err, user) {
          console.log('from deserializeUser', user);
          done(err, user[0]);
        });
    });

    app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/' }),  function(req, res, next){
      //console.log('callback reached');
      res.redirect("/userProfile");
    });


var config = require('./secret/key.js');

/////////////////////////ENDPOITNS////////////////////////////////////
  app.get('/api/login/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login']}));
  app.get('/logout', function(req, res){req.logout();  res.redirect('/');});
  // app.post('/auth/facebook/',Ctrl.facebookLog);
  app.get('/api/userProfile',restrict,Ctrl.basicInfo);
  app.post("/api/userProfile",restrict, Ctrl.postInfo);
app.delete("/api/userProfile/:id",Ctrl.deleteApointment )

/////////////////////////ENDPOITNS////////////////////////////////////
  app.all("/*", function(req, res, next) {
    res.sendFile("index.html", { root: "../../public"});
  });

  app.listen(port, function() { console.log("Server initiated on port " + port); });
