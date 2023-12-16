const bcrypt=require("bcrypt");
const User = require("../model/user");
const jwt=require("jsonwebtoken");
const Admin = require("../model/admin");
const mongoose = require("mongoose");
const Book = require("../model/books");
const JWT_PRIVATEKEY=process.env.JWT_PRIVATEKEY;
const handleSignUp=async(req,res)=>{
    try {
        const {name,password,email}=req.body;
        if (!name || !email || !password)
          return res.status(400).json({ message: "fill the data correctly" });
        const isExistuser = await User.findOne({ email });
        if (isExistuser) {
          return res.status(403).json({ message: "user allready exist" });
        }
        bcrypt.hash(password, 10, async (err, hash) => {
          if (err) {
            console.log("error from password hashing ", err);
            return res
              .status(500)
              .json({ message: "something worng try aganin later" });
          }
          const userData = await User.create({
            name,
            email,
            password: hash,
          });
          return res.status(201).json({ message: "user successfuly added",success:true });
        });
      } catch (error) {
        console.log("error from handleAdduser", error);
        return res
          .status(500)
          .json({ message: "something worng try aganin later" });
      }
}
const handleSignIn=async(req,res)=>{
    try {
        const { email, password } = req.body;
        if (!email || !password)
          return res.status(400).json({ message: "fill the data correctly" });
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ message: "user not exist" });
        }
        bcrypt.compare(password, user.password, (err, result) => {
          if (err)
            return res
              .status(500)
              .json({ message: "something worng try aganin later" });
          if (result) {
            var token = jwt.sign({ user },JWT_PRIVATEKEY);
            res.cookie("auth_info",JSON.stringify({token,role:"user"}))
            res.render("Home")
          } else {
            res.status(200).json({ message: "password is not correct" });
          }
        });
      } catch (error) {
        console.log("error from user loginHandler ", error);
        return res
          .status(500)
          .json({ message: "something worng try aganin later" });
      }
}
const test=async(req,res)=>{
  if(req.cookies.auth_info){
    
    console.log(JSON.parse(req.cookies.auth_info))
  }
    res.status(200).json({message:"ok"})
}
const handleByBook=async(req,res)=>{
  // Start a transaction
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const bookId = req.params._id; // Replace with the book's ID
    const userId = req.user._id; // Replace with the user's ID
    const user=await User.findById(userId);
    const isAllreadyBy=user.collectionOfBook.find((data)=>{
      return data.bookId==bookId
    })
    if(isAllreadyBy){
     return res.status(200).json({message:"you has already purchased this book"});
    }
    const book=await Book.findById(bookId);
    if(!book){
      return res.status(404).json({message:"item not found"})
    }
    if(book.stock===0){
      return res.status(200).json({message:"out of stock."})
    }
    const {name,description,author,image_url}=book
   await User.updateOne({_id:userId},{$push:{collectionOfBook:{bookId,name,description,author,image_url}}},session)
    await Book.updateOne({_id:bookId},{ $inc: { stock: -1 }},session)

    res.status(200).json({message:"you have successfuly purchased book"});
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
   console.log("error from handlebyBook ",error)
    res.status(500).json({message:"somthing worng please try again"})
  }finally {
    session.endSession();
  }
}
const handleAddWishlistBook=async(req,res)=>{
  // Start a transaction
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const bookId = req.params._id; // Replace with the book's ID
    const userId = req.user._id; // Replace with the user's ID
    const user=await User.findById(userId);
    const isExits=user.wishlist.find((data)=>{
      return data.bookId==bookId
    })
    if(isExits){
     return res.status(200).json({message:"User has already wishList this book"});
    }
    const book=await Book.findById(bookId);
    if(!book){
      return res.status(404).json({message:"item not found"})
    }
    const {name,description,author,image_url}=book
    const userData= {name:user.name,time:Date.now(),userId}
   await User.updateOne({_id:userId},{$push:{wishlist:{bookId,name,description,author,image_url}}},session)
    await Book.updateOne({_id:bookId},{$push:{wishlist:userData}},session)
    await session.commitTransaction();
    res.status(200).json({message:"you have successfuly wishlist book"});
  } catch (error) {
    await session.abortTransaction();
   console.log("error from handleAddWishlistBook ",error)
    res.status(500).json({message:"somthing worng please try again"})
  }finally {
    session.endSession();
  }
}
const handleRemoveWishlistBook=async(req,res)=>{
  // Start a transaction
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const bookId = req.params._id; // Replace with the book's ID
    const userId = req.user._id; // Replace with the user's ID
    const user=await User.findById(userId);
    const isExits=user.wishlist.find((data)=>{
      return data.bookId==bookId
    })
    const book=await Book.findById(bookId);
    if(!book||!isExits){
      return res.status(404).json({message:"item not found"})
    }
   await User.updateOne({_id:userId},{$pull:{wishlist:{bookId}}},session)
    await Book.updateOne({_id:bookId},{$pull:{wishlist:{userId}}},session)
    await session.commitTransaction();
    res.status(200).json({message:"book is remove from wishList"});
  } catch (error) {
    await session.abortTransaction();
   console.log("error from handleRemoveWishlistBook ",error)
    res.status(500).json({message:"somthing worng please try again"})
  }finally {
    session.endSession();
  }
}
const handleReleaseBook=async(req,res)=>{
  // Start a transaction
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const bookId = req.params._id; // Replace with the book's ID
    const userId = req.user._id; // Replace with the user's ID
    const user=await User.findById(userId);
    const isExits=user.collectionOfBook.find((data)=>{
      return data.bookId==bookId
    })
    console.log(isExits)
    const book=await Book.findById(bookId);
    if(!book||!isExits){
      return res.status(404).json({message:"item not found"})
    }
   await User.updateOne({_id:userId},{$pull:{collectionOfBook:{bookId}}},session)
   await Book.updateOne({_id:bookId},{ $inc: { stock: 1 }},session)
    await session.commitTransaction();
    res.status(200).json({message:"book is release"});
  } catch (error) {
    await session.abortTransaction();
   console.log("error from handleRemoveWishlistBook ",error)
    res.status(500).json({message:"somthing worng please try again"})
  }finally {
    session.endSession();
  }
}
const handleAddRating=async(req,res)=>{
  const session = await mongoose.startSession();
  session.startTransaction();
    try{
      const bookId=req.params._id;
      const userId=req.user._id;
      const rating=req.body;
     const book=await Book.findById(bookId);
     if(!book){
      return res.status(400).json({message:"item is not found"})
     }
     const user=await User.findById(userId)
    const isExist= user.rating.find((data)=>{
      return data.bookId===bookId;
     })
     if(isExist)return res.status(200).json({message:"you have already rated"})
     const {name,description,author,image_url}=book
     const userData= {name:user.name,time:Date.now(),userId,rating}
     await User.updateOne({_id:userId},{$push:{rating:{bookId,name,description,author,image_url,rating}}},session)
     await Book.updateOne({_id:bookId},{$push:{rating:userData}},session)
     await session.commitTransaction();
     return res.status(200).json({message:"rating successfuly add"})
    } catch (error) {
      await session.abortTransaction();
     console.log("error from handleAddRating",error)
      res.status(500).json({message:"somthing worng please try again"})
    }finally {
      session.endSession();
    }
}

module.exports={handleSignUp,handleSignIn,test,handleByBook,handleAddWishlistBook,handleRemoveWishlistBook,handleReleaseBook,handleAddRating}
