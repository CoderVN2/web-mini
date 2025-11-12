module.exports=(ObjectPagination,query,countProducts) =>{
   if(query.page){
      ObjectPagination.currenpage = parseInt(query.page);
    }
    ObjectPagination.skip = (ObjectPagination.currenpage-1)*ObjectPagination.limitItem;
  
   const totalPage = Math.ceil(countProducts/ObjectPagination.limitItem);
   ObjectPagination.totalPage = totalPage;
   return ObjectPagination;
}