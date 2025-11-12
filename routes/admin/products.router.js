const express = require("express");
const router = express.Router();
const multer = require("multer");
const controller = require("../../controllers/admin/products.controller")
const storageMulter = require("../../helpers/storageMulter")
const upload = multer({storage: storageMulter()});
const validates= require("../../validate/admin/product.validate")
router.get("/",controller.products);
router.patch("/change-status/:status/:id",controller.changestatus);
router.patch("/change-mutil",controller.changesmutil);
router.delete("/delete/:id",controller.deleteItem);
//có thể trùng router nhưng phải khác phương thức
router.get("/create",controller.createItem);
//upload anh len tren images 1 anh con aray la nhieu anh
//validate de co the kiem tra coi co loi khong
router.post("/create",upload.single('thumbnail'),validates.createPost,controller.createPost);
router.get("/edit/:id",controller.editItem)
router.patch("/edit/:id",upload.single('thumbnail'),validates.createPost,controller.editPatch)
router.get("/detail/:id",controller.detailItem)
module.exports = router;