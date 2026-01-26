const API_KEY = "45a5c701216211ef7aa04bba55f8c71b";

const ENDPOINTS = {
    API_URL: "https://api.openweathermap.org/data/2.5/weather",
    HOURLY_URL: "https://api.openweathermap.org/data/2.5/forecast"
    // api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
}

const formatTime = (dateTimeString) => {
    let timeString = dateTimeString.split(" ")[1];
    let sepTime=timeString.split(":")[0];

    let time=parseInt(sepTime,10);
    let result;
    if (time==12){
        result=time+"PM"
    }else{
            result=(time<=12)?time+"AM":(time-12)+"PM"


    }
    
    
    return result ;
}

const formatTemperature = (tempVal) => `${tempVal.toFixed(1)}°C`;

const getImage = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`;

https://api.openweathermap.org/data/2.5/weather?q=madanapalle&appid=45a5c701216211ef7aa04bba55f8c71b&units=metric


document.addEventListener("DOMContentLoaded", () => {

    // const container = document.getElementById("container");
    const currentSection = document.getElementById("current-forecast");
    const hourlyContainer = document.querySelector(".hourly-forecast-container");

    const getCurrentForecast = async (cityName) => {
        const response = await fetch(`${ENDPOINTS.API_URL}?q=${cityName}&appid=${API_KEY}&units=metric`);
        console.log(`${ENDPOINTS.API_URL}?q=${cityName}&appid=${API_KEY}&units=metric`)
        const data = await response.json();
        return data;

    }

    const buildCurrentForecast = (data) => {
        const { name, main: { temp, temp_min: low, temp_max: high }, weather: [{ description: desc, icon }] } = data;
        console.log(name, low, high, desc, icon);

        const currentForecast = document.createElement("article");
        //  <article id="current-forecast">
        //     <h1>City Name</h1>
        //     <p class="temperature">temperature</p>
        //     <p class="description">description</p>
        //     <p class="min-max">Min Max temperatures</p>
        // </article>
        const heading = document.createElement("h1");
        heading.innerText = name;

        const temperature = document.createElement("p");
        temperature.classList.add("temperature");
        temperature.innerText = formatTemperature(temp);

        const description = document.createElement("p");
        description.classList.add("description");
        description.innerText = desc;
        console.log(getImage(icon));

        const minMaxTemp = document.createElement("p");
        minMaxTemp.classList.add("minmax");
        minMaxTemp.innerText = `H:${formatTemperature(high)} L:${formatTemperature(low)}`;

        currentForecast.append(heading, temperature, description, minMaxTemp);

        currentSection.appendChild(currentForecast);

    }

    const buildHourlyForecast = async (data) => {
        const data12Hour = data.splice(1, 13);

        //<article id="hourly-forecast">
        //     <section class="hourly-forecast-container">
        //         <h1>hourly-forecast-container</h1>
        //         <article class="hourly-info">
        //             <h2 class="hourly-time">Time</h1>
        //             <p class="hourly-icon">icon</p>
        //             <p class="hourly-temp">temperature</p>
        //         </article>
        //     </section>
        // </article>

        for ({ icon, temp, dt_txt } of data12Hour) {

            const hourly = document.createElement("article");
            hourly.classList.add("hourly-info");

            const hourlyTime = document.createElement("h1");
            hourlyTime.classList.add("hourly-time");
            hourlyTime.innerText = formatTime(dt_txt);
            console.log(formatTime(dt_txt))

            const hourlyImage = document.createElement("img");
            hourlyImage.classList.add("hourly-icon");
            hourlyImage.src = getImage(icon);

            const hourlyTemp = document.createElement("p");
            hourlyTemp.classList.add("hourly-temp");
            hourlyTemp.innerText = formatTemperature(temp);
            // console.log(hourlyTemp, hourlyImage, hourlyTemp)


            hourly.append(hourlyTime, hourlyImage, hourlyTemp);
            hourlyContainer.appendChild(hourly);


        }

        // console.log(hourlyContainer, hourly)



    }

    const getHourlyForecast = async (cityName) => {
        const response = await fetch(`${ENDPOINTS.HOURLY_URL}?q=${cityName}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        return data.list.map((forecast) => {
            const { main: { temp }, weather: [{ icon }], dt_txt } = forecast;
            return { icon, temp, dt_txt };
        })
    }

    const loadData = async () => {
        const currentData = await getCurrentForecast("madanapalle");
        console.log(currentData);
        buildCurrentForecast(currentData)
        const hourlydata = await getHourlyForecast("madanapalle");
        // console.log(hourlydata);

        buildHourlyForecast(hourlydata);


    };

    loadData();

})