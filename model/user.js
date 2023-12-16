const mongoose=require("mongoose");
const user=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    collectionOfBook:{
        type:Array,
    },
    rating:{
        type:Array,
    },
    wishlist:{
        type:Array,
    }
})
const User=mongoose.model("User",user);
module.exports=User;