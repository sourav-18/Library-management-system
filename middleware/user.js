const jwt=require("jsonwebtoken");
const User = require("../model/user");
const isvalidUser=async(req,res,next)=>{
    try{
      if(!req.cookies.auth_info){
        return res.status(401).json({message:"Unauthorized access"})
      }
      const {token,role}=JSON.parse(req.cookies.auth_info)
      if(role!=='user')
      return res.status(401).json({message:"Unauthorized access"})
    
        jwt.verify(token,process.env.JWT_PRIVATEKEY,async (error,decode)=>{
          // console.log("decode data--->" ,{error,decode}) if candidate token and user token also docode make sure user token anly pass
          if(error){
            return res.status(401).json({message:"Unauthorized access"})
          }
          const user= await User.findById(decode.user._id);
          if(!user){
            return res.status(401).json({message:"Unauthorized access"})
          }
          req.user=decode.user;
          next();
        })
    }catch(error){
        console.log("error from isvaliduser in middleware --> ", error);
        return res
        .status(500)
        .json({ message: "something worng try aganin later" });
    }
}
module.exports={isvalidUser};