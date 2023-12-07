const express=require("express");
const path=require("path")
const app=express();
require("dotenv").config();
const PORT=process.env.PORT
app.set('view engine', 'ejs');
app.set("views",path.resolve("./views"))
app.get('/',(req,res)=>{
    res.render("Home")
})
app.listen(PORT,(error)=>{
    if(error){
        console.log("error from app listen-> ",error)
    }else{
        console.log("server running successfuly PORT",PORT)
    }
})