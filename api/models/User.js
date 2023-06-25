const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    email: {type:String, unique:true},
    password: String
});

const User = new mongoose.model('User', UserSchema);
module.exports = User;