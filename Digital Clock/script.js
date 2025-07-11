
document.addEventListener("DOMContentLoaded", () => {
    const CurrentDate = document.getElementById("current-date");
    const CurrentTime = document.getElementById("current-time");
    const day = document.getElementById("day");
    const date = new Date();
    const dayIndex = date.getDay();
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    day.innerText = dayNames[dayIndex];
    function formatValue(value) {
        if (String(value).length === 1) {
            return "0" + String(value);
        } else {
            return value;
        }
    }
    function getCurrentTime() {
        const date = new Date();
        const hour = formatValue(date.getHours());
        const minutes = formatValue(date.getMinutes());
        const seconds = formatValue(date.getSeconds());
        const CurrentTimestring = ` ${hour} : ${minutes} : ${seconds}`;
        return CurrentTimestring;
    }

    function getCurrentDate() {
        const date = new Date();
        const CurrentDate = (date.toLocaleDateString()).split("/");
        let CurrentDateString = ""
        CurrentDate.forEach((value) => {
            let formattedValue = formatValue(value);
            CurrentDateString += formattedValue;
            if (CurrentDate.indexOf(value) != 2) {
                CurrentDateString = CurrentDateString + " " 
            }
        })
        return CurrentDateString;
    }
    CurrentDate.innerText = getCurrentDate();
    setInterval((_) => {
        CurrentTime.innerText = getCurrentTime()
    }, 1000);
})

