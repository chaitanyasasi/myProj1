const router = require("express").Router();
const passport = require("passport");

const CLIENT_URL = process.env.REACT_URL;

/*
    Login
        - Success
        - Failure

    Logout
*/

router.get("/login/success", (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: "Successful",
            user: req.user
        });
    }
});

router.get("/login/failure", (req, res) => {
    res.status(401).json({
        success: false,
        message: "Failed"
    });
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(CLIENT_URL);
});

router.get("/google",
    passport.authenticate('google', {
        scope: ['profile']
    }));

router.get("/google/callback",
    passport.authenticate('google', {
        successRedirect: CLIENT_URL,
        failureRedirect: '/login/failure'
    }));

module.exports = router
