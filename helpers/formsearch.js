module.exports =(query) =>{
      //bien keyword de tim kiem
      let Object ={
        keyword :"",
        regex : ""
      }
      if(query.keyword){
       Object.keyword=query.keyword;
       const regex = new RegExp(Object.keyword,"i");//bien regex de tim kiem va i la khong biet chu hoa chu thuong
      Object.regex =regex;
   }
    return Object;
}