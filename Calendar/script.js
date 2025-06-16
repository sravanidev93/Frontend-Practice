document.addEventListener("DOMContentLoaded",()=>{

    const months=["January","Febrauary","March","April","May","June","July","August","September","October","November","December"]
    const date=new Date();
    const month=document.getElementById("month");
    month.innerText=months[date.getMonth()];
    const todaysDateString=document.getElementById("today");
    todaysDateString.innerText=date.toDateString();
    const lastDateInMonth=new Date(date.getFullYear(),date.getMonth()+1,0).getDate();
    const firstDayInMonth=new Date(date.getFullYear(),date.getMonth(),1).getDay();
    const datesContainer=document.getElementById("dates");

    function entryEmptyDates(){
        for(var i=0;i<firstDayInMonth;i++){
            const date=document.createElement("p");
            date.innerText="";
            date.classList.add("date");
            datesContainer.appendChild(date);
        }
    }

    function datesInMonth(){
        for(var i=1;i<=lastDateInMonth;i++){
            if(i!=date.getDate()){
                const date=document.createElement("p");
                date.innerText=i;
                date.classList.add("date");
                datesContainer.appendChild(date);

            }
            else{
                const date=document.createElement("p");
                date.innerText=i;
                date.classList.add("date");
                date.setAttribute('id','today-date');
                datesContainer.appendChild(date);            }

        }

    }

    function finalEmptyDates(){
        for(var i=1;i<=6;i++){
            const date=document.createElement("p");
            date.innerText="";
            date.classList.add("date");
            datesContainer.appendChild(date);
        }

    }


    entryEmptyDates();
    datesInMonth();
    finalEmptyDates();

})