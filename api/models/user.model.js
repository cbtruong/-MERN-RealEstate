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
    avatar:{
        type:String,
        default:"https://tse3.mm.bing.net/th?id=OIP.kBaR68sz6o08-K302uAD4AAAAA&pid=Api&P=0&h=180",
    }
},
    {timestamps:true});

const User=mongoose.model("User",userSchema);
module.exports= User;