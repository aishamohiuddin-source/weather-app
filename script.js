const apiKey = "50b421d4a765aa82039d19a3fdc7092a";

function getWeather() {
  let city = document.getElementById("search").value;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => showData(data));
}

function showData(data) {
  document.getElementById("city").innerText = data.name;
  document.getElementById("temp").innerText = Math.round(data.main.temp) + "°C";
  document.getElementById("desc").innerText = data.weather[0].main;

  document.getElementById("humidity").innerText = data.main.humidity;
  document.getElementById("wind").innerText = data.wind.speed;
  document.getElementById("feels").innerText = data.main.feels_like;

  let icon = data.weather[0].icon;
  document.getElementById("icon").src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
}
function getLocation() {
  navigator.geolocation.getCurrentPosition(position => {

    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
      .then(res => res.json())
      .then(data => showData(data));
  });
}