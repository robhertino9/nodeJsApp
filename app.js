var express = require("express");
var path = require("path");
const mongoose = require('mongoose');
var cookieParser = require("cookie-parser");
var passport = require("passport");
var session = require("express-session");
var flash = require ("connect-flash");
var bodyParser = require("body-parser");
require('dotenv/config');


var setUpPassport = require("./setuppassport");
//var routes = require("./routes");

const app = express();

app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({
    secret:"superSecureText!23",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


//db connection
mongoose.connect(process.env.DB_URI, {useNewUrlParser:true, useUnifiedTopology:true})
.then ( () => {
    console.log('DB connected');
    setUpPassport();
})
.catch ( (err) => {
    console.log(err);
});

app.use("/", require("./routes/web"));
app.use("/api", require("./routes/api"));


app.listen(app.get("port"), function(){
    console.log("Server started on port " + app.get("port"));
})
