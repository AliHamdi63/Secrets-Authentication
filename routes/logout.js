const express = require("express");
const asyncHandler = require('express-async-handler');
const router = express.Router();


router.get("/", asyncHandler(
    (req, res) => {
        req.logOut(err => err ? console.log(err) : console.log("Logged out"));
        res.redirect("/");
    }
));



module.exports = router;