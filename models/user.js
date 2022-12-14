const mongoose = require('mongoose');
const bcrypt = require ('bcryptjs');

const SALT_FACTOR = 10;

const userSchema = mongoose.Schema({ 
    username: {type:String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true},
    entryDate: {type:Date, default:Date.now}
});



userSchema.pre("save", function(done){
    var user = this;

    if(!user.isModified("password")){
        return done();
    }

    bcrypt.genSalt(SALT_FACTOR, function(err, salt){
        if(err){return done(err);}
        bcrypt.hash(user.password, salt, function(err, hashedPassword){
            if(err) {return done(err);}

            user.password = hashedPassword;

            done();
        });
    });
});

userSchema.methods.checkPassword = function(guess, done){
    if(this.password != null){
        bcrypt.compare(guess,this.password, function(err, isMatch){
            done(err, isMatch);
        });
    }
}





var User = mongoose.model("User", userSchema);

module.exports = User;