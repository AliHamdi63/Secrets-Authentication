const express = require("express");
const asyncHandler = require('express-async-handler');
const router = express.Router();
const { User } = require("../models/User");
const bcrypt = require("bcryptjs");
const { checkNotAuthenticated } = require('../middlewares/check-auth');


router.get("/", checkNotAuthenticated, asyncHandler(
    (req, res) => {
        res.render("register");
    })
);


router.post("/", checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            userName: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        await newUser.save();
        res.redirect('/login');
    } catch (error) {
        res.redirect('/register')
    }
});


// Authentication using bcryptjs
/*
router.post("/", asyncHandler(
    async (req, res) => {

        const salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            email: req.body.email,
            password: hashedPassword
        });

        await newUser.save();
        res.render("secrets")
    }
));
*/


module.exports = router;