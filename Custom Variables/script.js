
document.addEventListener("DOMContentLoaded",()=>{

    const darkMode=document.getElementById("dark-switch");
    const lightMode=document.getElementById("light-switch");

    function applyLightStyles(){
        if(document.documentElement.classList.contains("darkStyles")){
            document.documentElement.classList.remove("darkStyles");
        }
        document.documentElement.classList.toggle("lightStyles");
    }
    function applyDarkStyles(){
        if(document.documentElement.classList.contains("lightStyles")){
            document.documentElement.classList.remove("lightStyles");
        }
        document.documentElement.classList.toggle("darkStyles");
    }
    darkMode.addEventListener("click",applyDarkStyles);
    lightMode.addEventListener("click",applyLightStyles);
})