const API_KEY = "45a5c701216211ef7aa04bba55f8c71b";

const ENDPOINTS = {
    API_URL: "https://api.openweathermap.org/data/2.5/weather",
    HOURLY_URL: "https://api.openweathermap.org/data/2.5/forecast",
    // api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
    COORDS_API_URL: "https://api.openweathermap.org/data/2.5/weather",
    Direct_GEOCODING_URL: "http://api.openweathermap.org/geo/1.0/direct"
}

const formatTime = (dateTimeString) => {
    let timeString = dateTimeString.split(" ")[1];
    let sepTime = timeString.split(":")[0];

    let time = parseInt(sepTime, 10);
    let result;
    if (time == 12) {
        result = time + "PM"
    } else if (time == 0) {
        result = "12" + " " + "AM"
    } else {
        result = (time <= 12) ? time + " " + "AM" : (time - 12) + " " + "PM"
    }
    return result;
}

const getDay = (dateString) => {
    const Days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
    const date = new Date(dateString);
    return Days[date.getDay()];
}

// getDay("2026-01-28")

const formatTemperature = (tempVal) => `${tempVal.toFixed(1)}°C`;

const getImage = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`;

// https://api.openweathermap.org/data/2.5/weather?q=madanapalle&appid=45a5c701216211ef7aa04bba55f8c71b&units=metric


document.addEventListener("DOMContentLoaded", () => {
    // const container = document.getElementById("container");
    const currentSection = document.getElementById("current-forecast");
    const hourlyContainer = document.querySelector(".hourly-forecast-container");
    const sixDayContainer = document.getElementById("sixday-forecast");
    const getCurrentForecast = async ({ latitude, longitude }) => {
        let City = "Madanapalle";
        let response;
        if (latitude && longitude) {
            // console.log(latitude,longitude);
            // console.log("calling using latitude and longitude coordinates")
            response = await fetch(`${ENDPOINTS.COORDS_API_URL}?lat=${latitude}&lon=${longitude}&limit=5&appid=${API_KEY}&units=metric`)
        }
        else {
            // console.log(dl);
            response = await fetch(`${ENDPOINTS.API_URL}?q=${City}&appid=${API_KEY}&units=metric`);
        }
        // console.log(`${ENDPOINTS.API_URL}?q=${City}&appid=${API_KEY}&units=metric`)
        const data = await response.json();
        return data;
    }
    const setColor = () => {
        const date = new Date();
        const hour = date.getHours();
        // const hour=18;
        // console.log(hour);
        if (hour < 5 || hour > 18) {
            document.body.classList.add("night");
            document.getElementById("search").classList.add("night");
        } else if (hour > 4 && hour < 10) {
            document.body.classList.add("morning");
        } else if (hour > 8 && hour < 16) {
            document.body.classList.add("afternoon")
        } else if (hour > 15 && hour < 19) {
            document.body.classList.add("evening");
        }
    }
    const buildCurrentForecast = (data) => {
        // console.log(data)
        const { name, main: { temp, temp_min: low, temp_max: high }, sys: { country }, weather: [{ description: desc, icon }] } = data;
        // console.log(name, low, high, desc, icon);
        const currentForecast = document.createElement("article");
        currentSection.innerHTML = "";
        //  <article id="current-forecast">
        //     <h1>City Name</h1>
        //     <p class="temperature">temperature</p>
        //     <p class="description">description</p>
        //     <p class="min-max">Min Max temperatures</p>
        // </article>
        const heading = document.createElement("h1");
        // console.log(`${name},${country}`)
        heading.innerText = `${name},${country}`;
        const temperature = document.createElement("p");
        temperature.classList.add("temperature");
        temperature.innerText = formatTemperature(temp);
        const icondescContainer = document.createElement("section");
        icondescContainer.classList.add("icondescBox");
        const currImage = document.createElement("img");
        currImage.classList.add("current-icon");
        currImage.src = getImage(icon);
        const description = document.createElement("p");
        description.classList.add("description");
        description.innerText = desc;
        // console.log(getImage(icon));
        icondescContainer.append(currImage, description);
        const minMaxTemp = document.createElement("p");
        minMaxTemp.classList.add("minmax");
        minMaxTemp.innerText = `H:${formatTemperature(high)} L:${formatTemperature(low)}`;
        currentForecast.append(heading, temperature, icondescContainer, minMaxTemp);
        currentSection.appendChild(currentForecast);
    }

    const buildHourlyForecast = async (data) => {
        const data12Hour = data.splice(1, 13);
        hourlyContainer.innerHTML = "";
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
            // console.log(formatTime(dt_txt))
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
    const buildSixDayForecast = (hourlydata) => {
        // console.log(hourlydata);
        const sixdayContainer = document.getElementById("sixday-forecast");
        sixDayContainer.innerHTML = "";
        const heading = document.createElement("h1");
        heading.innerText = "Six Day Forecast";
        sixdayContainer.appendChild(heading);
        const sixdayData = Object.groupBy(hourlydata, (forecast) => getDay((forecast.dt_txt).split(" ")[0]))
        // console.log(sixdayData);
        const sixdayForecast = []
        for (day in sixdayData) {
            let dayWiseForecast = {}
            let minTemps = [];
            let maxTemps = [];
            for (forecast of sixdayData[day]) {
                const { main: { temp_min, temp_max } } = forecast;
                minTemps.push(temp_min);
                maxTemps.push(temp_max)
            }
            let minimum = Math.min(...minTemps);
            let maximum = Math.max(...maxTemps);
            const { weather: [{ icon }] } = sixdayData[day][0];
            // console.log(day,minimum,maximum,icon);
            dayWiseForecast.min_temp = minimum;
            dayWiseForecast.max_temp = maximum,
                dayWiseForecast.image_url = getImage(icon);
            sixdayForecast[day] = dayWiseForecast;
        };
        // console.log(sixdayForecast);
        //     <section id="fiveday-forecast-container">
        //         <article class="day-info">
        //             <h2 class="day">Day</h2>
        //             <p class="day-icon">icon</p>
        //             <p class="min-temp">21.3 C</p>
        //             <p class="max-temp">35.6 C</p>

        //         </article>
        //     </section>
        for (day in sixdayForecast) {
            const sixday = document.createElement("article");
            sixday.classList.add("day-info");
            const heading = document.createElement("h2");
            heading.classList.add("day");
            heading.innerText = day;
            const image = document.createElement("img");
            image.classList.add("day-icon");
            image.src = sixdayForecast[day].image_url;
            const minTemperature = document.createElement("p");
            minTemperature.classList.add("min-temp");
            minTemperature.innerText = formatTemperature(sixdayForecast[day].min_temp);
            const maxTemperature = document.createElement("p");
            maxTemperature.classList.add("max-temp");
            maxTemperature.innerText = formatTemperature(sixdayForecast[day].max_temp);
            sixday.append(heading, image, minTemperature, maxTemperature);
            sixdayContainer.appendChild(sixday);
        }
    }

    const buildHumidity = ({ main: { humidity } }) => {
        const element = document.getElementById("humidity-value");
        element.innerText = `${humidity}%`;

    }

    const buildFeelsLike = ({ main: { feels_like } }) => {
        const element = document.getElementById("feelsLike-value");
        element.innerText = formatTemperature(feels_like);
    }

    const getHourlyForecast = async (city) => {
        const data = await getFiveDayForecast(city);
        return data.list.map((forecast) => {
            const { main: { temp }, weather: [{ icon }], dt_txt } = forecast;
            return { icon, temp, dt_txt };
        })
    }

    const getFiveDayForecast = async (cityName) => {
        const response = await fetch(`${ENDPOINTS.HOURLY_URL}?q=${cityName}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        return data;
    }

    const loadData = async (data) => {
        // console.log("in load data", data);
        const currentData = await getCurrentForecast(data);
        // console.log(currentData);
        buildCurrentForecast(currentData)
        const hourlydata = await getHourlyForecast(currentData.name);
        // console.log(hourlydata);
        buildHourlyForecast(hourlydata);
        const fivedayData = await getFiveDayForecast(currentData.name);
        buildSixDayForecast(fivedayData.list);
        buildFeelsLike(currentData);
        buildHumidity(currentData);
    };

    const getCoordsByCityName = async (city) => {
        const response = await fetch(`${ENDPOINTS.Direct_GEOCODING_URL}?q=${city}&limit=5&appid=${API_KEY}`);
        return response.json();
    }

    const onInput = async (event) => {
        // console.log(event.target.value);
        let data = event.target.value;
        const result = await getCoordsByCityName(data);
        // console.log(result);
        const datalist = document.getElementById("cities");
        if (Array.isArray(result)) {
            let options = "";
            for (let { lat: latitude, lon: longitude, name, state, country } of result) {
                console.log(latitude, longitude, name, state, country);
                options += `<option data-coords=${JSON.stringify({ latitude, longitude })} value="${name}, ${state}, ${country}"></option> `
            }
            datalist.innerHTML = options;
        }

    }

    function debounce(func, time = 800) {
        let timer;
        return function (...args) {
            console.log("debounce called", timer)
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, time)
        }
    }

    const onSelect = (event) => {
        // console.log(event);
        const inputValue = event.target.value;
        const options = document.querySelectorAll("datalist option");
        let selectedOption;
        console.log(options);
        for (const option of options) {
            // console.log(option, option.value)
            if (option.value == inputValue) {
                selectedOption = option;
            }
        }
        if (!selectedOption) {
            console.log("failed");
            return
        } else {
            const geoCords = JSON.parse(selectedOption.getAttribute("data-coords"));
            console.log("in select ", geoCords);
            loadData(geoCords);
        }
    }
    const debounceSearch = debounce(event => onInput(event));
    const searchElement = document.getElementById("search");
    searchElement.addEventListener("input", debounceSearch);
    searchElement.addEventListener("change", onSelect);

    function loadDatausingGeolocation() {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            // console.log(latitude, longitude);
            loadData({ latitude, longitude });
        },
            () => {
                alert("failed to fetch");
                loadData({});
            });
    }
    loadDatausingGeolocation();
    setColor();
    // loadData();

})