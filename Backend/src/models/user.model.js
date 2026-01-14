import mongoose from "mongoose";

// Schema
const userSchema = new mongoose.Schema(
{
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    profilePic:{   // Cloudinary image URL
        type:String,
        default:''
    },
    profilePicId:{  // Cloudinary public_id deletion
        type:String,
        default:''
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true 
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:"user"
    },
    token:{
        type:String,
        default:null
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isLoggedIn:{
        type:Boolean,
        default:false
    },
    otp:{
        type:String,
        default:null
    },
    otpExpiry:{
        type:Date,
        default:null
    },
    address:{
        type:String
    },
    city:{
        type:String
    },
    zipCode:{
        type:String
    },
    phoneNo:{
        type:String
    }
},
{ timestamps:true }
);

// Model
const User = mongoose.model('User', userSchema);
export default User;
