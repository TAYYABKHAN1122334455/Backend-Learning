const express = require('express');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const app=express();
const port= 8000;

//Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/01_mongodb")
.then(()=>console.log("MongoDB Connected"))
.catch((err)=>console.log("The error: ",err));

//Schema



app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Routes
app.get("/users",async(req,res)=>{
    const allDBUsers=await User.find({});
    const html=`
    <ul>
    ${allDBUsers
        .map((u)=>`<li>${u.first_name} -
        ${u.email|| ""}</li><br>`).join("")}
    </ul>
    `
    res.send(html);
})

app.get("/api/users",async(req,res)=>{
    const users=await User.find()
    res.json(users)
})
app.get("/api/users/:id",async(req,res)=>{
    const user=await User.findById(req.params.id);
    if(!user){
       return res.status(404).json({status:"User not Found!"})
    }
    res.json(user);
})
app.post("/api/users",async(req,res)=>{
    try {
        const {first_name,last_name,email,gender}=req.body;
    if(!first_name|| !last_name ||!email ||!gender){
        return res.status(400).json({error:"Kindly Fulfil All Info"});
    }
   const user = await User.create({
        first_name,
        last_name,
        email,
        gender,
    })

    res.status(201).json(user)
    } catch (error) {
        res.status(400).json({
            error:error.message,
        })
    }
})

app
.route("/api/users/:id")
.patch(async(req,res)=>{
    await User.findByIdAndUpdate(req.params.id,{last_name:"Changed"})
    return res.json({
        status:"Success"
    })
})
.delete(async(req,res)=>{
    await User.findByIdAndDelete(req.params.id);
    return res.json({status:"Success"})
})


app.listen(port,()=>{
    console.log("Server running on port",port);
})
