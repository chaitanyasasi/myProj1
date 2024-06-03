const passport = require("passport");

var GoogleStrategy = require('passport-google-oauth2').Strategy;

const CLIENT_ID ="320443069906-l3p98i6clbgtk92dmqq7gkdhe5p45k4f.apps.googleusercontent.com";
const CLIENT_SECRET ="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";

passport.use(new GoogleStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: "http://localhost:3103/auth/google/callback",
    passReqToCallback: true
},
    function (request, accessToken, refreshToken, profile, done) {
        done(null, profile);
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});