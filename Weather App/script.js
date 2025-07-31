
document.addEventListener("DOMContentLoaded",()=>{

    const API_KEY = "5c783b9970f6e6524c954fe13de587b5";

//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const API_URL = "https://api.openweathermap.org/data/2.5/weather";

// api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

const FIVE_DAY_THREE_HOUR = "https://api.openweathermap.org/data/2.5/forecast";

const formatTemperature = (temperature) => `${temperature.toFixed(1)}°C`;
const getDayName = (dateValue) => {
    const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return new Date(dateValue).getDay() === (new Date).getDay() ? "Today" : DAYS[new Date(dateValue).getDay()];
}

getDayName("2024-08-17");

// console.log(getDayName("2024-08-17"))

function getIconImage(code) {
    return `https://openweathermap.org/img/wn/${code}@2x.png`;
}

function formatTime(dateTime) {
    let timePart = dateTime.split(" ")[1];
    let time = timePart.split(":");
    return `${time[0]}:${time[1]}`;
}

async function getCurrentForecastData(city_name) {

    let response = await fetch(`${API_URL}?q=${city_name}&appid=${API_KEY}&units=metric`);

    const weatherData = await response.json();
    return weatherData;
}

async function getHourlyForecast(city_name) {
    const response = await fetch(`${FIVE_DAY_THREE_HOUR}?q=${city_name}&appid=${API_KEY}&units=metric`);
    let hourlyData = await response.json();
    return hourlyData;

}

async function buildCurrentForecast(cityName) {
    const CURRENT_WEATHER_DATA = await getCurrentForecastData(cityName);

    // console.log(CURRENT_WEATHER_DATA);

    let { name, main: { temp, temp_min, temp_max, feels_like: feels_like_value, humidity: humidityValue }, weather: [{ description, icon }] } = CURRENT_WEATHER_DATA;

    //     <section id="current-forecast">
    //     <article class="current-data">
    //         <h2 id="city-name">City Name</h2>
    //         <p id="current-Temp">35 C</p>
    //         <p id="description">Description</p>
    //         <img src="" id="current-forecast-icon">
    //         <p id="min-max-temp">HIgn Temp Low Temp</p>
    //     </article>
    // </section>


    const currentForecastContainer = document.getElementById("current-forecast");

    currentForecastContainer.innerHTML="";

    const currentForecast = document.createElement("section");

    currentForecast.classList.add("current-data");

    const CITY_NAME = document.createElement("h2");
    CITY_NAME.innerText = name;

    const CURRENT_TEMP = document.createElement("p");
    CURRENT_TEMP.innerText = formatTemperature(temp);
    CURRENT_TEMP.setAttribute("id", "current-temp");


    const iconDescription = document.createElement("section");
    iconDescription.classList.add('icon-description');

    const currentForecastIcon = document.createElement("img");
    currentForecast.classList.add("icon");
    currentForecastIcon.src = getIconImage(icon);

    const DESCRIPTION = document.createElement("p");
    DESCRIPTION.style.textTransform = "Capitalize";
    DESCRIPTION.innerText = description;



    iconDescription.append(currentForecastIcon, DESCRIPTION);

    const minMaxTemp = document.createElement("article");

    minMaxTemp.classList.add("CurrentMinMax");

    const maxTemp = document.createElement("p");

    maxTemp.innerText = `H: ${formatTemperature(temp_max)}`;

    const minTemp = document.createElement("p");

    minTemp.innerText = `L: ${formatTemperature(temp_min)}`;
    minTemp.classList.add("min-Temp");

    minMaxTemp.append(maxTemp, minTemp);


    currentForecast.append(CITY_NAME, CURRENT_TEMP, iconDescription, minMaxTemp);

    currentForecastContainer.appendChild(currentForecast);

    const humidity = document.getElementById("humidity-value");
    humidity.innerHTML="";

    const humidityElement = document.createElement("p");

    humidityElement.innerText = formatTemperature(humidityValue);
    humidity.append(humidityElement)

    const FEELS_LIKE_CONTAINER = document.getElementById("feelsLikeValue");
    FEELS_LIKE_CONTAINER.innerHTML="";
    const feelsLikeElement = document.createElement("p");
    feelsLikeElement.innerText = `${feels_like_value}%`;

    FEELS_LIKE_CONTAINER.appendChild(feelsLikeElement);
}

// buildCurrentForecast();


function createSixDayForecast(HOURLY_FORECAST) {
    const FILTERED_SIX_DAY = Object.groupBy(HOURLY_FORECAST, (forecast) => getDayName((forecast.dt_txt).split(" ")[0]));
    // console.log(FILTERED_SIX_DAY);

    const SIXDAY_CONTAINER = document.getElementById("sixday-forecast");
    SIXDAY_CONTAINER.innerHTML="";

    for (const day in FILTERED_SIX_DAY) {
        // console.log(FILTERED_SIX_DAY[day]);

        // console.log(day)

        const DAY_DATA = FILTERED_SIX_DAY[day];
        const TEMP_MIN = formatTemperature(Math.min(...Array.from(DAY_DATA, ({ main: { temp_min } }) => { return temp_min })));
        // console.log(day, TEMP_MIN);

        const TEMP_MAX = formatTemperature(Math.max(...Array.from(DAY_DATA, ({ main: { temp_max } }) => { return temp_max })));
        // console.log(day, TEMP_MAX);

        const { weather: [{ icon }] } = DAY_DATA[1];

        // console.log(getIconImage(icon));

        const SIXDAY_DATA = document.createElement("section");

        SIXDAY_DATA.classList.add("sixday-data");

        const heading = document.createElement("h2");
        heading.innerText = day;

        const image = document.createElement("img");
        image.src = getIconImage(icon);
        image.classList.add("icon")

        const minTemp = document.createElement("p");
        minTemp.innerText = TEMP_MIN;
        minTemp.classList.add("min-temp")

        const maxTemp = document.createElement("p");
        maxTemp.innerText = TEMP_MAX;

        SIXDAY_DATA.append(heading, image, minTemp, maxTemp);
        SIXDAY_CONTAINER.appendChild(SIXDAY_DATA);


        //     <section id="sixday-forecast">
        // <h2>Fiveday Forecast</h2>
        // <section class="sixday-data">
        //     <h3>day</h3>
        //     <img src="" alt="icon">
        //     <p class="min-temp">min temp</p>
        //     <p class="max-temp">max temp</p>
        // </section>


    }

}


async function buildHourlyForecast(cityName) {
    const HOURLY_FORECAST = await getHourlyForecast(cityName);

    console.log(HOURLY_FORECAST.list);


    //     <section id="hourly-forecast">
    //     <h2>Hourly Forecast</h2>

    //     <div id="hourly-data">
    //         <div class="hourly">
    //             <h3>Time</h3>
    //             <img src="" alt="icon">
    //             <p>Temp</p>
    //         </div>


    //         <div class="hourly">
    //             <h3>Time</h3>
    //             <img src="" alt="icon">
    //             <p>Temp</p>
    //         </div>
    //     </div>

    // </section>
    const HOURLY_DATA = document.getElementById("hourly-data");
    HOURLY_DATA.innerHTML="";


    (HOURLY_FORECAST.list).map((data) => {
        let { dt_txt: date, main: { temp }, weather: [{ icon }] } = data;
        // console.log(formatTime(date), formatTemperature(temp), getIconImage(icon));

        const HOURLY_INFO = document.createElement("div");
        HOURLY_INFO.classList.add("hourly");

        const heading = document.createElement("h2");
        heading.innerText = formatTime(date);

        const image = document.createElement("img");
        image.src = getIconImage(icon);
        image.classList.add("icon");

        const temperature = document.createElement("p");
        temperature.innerText = formatTemperature(temp);

        HOURLY_INFO.append(heading, image, temperature);

        HOURLY_DATA.appendChild(HOURLY_INFO);



    });
    // createSixDayForecast(HOURLY_FORECAST.list);
    return HOURLY_FORECAST.list;


}

// buildHourlyForecast()




function debounce(func,timeout=900){
    let timer;
    return (...args)=>{
        clearTimeout(timer);
        timer=setTimeout(()=>{
            func.apply(this,args)
        },timeout)
    }
}
const searchElement=document.getElementById("search");

console.log(searchElement)

const datalistOptions=document.getElementById("input-options");

const debounceSearch=debounce((event)=>onInput(event),1500);


const getGeographCityData=async(cityName)=>{
    const API_KEY = "5c783b9970f6e6524c954fe13de587b5";

    const response=await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${API_KEY}`);
    let data=await response.json();
    return data;

}


const onInput=async(event)=>{
    let cityName=event.target.value;
    const response=await getGeographCityData(cityName);
    console.log(response);

    let options="";

    for({lat,lon,country,name,state} of response ){
        options+=`<option data-coords=${JSON.stringify({lat},{lon})} value="${name},${state},${country}"><option>`
    }
    // console.log(options);
    datalistOptions.innerHTML=options;

}

async function buildForecast(cityName){
    await buildCurrentForecast(cityName);
    const SIXDAY_DATA=await buildHourlyForecast(cityName);
    createSixDayForecast(SIXDAY_DATA);
}

const onSelect=(event)=>{
    console.log(event.target.value);
    let selectedValue=event.target.value;
    let cityName=selectedValue.split(",")[0];
    console.log(cityName);
    buildForecast(cityName)

}

searchElement.addEventListener("input",debounceSearch);

searchElement.addEventListener("change",onSelect);

// searchElement.addEventListener("change")


})

