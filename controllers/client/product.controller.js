module.exports.index = async (req,res) =>{
res.render("client/pages/products/index",{
  pageTitle: "Trang danh sach san pham"

});
}