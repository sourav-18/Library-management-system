const express =require("express")
const app=express();
app.get('/addbook',(req,res)=>{
    res.render("AddBook")
})
app.get('/adminlogin',(req,res)=>{
    const message=req.query.message || '';
    res.render("AdminLogin",{message})
})
app.get('/adminprofile',(req,res)=>{
    res.render("AdminProfile")
})
module.exports=app