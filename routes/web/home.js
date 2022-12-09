var express = require("express");
var passport = require("passport");

var User = require("../../models/user");

var router = express.Router();


router.get("/", function(req, res) {
    // console.log("hello I'm on the start page");
 res.render("home/");
 });
 
 router.get("/home", function(req,res){
     res.render("home/home");
 });

 router.get("/about", function(req, res){
    res.render("home/about");
 });

 router.get("/login", function(req,res){
    res.render("home/login");
 });

 router.get("/logout", function(req,res){
   req.logout(function(err){
      if(err) {return next(err);}
       res.redirect("/home");
   });
 });

 router.post("/login", passport.authenticate("login", {
    successRedirect:"/home",
    failureRedirect:"/login",
    failureFlash:true
 }));

 router.get("/signup", function(req,res){
    res.render("home/signup");
 });

 router.post("/signup", function(req,res,next){
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({email: email}, function(err,user){
        if(err){return next(err);}
        if(user){
            req.flash("Error", "Email already in use!");
            return res.redirect("/signup");
        }

        var newUser = new User({
            username:username,
            password:password,
            email:email
        });

        newUser.save(next);
    });

 }, passport.authenticate("login", {
    successRedirect:"/home",
    failureRedirect:"/signup",
    failureFlash:true
 }));


 module.exports = router;
