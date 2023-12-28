const ADMIN_PRIVATEKEY=process.env.ADMIN_PRIVATEKEY
const Admin = require("../model/admin");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
const Book = require("../model/books");
const multer=require("multer")


const handleSignIn=async(req,res)=>{
    try {
        const { name, password } = req.body;
        if (!name || !password) {
          return res.redirect("/adminlogin?message=fill the data correctly")
        }
        const data = await Admin.findOne({ name });
        if(!data)
        return res.redirect("/adminlogin?message=Admin not Exist")
        if (data) {
          bcrypt.compare(password, data.password, (err, result) => {
            if (err)
            return res.redirect("/adminlogin?message=something worng try aganin later")
            if (result) {
              var token = jwt.sign({ admin:data },ADMIN_PRIVATEKEY);
              res.cookie("auth_info",JSON.stringify({token,role:"admin"}))
              return res.redirect("/adminlogin?message=admin successfuly login")
            }else {
              return res.redirect("/adminlogin?message=password is not correct")
              }
          });
        }
      } catch (error) {
        console.log("error from handleLoginAdmin -> ", error);
        res.status(500).json({ message: "please try again later" });
      } 
}
const handleNewBookAdd=async(req,res)=>{
    try{
        const {name,description,author,stock,category}=req.body;
        if(!req.file){
          res.render("Message",{ message: "something worng try aganin later" })
        }
        const image_url=req.file.filename;
        if(!name||!description||!author||!image_url||!stock||!category){
            return res.status(200).json({ message: "fill all data" });
        }
       const data=await Book.create({
            name,
            description,
            author,
            image_url,
            stock,
        })
        res.render("Message",{message:"Book Add successfuly",data})
        // res.status(200).json({message:"book add successfuly",data})
        
    }catch(error){
        console.log("error from handlenewBookadd ",error);
        return res
        .status(500)
        .json({ message: "something worng try aganin later" });
    }
}
const handleShowAllBook=async(req,res)=>{
  try{
    const book=await Book.find({});
    res.status(200).json({book})
  }catch(error){
    console.log("error from handleShowAllBook ",error)
    res.status(500).json({message:"somthing wrong try again ! "})
  }
}
const handleUpdateBook=async(req,res)=>{
  try{
    const bookId=req.params._id;
    const update=req.body;
    console.log(update)
    const data=await Book.updateOne({_id:bookId},update)
    if (data.modifiedCount=== 0) {
      return res.status(404).json({ message: "no changes applied" });
    }
    res.status(200).json({message:"book update successfuly "})
   }catch(error){
    console.log("error from handleUpdateBook ",error)
    res.status(500).json({message:"somthing wrong try again ! "})
  }
}

// password hasing for admin
// const bcrypt = require("bcrypt");
// const bt=async()=>{
//     bcrypt.hash("admin", 10, async (err, hash) => {
//         console.log(hash)
//     })
// }
// bt()
module.exports={handleSignIn,handleNewBookAdd,handleShowAllBook,handleUpdateBook}