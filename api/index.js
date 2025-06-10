const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter= require('./routes/user.route');

dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log('Connected to MongoDB!!!')
})
.catch((err)=>{
    console.log(err);
})

const app=express();

app.use('/api/user',userRouter);

app.listen(3000,(req,res)=>{
    console.log('Server is running on port 3000!')
});