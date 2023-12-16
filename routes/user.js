const { test, handleSignUp, handleSignIn, handleByBook, handleAddWishlistBook, handleRemoveWishlistBook, handleReleaseBook, handleAddRating } = require("../controllers/user")
const { isvalidUser } = require("../middleware/user")

const router=require("express").Router()
router.post("/signup",handleSignUp)
router.post("/signin",handleSignIn)
router.post("/bybook/:_id",isvalidUser, handleByBook)
router.post("/wishlist/:_id",isvalidUser, handleAddWishlistBook)
router.post("/rating/:_id",isvalidUser, handleAddRating)
router.delete("/wishlist/:_id",isvalidUser, handleRemoveWishlistBook)
router.delete("/releasebook/:_id",isvalidUser, handleReleaseBook)
router.get('/test',test)
module.exports=router