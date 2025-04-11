const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    Job:[{type:mongoose.Schema.Types.ObjectId,ref:"Job"}]
})

const JobSchema=mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    company:String,
    Role:String,
    Status:String,
    DateOfApplication:{type:Date,default:Date.now},
    Link:String
})

const User=new mongoose.model('User',UserSchema);
const Job=new mongoose.model('Job',JobSchema);

module.exports={User,Job}