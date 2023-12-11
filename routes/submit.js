const express = require("express");
const router = express.Router();
const { User } = require("../models/User");


router.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("submit");
    }
    else {
        res.redirect("/login");
    }
});

router.post("/", async (req, res) => {
    const submittedSecret = req.body.secret;
    let user = await req.user;
    try {
        let foundUser = await User.findById({ _id: user._id });
        if (foundUser) {
            foundUser.secret = submittedSecret;
            foundUser.save();
            res.redirect("/secrets");
        }
    }
    catch (error) {
        console.log(error);
        res.redirect("/secrets");
    }
});





module.exports = router;