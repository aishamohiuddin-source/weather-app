function updateClock(){

const now=new Date();

document.getElementById("time").innerHTML=

now.toLocaleTimeString([],{

hour:"2-digit",

minute:"2-digit"

});

document.getElementById("dayName").innerHTML=

now.toLocaleDateString("en-US",{

weekday:"long"

});

document.getElementById("date").innerHTML=

now.toLocaleDateString("en-US",{

month:"long",

day:"numeric"

});

}

updateClock();

setInterval(updateClock,1000);
function updateUI(data){

document.getElementById("cityName").innerHTML =
`📍 ${data.name}, ${data.sys.country}`;

document.getElementById("temperature").innerHTML =
Math.round(data.main.temp)+"°C";

document.getElementById("condition").innerHTML =
data.weather[0].main;

document.getElementById("highTemp").innerHTML =
Math.round(data.main.temp_max)+"°";

document.getElementById("lowTemp").innerHTML =
Math.round(data.main.temp_min)+"°";

document.getElementById("feelsLike").innerHTML =
Math.round(data.main.feels_like)+"°";

document.getElementById("weatherIcon").src =
`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

document.getElementById("humidity").innerHTML =
data.main.humidity + "%";

document.getElementById("wind").innerHTML =
Math.round(data.wind.speed * 3.6) + " km/h";

document.getElementById("visibility").innerHTML =
(data.visibility / 1000).toFixed(1) + " km";

document.getElementById("pressure").innerHTML =
data.main.pressure + " hPa";

document.getElementById("sunrise").innerHTML =
new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
});

document.getElementById("sunset").innerHTML =
new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
});
// Hide Loader
document.getElementById("loader").classList.add("hide");

// Dynamic Background
document.body.className = "";

const weather = data.weather[0].main.toLowerCase();

if(weather.includes("clear")){

document.body.classList.add("clear");

clearAnimation();
}

else if(weather.includes("cloud")){

document.body.classList.add("clouds");

clearAnimation();
}

else if(weather.includes("rain")){

document.body.classList.add("rain");

createRain();
}

else if(weather.includes("snow")){

document.body.classList.add("snow");

}

else if(weather.includes("thunder")){

document.body.classList.add("thunderstorm");

clearAnimation();
}

else{

document.body.classList.add("mist");

clearAnimation();
}
}
function showHourly(list){

const container=document.getElementById("hourlyContainer");

container.innerHTML="";

list.slice(0,8).forEach(item=>{

const time=item.dt_txt.split(" ")[1].slice(0,5);

container.innerHTML+=`

<div class="hour-card">

<h3>${time}</h3>

<img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png">

<p>${Math.round(item.main.temp)}°</p>

<small>${item.weather[0].main}</small>

</div>

`;

});

}
function showForecast(list){

const container=document.getElementById("forecastContainer");

container.innerHTML="";

const daily=list.filter(item=>item.dt_txt.includes("12:00:00"));

daily.slice(0,5).forEach(day=>{

const date=new Date(day.dt_txt);

const dayName=date.toLocaleDateString("en-US",{

weekday:"short"

});

container.innerHTML+=`

<div class="forecast-card">

<h3>${dayName}</h3>

<img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png">

<p>${Math.round(day.main.temp)}°C</p>

<small>

H:${Math.round(day.main.temp_max)}°

&nbsp;&nbsp;

L:${Math.round(day.main.temp_min)}°

</small>

</div>

`;

});

}
function clearAnimation(){
    document.getElementById("weatherAnimation").innerHTML="";
}

function createRain(){

    clearAnimation();

    const container=document.getElementById("weatherAnimation");

    for(let i=0;i<120;i++){

        const drop=document.createElement("div");

        drop.className="drop";

        drop.style.left=Math.random()*100+"%";

        drop.style.animationDuration=(Math.random()*1+0.5)+"s";

        drop.style.animationDelay=Math.random()*2+"s";

        container.appendChild(drop);

    }
console.log(app.js Loaded successfully);
}