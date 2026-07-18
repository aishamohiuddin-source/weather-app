// ===============================
// OpenWeather API
// ===============================

const API_KEY = "50b421d4a765aa82039d19a3fdc7092a";

console.log("API_KEY.js loaded successfully");


// ===============================
// Current Weather
// ===============================

async function getWeather(city){

    const loader = document.getElementById("loader");

    if(loader){
        loader.classList.remove("hide");
    }


    try{

        const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;


        const response = await fetch(url);


        if(!response.ok){

            throw new Error("City not found");

        }


        const data = await response.json();


        updateUI(data);


        if(typeof saveRecent === "function"){
            saveRecent(city);
        }


        getHourlyForecast(city);

        getForecast(city);


    }
    catch(error){

        console.log(error);

        alert(error.message);

    }
    finally{

        if(loader){
            loader.classList.add("hide");
        }

    }

}




// ===============================
// Location Weather
// ===============================


async function getWeatherByCoords(lat,lon){


    const loader = document.getElementById("loader");


    if(loader){
        loader.classList.remove("hide");
    }


    try{


        const url =
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;


        const response = await fetch(url);


        const data = await response.json();


        updateUI(data);



    }
    catch(error){

        console.log(error);

        alert("Location weather error");

    }
    finally{

        if(loader){
            loader.classList.add("hide");
        }

    }


}




// ===============================
// Hourly Forecast
// ===============================


async function getHourlyForecast(city){


    try{


        const url =
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;


        const response = await fetch(url);


        const data = await response.json();


        if(typeof showHourly === "function"){

            showHourly(data.list);

        }


    }
    catch(error){

        console.log("Hourly Error:",error);

    }


}




// ===============================
// 5 Day Forecast
// ===============================


async function getForecast(city){


    try{


        const url =
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;


        const response = await fetch(url);


        const data = await response.json();



        if(typeof showForecast === "function"){

            showForecast(data.list);

        }


    }
    catch(error){

        console.log("Forecast Error:",error);

    }


}




// ===============================
// Default City On Start
// ===============================


window.addEventListener("load",()=>{

    getWeather("Lahore");

});