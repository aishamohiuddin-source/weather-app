const apiKey = "50b421d4a765aa82039d19a3fdc7092a";

// Search Button
document.getElementById("searchBtn").addEventListener("click", getWeather);

// Enter Key
document.getElementById("cityInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        getWeather();
    }
});

// Location Button
document.getElementById("locationBtn").addEventListener("click", getLocation);

// ===============================
// Search Weather
// ===============================

async function getWeather() {

    const cityName = document.getElementById("cityInput").value.trim();

    if (!cityName) {
        alert("Please enter city name");
        return;
    }

    try {

        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
        );

        const data = await res.json();

        if (data.cod != 200) {
            alert("City not found");
            return;
        }

        showWeather(data);
        getForecast(cityName);
        getHourly(cityName);

    } catch (error) {
        console.log(error);
        alert("Something went wrong");
    }
}

// ===============================
// Show Weather
// ===============================

function showWeather(data) {

    document.getElementById("city").innerText =
        `${data.name}, ${data.sys.country}`;

    document.getElementById("temperature").innerText =
        `${Math.round(data.main.temp)}°C`;

    document.getElementById("description").innerText =
        data.weather[0].description;

    document.getElementById("feelsLike").innerText =
        `${Math.round(data.main.feels_like)}°C`;

    document.getElementById("humidity").innerText =
        `${data.main.humidity}%`;

    document.getElementById("wind").innerText =
        `${data.wind.speed} km/h`;

    document.getElementById("pressure").innerText =
        `${data.main.pressure} hPa`;

    document.getElementById("visibility").innerText =
        `${data.visibility / 1000} km`;

    document.getElementById("maxTemp").innerText =
        `H: ${Math.round(data.main.temp_max)}°`;

    document.getElementById("minTemp").innerText =
        `L: ${Math.round(data.main.temp_min)}°`;

    document.getElementById("weatherIcon").src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    changeBackground(data.weather[0].main);
}

// ===============================
// Background
// ===============================

function changeBackground(weather) {

    if (weather === "Clear") {
        document.body.style.background = "linear-gradient(135deg,#f6d365,#fda085)";
    } else if (weather === "Clouds") {
        document.body.style.background = "linear-gradient(135deg,#757f9a,#d7dde8)";
    } else if (weather === "Rain") {
        document.body.style.background = "linear-gradient(135deg,#4facfe,#00f2fe)";
    } else if (weather === "Snow") {
        document.body.style.background = "linear-gradient(135deg,#e6dada,#274046)";
    } else {
        document.body.style.background = "linear-gradient(135deg,#0f2027,#203a43)";
    }
}

// ===============================
// Location
// ===============================

function getLocation() {

    navigator.geolocation.getCurrentPosition(async (position) => {

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );

        const data = await res.json();

        showWeather(data);
        getForecast(data.name);
        getHourly(data.name);

    }, () => {

        alert("Location permission denied");

    });

}

// ===============================
// Weekly Forecast
// ===============================

async function getForecast(city) {

    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = await res.json();

    const forecast = document.getElementById("weeklyForecast");

    forecast.innerHTML = "";

    for (let i = 0; i < data.list.length; i += 8) {

        const item = data.list[i];

        const day = new Date(item.dt_txt).toLocaleDateString("en-US", {
            weekday: "short"
        });

        forecast.innerHTML += `
        <div class="forecast-card">
            <h3>${day}</h3>
            <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png">
            <p>${Math.round(item.main.temp)}°C</p>
        </div>
        `;
    }
}

// ===============================
// Hourly Forecast
// ===============================

async function getHourly(city) {

    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = await res.json();

    const hourly = document.getElementById("hourlyForecast");

    hourly.innerHTML = "";

    for (let i = 0; i < 8; i++) {

        const item = data.list[i];

        const time = item.dt_txt.split(" ")[1].slice(0, 5);

        hourly.innerHTML += `
        <div class="hour-card">
            <h3>${time}</h3>
            <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png">
            <p>${Math.round(item.main.temp)}°C</p>
        </div>
        `;
    }
}