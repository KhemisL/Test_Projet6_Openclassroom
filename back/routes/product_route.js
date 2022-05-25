const express = require("express");
const router = express.Router();
const productCtrl = require("../controllers/product_controller");
const auth = require("../middleware/auth")
const multer = require("multer");
// const upload = multer({dest: "images/" }).single("image");
const multter = require("../middleware/multer");


router.post("/", auth, multter, productCtrl.createProduct);
router.get("/", auth, productCtrl.getAllProduct);
router.get("/:id", auth, productCtrl.getOneProduct);
router.put("/:id", auth, multter, productCtrl.modifyProduct);
router.delete("/:id", auth, productCtrl.deleteProduct);



module.exports = router;