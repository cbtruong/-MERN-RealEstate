const mongoose= require("mongoose");

const userSchema= new mongoose.Schema({
    username:{
        type:String, 
        require:true,// bắt buộc phải có
        unique:true,// không trùng data
    },
    email:{
        type:String, 
        require:true,// bắt buộc phải có
        unique:true,// không trùng data
    },    
    password:{
        type:String, 
        require:true,// bắt buộc phải có
    },
},
    {timestamps:true});

const User=mongoose.model("User",userSchema);
module.exports= User;