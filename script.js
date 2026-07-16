const apiKey = "50b421d4a765aa82039d19a3fdc7092a";

// 🔍 Get Weather by City
async function getWeather() {
  const city = document.getElementById("cityInput").value;

  if (city === "") {
    alert("Please enter a city name");
    return;
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = await res.json();

    if (data.cod !== 200) {
      alert("City not found");
      return;
    }

    showWeather(data);
    getForecast(city);

  } catch (error) {
    alert("Error fetching data");
  }
  getHourly(city);
}


// 🌤 Show Current Weather
function showWeather(data) {
  document.getElementById("city").innerText = data.name;
  document.getElementById("temp").innerText = Math.round(data.main.temp) + "°C";
  document.getElementById("desc").innerText = data.weather[0].description;

  document.getElementById("humidity").innerText = data.main.humidity + "%";
  document.getElementById("wind").innerText = data.wind.speed + " km/h";
  document.getElementById("feels").innerText = Math.round(data.main.feels_like) + "°C";

  const icon = data.weather[0].icon;
  document.getElementById("icon").src =
    `https://openweathermap.org/img/wn/${icon}@2x.png`;
}

const weatherMain = data.weather[0].main;

if (weatherMain === "Clear") {
  document.body.style.background = "linear-gradient(to right, #f7971e, #ffd200)";
}
else if (weatherMain === "Clouds") {
  document.body.style.background = "linear-gradient(to right, #757f9a, #d7dde8)";
}
else if (weatherMain === "Rain") {
  document.body.style.background = "linear-gradient(to right, #373B44, #4286f4)";
}
else if (weatherMain === "Snow") {
  document.body.style.background = "linear-gradient(to right, #e6dada, #274046)";
}
else {
  document.body.style.background = "linear-gradient(to bottom, #0f2027, #203a43, #2c5364)";
}

// 📍 Get Location Weather
function getLocation() {
  navigator.geolocation.getCurrentPosition(async (pos) => {

    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );

    const data = await res.json();

    showWeather(data);
    getForecast(data.name);

  }, () => {
    alert("Location access denied");
  });
  getHourly(data.name);
}

// 📅 5-Day Forecast
async function getForecast(city) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
  );

  const data = await res.json();

  const forecastDiv = document.getElementById("forecast");
  forecastDiv.innerHTML = "";

  for (let i = 0; i < data.list.length; i += 8) {
    const item = data.list[i];

    const date = new Date(item.dt_txt);
    const day = date.toLocaleDateString("en-US", { weekday: "short" });

    const temp = Math.round(item.main.temp);
    const icon = item.weather[0].icon;

    const card = `
      <div>
        <p>${day}</p>
        <img src="https://openweathermap.org/img/wn/${icon}.png"/>
        <p>${temp}°C</p>
      </div>
    `;

    forecastDiv.innerHTML += card;
  }
}

async function getHourly(city) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
  );

  const data = await res.json();

  const hourlyDiv = document.getElementById("hourly");
  hourlyDiv.innerHTML = "";

  // First 8 items = next 24 hours
  for (let i = 0; i < 8; i++) {
    const item = data.list[i];

    const time = item.dt_txt.split(" ")[1].slice(0,5);
    const temp = Math.round(item.main.temp);
    const icon = item.weather[0].icon;

    const card = `
      <div>
        <p>${time}</p>
        <img src="https://openweathermap.org/img/wn/${icon}.png"/>
        <p>${temp}°C</p>
      </div>
    `;

    hourlyDiv.innerHTML += card;
  }
}