//Check if user is logged in to post
var ensureAuth = function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        next();
    } else {
        req.flash("info", "You must be signed in to access this page");
        res.redirect("/login");
    }
}

module.exports = {ensureAuthenticated: ensureAuth}
