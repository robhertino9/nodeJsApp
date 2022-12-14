var express = require("express");
var passport = require("passport");
var sanitize = require('mongo-sanitize');

var ensureAuthenticated = require("../../auth/auth").ensureAuthenticated;

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

 router.get("/posts",ensureAuthenticated, function(req,res){
   res.render("post/posts")
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
    var username = sanitize (req.body.username);
    var email = sanitize (req.body.email);
    var password = sanitize (req.body.password);
    const onlyLettersPattern = /^[A-Za-z]+$/;
    User.findOne({email: email}, function(err,user,callback){
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
