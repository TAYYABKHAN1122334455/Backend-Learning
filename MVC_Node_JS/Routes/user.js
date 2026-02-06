const express = require('express');
const router=express.Router();
const {getAllUsersHtml,getAllUsers,createNewUser,editUser,deleteUser}=require("../Controller/user");

router.route("/")
.post(createNewUser)
.get(getAllUsersHtml);
router
.route("/:id")
.get(getAllUsers)
.patch(editUser)
.delete(deleteUser);

module.exports=router;