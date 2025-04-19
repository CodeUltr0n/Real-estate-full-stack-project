const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapasync = require("../utilis/wrapasync");
const passport = require("passport");
const { saveRedirectUrl } = require("../views/middleware");
const userController = require("../controllers/users");



router.route("/signup")
.get(userController.renderSignupForm)
.post(wrapasync(userController.signup));

router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl,passport.authenticate('local', { 
    failureRedirect: '/login',
    failureFlash:true }),
    userController.login);


router.get("/logout", userController.logout);

module.exports = router;