const express=require("express");
const cookieParser=require("cookie-parser")
require("dotenv").config();
const app=express();
const path=require("path")
//middleware
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const MONGOOSE_URL=process.env.MONGOOSE_URL;
const DB_NAME=process.env.DB_NAME
app.use(express.static(path.resolve('public')));
app.set('view engine', 'ejs');
app.set("views",path.resolve("./views"))


app.get('/',(req,res)=>{
    res.render("Home")
})
app.get('/addbook',(req,res)=>{
    res.render("AddBook")
})
app.get('/signup',(req,res)=>{
    res.render("SignUp")
})
app.get('/bookview',(req,res)=>{
    res.render("BookView")
})
app.get('/alert',(req,res)=>{
    res.render("Alert")
})
app.get('/signin',(req,res)=>{
    res.render("SignIn")
})
app.get('/adminlogin',(req,res)=>{
    res.render("AdminLogin")
})
app.get('/loading',(req,res)=>{
    res.render("Loading")
})



//router use 
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
app.use("/user",userRoutes)
app.use("/admin",adminRoutes)
//server and database conntion 
const PORT=process.env.PORT
app.listen(PORT,(error)=>{
    if(error){
        console.log("error from app listen-> ",error)
    }else{
        console.log("server running successfuly PORT",PORT)
    }
})
const mongoose=require("mongoose");
mongoose.connect(MONGOOSE_URL+DB_NAME).then(()=>console.log("mongodb connting successfuly")).catch(()=>console.log("mongodb connection error"))
// console.log(path.resolve('public'))