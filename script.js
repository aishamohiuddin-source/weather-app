const apiKey = "50b421d4a765aa82039d19a3fdc7092a";

async function getWeather() {
  const city = document.getElementById("city").value;
  const card = document.getElementById("weather-card");

  if (!city) {
    card.innerHTML = "❌ Please enter city or country";
    return;
  }

  card.innerHTML = "⏳ Loading...";

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!res.ok) throw new Error();

    const data = await res.json();

    const icon = data.weather[0].icon;

    card.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" />

      <h1>${data.main.temp}°C</h1>
      <p>${data.weather[0].description}</p>

      <p>🤒 Feels Like: ${data.main.feels_like}°C</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>🌬 Wind: ${data.wind.speed} m/s</p>
      <p>🌡 Max: ${data.main.temp_max}°C | Min: ${data.main.temp_min}°C</p>
    `;
  } catch (error) {
    card.innerHTML = "❌ City not found";
  }
}