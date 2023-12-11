function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/secrets');
    }
    next();
}


module.exports = {
    checkNotAuthenticated
}