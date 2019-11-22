const express = require('express');
const session = require('express-session')
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;

var appKey = '7544e8ff2a8646b5a82425034662a889';
var appSecret = 'a2b8ec44058346b38b3b9ef2f8afe23c';

let access_token = undefined;
let current_user = undefined;

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session. Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing. However, since this example does not
//   have a database of user records, the complete spotify profile is serialized
//   and deserialized.

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

let app = express();

passport.use(
    new SpotifyStrategy(
      {
        clientID: appKey,
        clientSecret: appSecret,
        callbackURL: 'http://localhost:8888/callback'
      },
      function(accessToken, refreshToken, expires_in, profile, done) {
        // asynchronous verification, for effect...
        access_token = accessToken;
        process.nextTick(function() {
          // To keep the example simple, the user's spotify profile is returned to
          // represent the logged-in user. In a typical application, you would want
          // to associate the spotify account with a user record in your database,
          // and return that user instead.
          return done(null, profile);
      })
  })
);

app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

app.listen(8888);
console.log('App is listening on port 8888');

// GET /auth/spotify
//   Use passport.authenticate() as route middleware to authenticate the
//   request. The first step in spotify authentication will involve redirecting
//   the user to spotify.com. After authorization, spotify will redirect the user
//   back to this application at /auth/spotify/callback
app.get(
    '/auth/spotify',
    passport.authenticate('spotify', {
      scope: ['user-read-email', 'user-read-private', 'streaming', 'user-modify-playback-state'],
      showDialog: true
    }),
    function(req, res) {
      // The request will be redirected to spotify for authentication, so this
      // function will not be called.
    }
  );
  
  // GET /auth/spotify/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request. If authentication fails, the user will be redirected back to the
  //   login page. Otherwise, the primary route function function will be called,
  //   which, in this example, will redirect the user to the home page.
  app.get(
    '/callback',
    passport.authenticate('spotify', { failureRedirect: '/login' }),
    function(req, res) {
      current_user = req.user;
      res.redirect('http://localhost:3000/dashboard');
    }
  );
  
  app.get('/getUser', (req, res) => {
    res.json({ user: current_user, token: access_token});
  })
  
  // Simple route middleware to ensure user is authenticated.
  //   Use this route middleware on any resource that needs to be protected.  If
  //   the request is authenticated (typically via a persistent login session),
  //   the request will proceed. Otherwise, the user will be redirected to the
  //   login page.
  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  }
  