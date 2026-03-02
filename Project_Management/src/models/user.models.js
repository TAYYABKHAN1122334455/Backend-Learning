import mongoose,{Schema, Schema} from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
const userSchema =new Schema(
    {
        avatar:{
          type:{
            url:String,
            localPath:String,
          },
          default:{
            url:'https://placehold.co/200x200',
            localPath:"",
          }
        },
        username:{
            type:String,
            required:true,
            unique:true,
            index:true,
            lowercase:true,
            trim:true,   
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,  
        },
        fullName:{
            type:String,
            trim:true,
        },
        password:{
            type:String,
            required:[true,"Password is Required"],
        },
        isEmailVerified:{
            type:Boolean,
            default:false,
        },
        refreshToken:{
            type:String,
        },
        forgotPasswordToken:{
            type:String,
        },
        forgotPasswordExpiry:{
            type:Date,
        },
        emailVerificationToken:{
            type:String,
        },
        emailVerificationExpiry:{
            type:Date,
        },
    },
    {
        timestamps:true,
    }
)
userSchema.pre("save",async function(next){
if(!this.isModified("password")) return next();
//Salt isi leya banaya ha k achi security ka leya matlab: same password ka leya different HASH jo ga.12345=diff hash and 12345=diff hash and then security increases

    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();
});
userSchema.methods.isPasswordCorrect=async function(password){
    return bcrypt.compare(password,this.password);
};

userSchema.methods.generateAccessToken=function(){
   return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
    )
}

userSchema.methods.generateRefreshToken=function(){
   return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
    )
}

userSchema.methods.generateTemporaryToken=function(){
   const unHashToken = crypto.randomBytes(20).toString("hex");
   const hashedToken=crypto.createHash("sha256").update(unHashToken).digest("hex")

   const tokenExpiry=Date.now() + (20*60*1000)//20 mins
   return
   {
    unHashToken,
    hashedToken,
    tokenExpiry
};
}
export const User=mongoose.model("User",userSchema)