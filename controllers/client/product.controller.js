//[GET] /product
const Products =require("../../models/modelsproduct")

module.exports.index = async (req,res) =>{
const products= await Products.find({ 
  status : "active",
  deleted : false
}).sort({position: "desc"});
 const newproducts =products.map(item=>{
    item.priceNew =(item.price*(100-item.discountPercentage)/100).toFixed(0);
  return item;
});
res.render("client/pages/products/index",{
  pageTitle: "Trang danh sach san pham",
    products: newproducts
});
}
module.exports.detail = async(req,res)=>{
  try{const find = {
    status : "active",
    deleted: false,
    slug: req.params.slug
  };
  const product = await Products.findOne(find);
  
  res.render(`client/pages/products/detail`,{
  pageTitle: product.title,
      product: product
  });
}
catch(error){
   res.redirect(`/products`);
}

}