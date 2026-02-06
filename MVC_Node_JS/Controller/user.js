const User=require("../Models/user")

async function getAllUsersHtml(req,res){
    const allDBUsers=await User.find({});
    const html=`
    <ul>
    ${allDBUsers
        .map((u)=>`<li>${u.first_name} -
        ${u.email|| ""}</li><br>`).join("")}
    </ul>
    `
    res.send(html);
}
async function getAllUsers(req,res){
    const users=await User.find()
    res.json(users);
}
async function createNewUser(req,res){
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
}
async function editUser(req,res){
    await User.findByIdAndUpdate(req.params.id,{last_name:"Changed"})
    return res.json({
        status:"Success"
    })
}
async function deleteUser(req,res){
    await User.findByIdAndDelete(req.params.id);
    return res.json({status:"Success"})
}


module.exports={
    getAllUsersHtml,
    getAllUsers,
    createNewUser,
    editUser,
    deleteUser
}