const express = require('express');
const app=express();
app.get("/",(req,res)=>{
    return res.send("Hello Home");
})
app.get("/About",(req,res)=>{
    return res.send("Hello About");
})
app.get("/profile",(req,res)=>{
    return res.send("Hello Profile");
})
app.get("/search",(req,res)=>{
    return res.send(`You are Searching For: ${req.query.search}`)
})
app.listen(4000,()=>{
    console.log("Server listening on Port: 4000");
})