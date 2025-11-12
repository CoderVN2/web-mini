module.exports.createPost=(req,res,next)=>{
     if(!req.body.title){
    req.flash("error","vui lòng nhập tiêu đề!");
    res.redirect("create");
    return;
  }
  next();//them next de middlewave hoat dong

}