const express = require('express');
const fs = require('fs');
const userRouter=require("./Routes/user");
const {connectMongoDB}=require("./connection")
const app=express();
const port= 8000;

//Connect to MongoDB
connectMongoDB("mongodb://127.0.0.1:27017/01_mongodb");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/users",userRouter);
app.listen(port,()=>{
    console.log("Server running on port",port);
})
