// =========================
// OpenWeather API Key
// =========================
console.log(API_KEY.js loaded successfully);
const API_KEY = "50b421d4a765aa82039d19a3fdc7092a";

// =========================
// Get Weather By City
// =========================
async function getWeather(city) {

    try {

        const loader = document.getElementById("loader");
        if (loader) loader.classList.remove("hide");

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;

        const response = await fetch(url);

        if (!response.ok) {

            if (loader) loader.classList.add("hide");

            alert("City not found!");

            return;
        }

        const data = await response.json();

        updateUI(data);

        if (typeof saveRecent === "function") {
            saveRecent(city);
        }

        if (typeof getHourlyForecast === "function") {
            getHourlyForecast(city);
        }

        if (typeof getForecast === "function") {
            getForecast(city);
        }

        if (loader) loader.classList.add("hide");

    } catch (error) {

        console.error("Weather Error:", error);

        const loader = document.getElementById("loader");
        if (loader) loader.classList.add("hide");

        alert("Something went wrong. Check Console (F12).");

    }

}

// =========================
// Temperature Toggle
// =========================
let isCelsius = true;

const unitBtn = document.getElementById("unitBtn");

if (unitBtn) {

    unitBtn.addEventListener("click", () => {

        const temp = document.getElementById("temperature");

        if (!temp) return;

        let value = parseInt(temp.innerText);

        if (isCelsius) {

            temp.innerHTML = Math.round((value * 9 / 5) + 32) + "°F";

            unitBtn.innerHTML = "🌡️ °F";

        } else {

            temp.innerHTML = Math.round((value - 32) * 5 / 9) + "°C";

            unitBtn.innerHTML = "🌡️ °C";

        }

        isCelsius = !isCelsius;

    });

}