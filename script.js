const API_KEY = "50b421d4a765aa82039d19a3fdc7092a";

// Default city
const CITY = "Lahore";

// ----------------------------

const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const weatherIcon = document.getElementById("weatherIcon");

const highTemp = document.getElementById("highTemp");
const lowTemp = document.getElementById("lowTemp");

const morningTemp = document.getElementById("morningTemp");
const afternoonTemp = document.getElementById("afternoonTemp");
const eveningTemp = document.getElementById("eveningTemp");
const nightTemp = document.getElementById("nightTemp");

// ----------------------------
// Time & Date
// ----------------------------

function updateClock() {

    const now = new Date();

    document.getElementById("time").innerHTML =
        now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });

    document.getElementById("day").innerHTML =
        now.toLocaleDateString([], {
            weekday: "long"
        });

    document.getElementById("date").innerHTML =
        now.toLocaleDateString([], {
            month: "long",
            day: "numeric"
        });

}

updateClock();

setInterval(updateClock,1000);

// ----------------------------
// Current Weather
// ----------------------------

async function loadWeather(){

    try{

        const url =
`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${API_KEY}`;

        const response = await fetch(url);

        const data = await response.json();

        temperature.innerHTML =
        Math.round(data.main.temp)+"°C";

        description.innerHTML =
        data.weather[0].main;

        highTemp.innerHTML =
        Math.round(data.main.temp_max)+"°";

        lowTemp.innerHTML =
        Math.round(data.main.temp_min)+"°";

        weatherIcon.src =
`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    }

    catch(error){

        console.log(error);

    }

}

loadWeather();

// ----------------------------
// Demo values
// (Replace later with Forecast API)
// ----------------------------

morningTemp.innerHTML="17°";
afternoonTemp.innerHTML="21°";
eveningTemp.innerHTML="19°";
nightTemp.innerHTML="13°";