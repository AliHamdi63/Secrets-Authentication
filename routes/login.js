const express = require("express");
const asyncHandler = require('express-async-handler');
const router = express.Router();
const { User } = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { checkNotAuthenticated } = require('../middlewares/check-auth');


router.get("/", checkNotAuthenticated, asyncHandler(
    (req, res) => {
        res.render("login");
    })
);

router.post("/", checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/secrets',
    failureRedirect: '/login',
    failureFlash: true
}))


// authentication using bcryptjs
/*
router.post("/", asyncHandler(
    async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;

        let user = await User.findOne({ email: email });

        if (user) {
            await bcrypt.compare(password, user.password, (err, success) => {
                if (success) {
                    res.render("secrets");
                }
                else {
                    res.status(404).json({ message: "Invalid Email or Password" })

                }
            });

        }
    }
));
*/


module.exports = router;