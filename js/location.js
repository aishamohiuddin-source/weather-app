const locationBtn = document.getElementById("locationBtn");

locationBtn.addEventListener("click", () => {

    navigator.geolocation.getCurrentPosition(success, error);

});

function success(position){

    const lat = position.coords.latitude;

    const lon = position.coords.longitude;

    getWeatherByCoords(lat, lon);

}

function error(){

    alert("Location Permission Denied");

}

async function getWeatherByCoords(lat, lon){

const url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

const res=await fetch(url);

const data=await res.json();

updateUI(data);

}