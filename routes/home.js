const express = require("express");
const asyncHandler = require('express-async-handler');
const router = express.Router();



router.get("/", asyncHandler(
    (req, res) => {
        res.render("home");
    }
));







module.exports = router;