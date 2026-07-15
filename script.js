function getWeather() {
  const city = document.getElementById("city").value;

  document.getElementById("result").innerHTML = `
    <h2>${city}</h2>
    <p>🌡 Temp: 25°C</p>
    <p>☁️ Weather: Clear</p>
  `;
}