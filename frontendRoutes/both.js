const express =require("express");
const Book = require("../model/books");
const app=express();
app.get('/allbooks',async(req,res)=>{
    try{
        const data= await Book.find({});
         res.render("AllBooks",{data})
    }catch(error){
        res.render("AllBooks",{message:"something wrong ..."})
    }
})
app.post('/searchbook',async(req,res)=>{
    try{
        const {search_text} =req.body;
        console.log(search_text)
        if(!search_text){
            return res.json({message:"not"})
        }
        const regexPattern = new RegExp(search_text, 'i');
        const data=await Book.find({ name: { $regex: regexPattern } })
        // return res.json({data})
        return res.render("AllBooks",{data})
    }catch(error){
        res.render("AllBooks",{message:"something wrong ..."})
    }
})

module.exports=app