const apiKey = "50b421d4a765aa82039d19a3fdc7092a";

// AUTO LOCATION
function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );

      const data = await res.json();
      displayWeather(data);
      changeBackground(data.weather[0].main);
    });
  }
}

window.onload = getLocationWeather;

// SEARCH WEATHER
async function getWeather() {
  const city = document.getElementById("city").value;
  const card = document.getElementById("weather-card");

  if (!city) {
    card.innerHTML = "❌ Enter city or country";
    return;
  }

  card.innerHTML = "⏳ Loading...";

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!res.ok) throw new Error();

    const data = await res.json();

    displayWeather(data);
    changeBackground(data.weather[0].main);
    getForecast(city);

  } catch {
    card.innerHTML = "❌ Not found";
  }
}

// DISPLAY WEATHER
function displayWeather(data) {
  const card = document.getElementById("weather-card");

  const icon = data.weather[0].icon;

  const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
  const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

  card.innerHTML = `
    <div class="top">
      <h2>${data.name}, ${data.sys.country}</h2>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
      <h1>${data.main.temp}°C</h1>
      <p>${data.weather[0].description}</p>
    </div>

    <div class="details">
      <div><span>Feels Like</span><span>${data.main.feels_like}°C</span></div>
      <div><span>Humidity</span><span>${data.main.humidity}%</span></div>
      <div><span>Wind</span><span>${data.wind.speed} m/s</span></div>
      <div><span>Pressure</span><span>${data.main.pressure} hPa</span></div>
      <div><span>Sunrise</span><span>${sunrise}</span></div>
      <div><span>Sunset</span><span>${sunset}</span></div>
    </div>
  `;
}

// BACKGROUND CHANGE
function changeBackground(weather) {
  const body = document.body;

  if (weather.includes("Cloud")) {
    body.style.background = "linear-gradient(to right, #bdc3c7, #2c3e50)";
  } 
  else if (weather.includes("Rain")) {
    body.style.background = "linear-gradient(to right, #4e54c8, #8f94fb)";
  } 
  else if (weather.includes("Clear")) {
    body.style.background = "linear-gradient(to right, #f7971e, #ffd200)";
  } 
  else {
    body.style.background = "linear-gradient(to right, #4facfe, #00f2fe)";
  }
}

// FORECAST
async function getForecast(city) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
  );

  const data = await res.json();

  let html = "<h3>5-Day Forecast</h3>";

  data.list.slice(0, 5).forEach(item => {
    html += `
      <p>${item.dt_txt} - 🌡 ${item.main.temp}°C - ${item.weather[0].main}</p>
    `;
  });

  document.getElementById("weather-card").innerHTML += html;
}

document.getElementById("city").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    getWeather();
  }
});