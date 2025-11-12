// Button Status
const buttonStatus = document.querySelectorAll('[button-status]');
if (buttonStatus.length > 0) {
    let url = new URL(window.location.href);

    buttonStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute('button-status');
            if (status) {
                url.searchParams.set("status", status);
               
            }
           else{
                url.searchParams.delete("status");
               
           }
           window.location.href =url.href;
        });
    });
}
//form search
const formSeach = document.querySelector("#form-search");
if(formSeach){
  let url = new URL(window.location.href);
   formSeach.addEventListener("submit", (e)=>{
      e.preventDefault();
      const keyword = e.target.elements.keyword.value;
       if (keyword) {
                url.searchParams.set("keyword", keyword);
               
            }
           else{
                url.searchParams.delete("keyword");
               
           }
            window.location.href =url.href;
   });

}
// button phan trang
const buttonpagination = document.querySelectorAll("[button-pagination]");
 if(buttonpagination){
    let url = new URL(window.location.href);
   buttonpagination.forEach(button =>{
    button.addEventListener("click",()=>{
     const page =button.getAttribute("button-pagination");
    url.searchParams.set("page", page);
   window.location.href =url.href;
});

   });
 }
 //Show alert thong bao
 const showalert = document.querySelector("[show-alert]");
 if(showalert){
      const time = parseInt(showalert.getAttribute("data-time"));
      const closealert = showalert.querySelector("[close-alert]");
     setTimeout(()=>{
        showalert.classList.add("alert-hidden");
     },time );
     closealert.addEventListener("click",()=>{
        showalert.classList.add("alert-hidden");
     })
 }
 //preview upload anh
 const uploadpreview = document.querySelector("[upload-image]");
 if(uploadpreview){
    const uploadimageinput = document.querySelector("[upload-image-input]");
    const uploadimagepreview = document.querySelector("[upload-image-preview]");
    const removeBtn = document.getElementById("remove-image-btn");

    uploadimageinput.addEventListener("change",(e)=>{
       const file =e.target.files[0];
       if(file){
         uploadimagepreview.src= URL.createObjectURL(file);
         uploadimagepreview.style.display = "block";
         removeBtn.style.display = "block";
       }
    });
    removeBtn.addEventListener("click", () => {
    uploadimagepreview.src = "";
    uploadimagepreview.style.display = "none";
    removeBtn.style.display = "none";
    uploadimageinput.value = ""; // Xóa file trong input
  });
 }