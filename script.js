const apiKey = "50b421d4a765aa82039d19a3fdc7092a";

// Weather by city
async function getWeather() {
  const city = document.getElementById("cityInput").value;

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );
  const data = await res.json();

  showWeather(data);
}

// Show data
function showWeather(data) {
  document.getElementById("city").innerText = data.name;
  document.getElementById("temp").innerText = data.main.temp + "°C";
  document.getElementById("desc").innerText = data.weather[0].description;
  document.getElementById("humidity").innerText = data.main.humidity;
  document.getElementById("wind").innerText = data.wind.speed;
  document.getElementById("feels").innerText = data.main.feels_like;

  document.getElementById("icon").src =
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

// Location
function getLocation() {
  navigator.geolocation.getCurrentPosition(async (pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    const data = await res.json();

    showWeather(data);
  });
}