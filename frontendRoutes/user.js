const express =require("express");
const Book = require("../model/books");
const app=express();
app.get('/book',async(req,res)=>{
    try{
        const {_id}=req.query;
       const data=await Book.findById(_id)
        res.render("Book",{data});
    }catch(error){
        console.log("error from-> /book ",error)
        res.render("Book",{message:"something wrong ..."})
    }
})
app.get('/signup',(req,res)=>{
    const message=req.query.message || '';
    res.render("SignUp",{message})
})
app.get('/alert',(req,res)=>{
    res.render("Alert")
})
app.get('/signin',(req,res)=>{
    const message=req.query.message || '';
    res.render("SignIn",{message})
})
app.get('/loading',(req,res)=>{
    res.render("Loading")
})
app.get('/wishlist',(req,res)=>{
    res.render("Wishlist")
})
app.get('/Purchase',(req,res)=>{
    res.render("Purchase")
})
app.get('/userprofile',(req,res)=>{
    res.render("userProfile")
})
module.exports=app