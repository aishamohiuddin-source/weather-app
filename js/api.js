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
}
let isCelsius = true;

document.getElementById("unitBtn").addEventListener("click",()=>{

const temp=document.getElementById("temperature");

let value=parseInt(temp.innerText);

if(isCelsius){

temp.innerHTML=Math.round((value*9/5)+32)+"°F";

document.getElementById("unitBtn").innerHTML="🌡️ °F";

}else{

temp.innerHTML=Math.round((value-32)*5/9)+"°C";

document.getElementById("unitBtn").innerHTML="🌡️ °C";

}

isCelsius=!isCelsius;

});
