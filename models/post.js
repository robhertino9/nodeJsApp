var mongoose = require("mongoose");

var postSchema = mongoose.Schema({
    title: {type: String, required: true},
    content: {Type:String, required: false},
    createdAt: {type:Date, Default:Date.now},
    userID: {type:mongoose.Schema.Types.ObjectId, required: false, unique: false},
    public: {type:Boolean, default: false, required: false, unique: false}
});

var Post = mongoose.model("Post", postSchema);

module.exports = Post;