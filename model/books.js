const mongoose=require("mongoose")
const book=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    author:{
        type:String,
        require:true
    },
    rating:{
        type:Array,
    },
    wishlist:{
        type:Array,
    },
    stock:{
        type:Number,
        require:true
    },
    image_url:{
        type:String,
        require:true,
    },
    category:{
        type:String,
        require:true,
    },
    addingDate:{
        type:Number,
        default:Date.now(),
    }
})
const Book=mongoose.model("Book",book)
module.exports=Book;