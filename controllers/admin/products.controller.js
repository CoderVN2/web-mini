const config = require("../../config/system")
const filterStatushelper = require("../../helpers/fillterstatus");
const searchHelp =require("../../helpers/formsearch")
const pagination =require("../../helpers/pagination");
const Product = require("../../models/modelsproduct");
//[GET] /admin/products
module.exports.products = async (req,res) =>{
   const fillterstatus = filterStatushelper(req.query);

   let find = {
     deleted: false,
    
   };
   //lọc là ?status=active lên url
   if(req.query.status){
      find.status =req.query.status;
   }

   const ObjectSearch = searchHelp(req.query);
    if(ObjectSearch.regex){ 
      find.title =ObjectSearch.regex;
           }

    //phan trang 2 san pham
     const countProducts = await Product.countDocuments(find);
    let ObjectPagination =pagination({
      limitItem : 2,
      currenpage :1
    },
    req.query,
    countProducts
  )


  const productslimit2= await Product.find(find).sort({position: "desc"}).limit(ObjectPagination.limitItem).skip(ObjectPagination.skip);
  // end
 const newproducts =productslimit2.map(item=>{
    item.priceNew =(item.price*(100-item.discountPercentage)/100).toFixed(0);
  return item;
});


res.render("admin/pages/products/index",{
  pageTitle: "Trang danh sach san pham",
    products: newproducts,
    filterStatus: fillterstatus,
    keyword: ObjectSearch.keyword,
    pagination : ObjectPagination,
    originalUrl: req.originalUrl,
   
});
}
//[get]  /admin/products/changestatus/:status/:id
module.exports.changestatus = async (req,res)=>{
   const status = req.params.status;
   const id = req.params.id;
   const page = req.query.page;
   await Product.updateOne({_id: id},{status: status});
   //hien thị thong bao
   req.flash("success","cập nhật trạng thái thành công");
   res.redirect(`/admin/products?page=${page}`);

}
module.exports.changesmutil = async (req,res) =>{
      const type= req.body.type;
      const redirectUrl = req.body.redirectUrl; 
      const ids = req.body.ids.split(",").map(id => id.trim());// split de chuyen thanh 1 mang
      switch(type){
        case  "active":
          await Product.updateMany({_id:{$in: ids }}, {status: "active"});
          req.flash("success",`Cập nhật ${ids.length} sản phẩm thành công!`);
          break;
        case  "inactive":
           await Product.updateMany({_id:{$in: ids }}, {status: "inactive"});
        break;
        case "deleted-all":
           await Product.updateMany({_id:{$in: ids}},{deleted: true, deletedAt: new Date()});
           req.flash("success",`Xóa ${ids.length} sản phẩm thành công!`);
        case "change-position":
          for(const item of ids){
            let[id,position] =item.split("-");
            position = parseInt(position);
             await Product.updateOne({_id: id},{
              position: position 
             });
          }
        default:
          break;

      }
     res.redirect(redirectUrl || "/admin/products");
};
//[delete]  /admin/products/delete/:id

module.exports.deleteItem = async (req,res)=>{
   const id = req.params.id;
   const page = req.query.page;
   await Product.updateOne({_id: id},{
    deleted: true,
    deletedAt: new Date()
  });
  req.flash("success",`Xóa sản phẩm thành công!`);
   if(page){
    res.redirect(`/admin/products?page=${page}`
    );
   }else {
    res.redirect(`/admin/products`);
   }
}
//[get]  /admin/products/create
module.exports.createItem = async (req,res)=>{
  res.render(`admin/pages/products/create`,{
  pageTitle: "thêm mới sản phẩm"
  });
}
//[Post]  /admin/products/create
module.exports.createPost = async (req,res)=>{

  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  if(req.body.position == ""){
    const countPosition = await Product.countDocuments();
    req.body.position = countPosition +1;
  }else{
    req.body.position = parseInt(req.body.position);
  }

  const products = new Product(req.body);
  await products.save();
  res.redirect(`${config.prefixAdmin}/products/create`);
  
}
//[get]  /admin/products/edit
module.exports.editItem = async (req,res)=>{
  try{const find = {
    deleted: false,
    _id: req.params.id
  };
  const product = await Product.findOne(find);
  
  res.render(`admin/pages/products/edit`,{
  pageTitle: "Chỉnh sửa sản phẩm",
      product: product
  });
}
catch(error){
   res.redirect(`${config.prefixAdmin}/products`);
}
}
//[patCh]  /admin/products/edit
module.exports.editPatch= async(req,res)=>{
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  req.body.position = parseInt(req.body.position);
 

  try{
     await Product.updateOne({_id:req.params.id},req.body);
     req.flash("success",`Đã chỉnh sửa thành công`);
  } catch(error){
     req.flash("error",`Đã chỉnh sửa thất bại!`);
  }
  res.redirect(`back`);
}
//[get ]/admin/products/detail
module.exports.detailItem = async (req,res)=>{
  try{const find = {
    deleted: false,
    _id: req.params.id
  };
  const product = await Product.findOne(find);
  
  res.render(`admin/pages/products/detail`,{
  pageTitle: product.title,
      product: product
  });
}
catch(error){
   res.redirect(`${config.prefixAdmin}/products`);
}
}