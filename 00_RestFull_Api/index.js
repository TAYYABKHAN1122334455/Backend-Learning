const express = require('express');
const fs = require('fs');
const path = require('path');

const app=express();
const port= 8000;


app.use(express.json());
app.use(express.urlencoded({extended:true}));

let users=[];

const dataFile=path.join(__dirname,"MOCK_DATA.json");

try {
    const data=fs.readFileSync(dataFile,"utf-8");
    users=JSON.parse(data);
} catch (error) {
    console.error("Failed to load data:", error.message);
    users=[];
}
//Routes
app.get("/users",(req,res)=>{
    const html=`
    <ul>
    ${users
        .map((u)=>`<li>${u.first_name}
        ${u.last_name|| ""}</li><br>`).join("")}
    </ul>
    `
    res.send(html);
})

app.get("/api/users",(req,res)=>{
    res.json(users)
})
app.get("/api/users/:id",(req,res)=>{
    const id=Number(req.params.id);
    const user=users.find((u)=>u.id===id);
    if(!user){
       return res.status(404).json({status:"User not Found!"})
    }
    res.json(user);
})
app.post("/api/users",(req,res)=>{
    const {first_name,last_name,email,gender}=req.body;
    if(!first_name|| !last_name ||!email ||!gender){
        return res.status(400).json({status:"Kindly Fulfil All Info"});
    }
    const newUser={
        id:users.length+1,
        first_name,
        last_name,
        email,
        gender
    }
    users.push(newUser);
    fs.promises.writeFile(dataFile,JSON.stringify(users,null,2))
    .then(()=>console.log("User Saved!"))
    .catch((err)=>console.log(err));
    res.status(201).json(newUser);
})

app.patch("/api/users/:id",(req,res)=>{
    const id=Number(req.params.id);
    const user=users.find((u)=>u.id===id);

    if(!user)
        return res.status(404).json({status:"User not found"});
    Object.assign(user,req.body);
    fs.writeFileSync(dataFile, JSON.stringify(users, null, 2));
    res.json(user)
})

app.delete("/api/users/:id",(req,res)=>{
    const id=Number(req.params.id);
    const index=users.findIndex(u=> u.id === id);

    if(index === -1){
        return res.status(404).json({error:"User not found!"});
    }
    const deleted=users.splice(index,1)
    fs.writeFileSync(dataFile, JSON.stringify(users, null, 2));
    res.json({message:"Deleted",user:deleted[0]});
})


app.listen(port,()=>{
    console.log("Server running on port",port);
})
