

document.addEventListener("DOMContentLoaded",()=>{

    const para=document.getElementById('text');
    const removeBtn=document.getElementById('remove-event');
    const addBtn=document.getElementById('add-event');

    const input=document.getElementById("input-field");

    const pic=document.getElementById("picture");
    const showPic=document.getElementById('show-image');
    const hidePic=document.getElementById("hide-image");

    const picText=document.getElementById("pic-text")

    function addFocus(){
        para.textContent='Input  Element is focused';
        para.style.background='palevioletred';
        para.style.color='green';
    }
    function addBlur(){
        para.textContent='Input element is blurred';
        para.style.background='black';
        para.style.color='white';
    }
    input.addEventListener('focus',addFocus);
    input.addEventListener('blur',addBlur);

    function removeEvents(){
        input.removeEventListener('focus',addFocus);
        input.removeEventListener('blur',addBlur);
        para.style.background='yellow';
        para.style.color='blue';
        para.textContent='Removed all events';
    }

    function addEvents(){
        input.addEventListener('focus',addFocus);
        input.addEventListener('blur',addBlur);
    }

    removeBtn.addEventListener('click',removeEvents);
    addBtn.addEventListener('click',addEvents);

    function setPicture(){
        pic.style.backgroundImage="url('flower-cup.webp')";
        pic.style.objectFit='contain';
        picText.innerText="";

    }
    function removePicture(){
        pic.style.backgroundImage="";
        picText.innerText="Image wad hidden";

    }
    showPic.addEventListener("click",setPicture);
    hidePic.addEventListener("click",removePicture);
})