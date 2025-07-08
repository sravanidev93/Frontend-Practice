
document.addEventListener("DOMContentLoaded", () => {
    const minutesHand = document.getElementById("minute");
    const hoursHand = document.getElementById("hour");
    const secondsdHand = document.getElementById("second");
    const setTime = () => {
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const second = now.getSeconds();
        const minuteRotation = (minute / 60) * 360;
        const hourRotation = (hour / 12) * 360;
        const secondRotation = (second / 60) * 360;

        minutesHand.style.transform="rotate("+minuteRotation+"deg)";
        hoursHand.style.transform="rotate("+hourRotation+"deg)";
        secondsdHand.style.transform="rotate("+secondRotation+"deg)";

    }
const setIntervalId=setInterval(setTime,1000);
})