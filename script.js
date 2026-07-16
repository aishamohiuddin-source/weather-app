const apiKey = "50b421d4a765aa82039d19a3fdc7092a";


// ===============================
// Search Weather
// ===============================

async function getWeather(){

    const cityInput = document.getElementById("cityInput");
    const cityName = cityInput.value.trim();


    if(cityName === ""){
        alert("Please enter city name");
        return;
    }


    try{

        const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
        );


        const data = await res.json();


        if(data.cod !== 200){
            alert("City not found");
            return;
        }


        showWeather(data);

        getForecast(cityName);

        getHourly(cityName);


    }

    catch(error){

        alert("Something went wrong");

    }

}



// ===============================
// Show Current Weather
// ===============================

function showWeather(data){


document.getElementById("city").innerText =
`${data.name}, ${data.sys.country}`;


document.getElementById("temp").innerText =
Math.round(data.main.temp);


document.getElementById("desc").innerText =
data.weather[0].description;


document.getElementById("humidity").innerText =
data.main.humidity + "%";


document.getElementById("wind").innerText =
data.wind.speed + " km/h";


document.getElementById("feels").innerText =
Math.round(data.main.feels_like) + "°C";



const icon = data.weather[0].icon;


document.getElementById("icon").src =
`https://openweathermap.org/img/wn/${icon}@2x.png`;



changeBackground(data.weather[0].main);


}



// ===============================
// Dynamic Background
// ===============================

function changeBackground(weather){


if(weather==="Clear"){

document.body.style.background =
"linear-gradient(135deg,#f6d365,#fda085)";

}


else if(weather==="Clouds"){

document.body.style.background =
"linear-gradient(135deg,#757f9a,#d7dde8)";

}


else if(weather==="Rain"){

document.body.style.background =
"linear-gradient(135deg,#4facfe,#00f2fe)";

}


else if(weather==="Snow"){

document.body.style.background =
"linear-gradient(135deg,#e6dada,#274046)";

}


else{

document.body.style.background =
"linear-gradient(135deg,#0f2027,#203a43)";

}


}




// ===============================
// Auto Location
// ===============================

function getLocation(){


navigator.geolocation.getCurrentPosition(

async(position)=>{


const lat = position.coords.latitude;

const lon = position.coords.longitude;



const res = await fetch(

`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`

);



const data = await res.json();



showWeather(data);


getForecast(data.name);

getHourly(data.name);



},


()=>{

alert("Location permission denied");

}


);


}





// ===============================
// 5 Day Forecast
// ===============================


async function getForecast(city){


const res = await fetch(

`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`

);



const data = await res.json();



const forecast =
document.getElementById("forecast");



forecast.innerHTML="";



for(let i=0;i<data.list.length;i+=8){


const item=data.list[i];


const date =
new Date(item.dt_txt);



const day =
date.toLocaleDateString(
"en-US",
{
weekday:"short"
}
);



const card = `

<div class="forecast-card">

<h3>${day}</h3>

<img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png">

<p>${Math.round(item.main.temp)}°C</p>

</div>

`;



forecast.innerHTML += card;


}


}





// ===============================
// Hourly Forecast
// ===============================


async function getHourly(city){


const res = await fetch(

`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`

);



const data = await res.json();



const hourly =
document.getElementById("hourly");



hourly.innerHTML="";



for(let i=0;i<8;i++){


const item=data.list[i];



const time =
item.dt_txt.split(" ")[1].slice(0,5);



const card = `


<div class="hour-card">


<h3>${time}</h3>


<img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png">


<p>${Math.round(item.main.temp)}°C</p>


</div>


`;



hourly.innerHTML += card;


}

}