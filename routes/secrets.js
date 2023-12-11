const express = require("express");
const router = express.Router();
const { User } = require("../models/User");

router.get("/", async (req, res) => {
    try {
        let users = await User.find({ secret: { $ne: null } });
        if (users) {
            res.render("secrets", { usersWithSecrets: users });
        }
    }
    catch (error) {
        console.log(error);
        res.redirect("/login");
    }
});







module.exports = router;