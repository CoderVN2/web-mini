//changestatus
const buttonchangestatus = document.querySelectorAll("[button-change-status]");
if(buttonchangestatus.length>0){
   const formChangestatus=document.querySelector("#form-change-status");
    const path = formChangestatus.getAttribute("data-path")
   buttonchangestatus.forEach(button =>
  {
     button.addEventListener("click",()=>{
      const statusCurrent =button.getAttribute("data-status");
      const id =button.getAttribute("data-id");
      let statusChange = statusCurrent=="active"?"inactive":"active";
      const activeBtn = document.querySelector(".page-item.active [button-pagination]");
    const currentPage = activeBtn ? activeBtn.getAttribute("button-pagination") : 1;
      const action = path + `/${statusChange}/${id}?page=${currentPage}&_method=PATCH`;
      formChangestatus.action=action;
      formChangestatus.submit();
     });
  });
}
//checkbox-mutil
const checkboxMutil = document.querySelector("#checkbox-mutil");
if(checkboxMutil){
  const checkAll = checkboxMutil.querySelector("input#checkAll");
  const inputId = checkboxMutil.querySelectorAll("input.id");
    checkAll.addEventListener("click",()=>{
       if(checkAll.checked){
         inputId.forEach(input =>{
          input.checked = true;
         });
       }
        else{
           inputId.forEach(input =>{
          input.checked = false;
        });
        }
    });
    inputId.forEach(input=>{
      input.addEventListener("click",() =>{
        const coutchecked = checkboxMutil.querySelectorAll("input.id:checked").length;
          if(coutchecked == inputId.length){
            checkAll.checked =true;
          }
          else{
            checkAll.checked =false;
          }
      });
    })
}

//form chang mutil
  const formChangMutil = document.querySelector("#form-change-mutil");
  if(formChangMutil){
    formChangMutil.addEventListener("submit", (e) => {
    e.preventDefault();
    const Inputchecked = formChangMutil.querySelectorAll("input.id:checked");
    const typechange = e.target.elements.type.value;
    //muon xoa hay khong
    if(typechange=="deleted-all"){
      const isConfirm = confirm("Bạn có chắc muốn xóa không!");
      if(!isConfirm){
        return;
      }
    }
if (Inputchecked.length > 0) {
  let ids = [];

  // Nếu là thay đổi vị trí
  if (typechange === "change-position") {
    Inputchecked.forEach(input => {
      const id = input.value;
      const position = input.closest("tr").querySelector("input[name='position']").value;
      ids.push(`${id}-${position}`);
    });
  } 
 
  else {
    ids = Array.from(Inputchecked).map(i => i.value);
  }

  formChangMutil.querySelector("input[name='ids']").value = ids.join(",");
  formChangMutil.submit();

} else {
  alert("Vui lòng chọn ít nhất 1 bản ghi!");
}

  });

  }
  //delete item
  const buttonDelete = document.querySelectorAll("[button-delete]");
  if(buttonDelete.length>0){
      const formdeleteItem = document.querySelector("#form-delete-item");
      const path =formdeleteItem.getAttribute("data-path");
      buttonDelete.forEach(button =>{
      button.addEventListener("click",()=>{
         const inConfirm = confirm("Bạn có chắc muốn xóa sản phẩm này!");//thông báo 
            if(inConfirm){
              const id =button.getAttribute("data-id");
              const action = `${path}/${id}?_method=DELETE`;
              formdeleteItem.action = action;
              formdeleteItem.submit();
            }
      });
    });
  }