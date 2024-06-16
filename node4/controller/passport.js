const passport = require("passport");

var GoogleStrategy = require('passport-google-oauth2').Strategy;

const USER_ID =process.env.CLIENT_ID;
const USER_SECRET =process.env.CLIENT_SECRET;

passport.use(new GoogleStrategy({
   clientID: "USER_ID",
    clientSecret: "USER_SECRET",
    callbackURL: process.env.REACT_BASE_URL+"/auth/google/callback",
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
