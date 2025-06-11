const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter= require('./routes/user.route');
const authRouter=require('./routes/auth.route');
const cookieParser = require("cookie-parser");

dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log('Connected to MongoDB!!!')
})
.catch((err)=>{
    console.log(err);
})

const app=express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);


app.listen(3000,(req,res)=>{
    console.log('Server is running on port 3000!')
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

