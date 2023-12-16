const { handleSignIn, handleNewBookAdd, handleShowAllBook, handleUpdateBook } = require("../controllers/admin");

const multer=require("multer")
const path=require("path");
const { isvalidAdmin } = require("../middleware/admin");
const dest=path.resolve('public')+"/assets/Books"
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, dest)
    },
    filename: function (req, file, cb) {
        return cb(null,`${Date.now()}-${file.originalname}`)
    }
  })
const upload = multer({ storage: storage })
const router=require("express").Router();
router.post("/signin",handleSignIn)
router.get("/allbook",isvalidAdmin, handleShowAllBook)
router.put("/book/:_id",isvalidAdmin, handleUpdateBook)
router.post("/book",upload.single("book_image"), handleNewBookAdd)
module.exports=router;