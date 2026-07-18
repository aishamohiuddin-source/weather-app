const API_KEY = "50b421d4a765aa82039d19a3fdc7092a";

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    document.getElementById("loader").classList.remove("hide");
    const response = await fetch(url);

    if (!response.ok) {
        alert("City not found!");
        return;
    }

    const data = await response.json();

    updateUI(data);
    saveRecent(city);
    getHourlyForecast(city);
    getForecast(city);
    let isCelsius = true;

const unitBtn = document.getElementById("unitBtn");

if (unitBtn) {

    unitBtn.addEventListener("click", () => {

        const temp = document.getElementById("temperature");

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
}
