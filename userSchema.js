const mongoose = require("mongoose");

const userDetail = new mongoose.Schema({
    fname:String,
    lname:String,
    email: {type:String,unique:true},
    uname:{type:String,unique:true},
    password:String
},
{
    collection: "UserInfo", 
}
);

mongoose.model("UserInfo",userDetail);