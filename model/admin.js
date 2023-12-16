const mongoose =require("mongoose");
const admin = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true,
    }
})
const Admin=new mongoose.model("Admin",admin)
module.exports=Admin;