let recent = JSON.parse(localStorage.getItem("recent")) || [];

function saveRecent(city){

if(!recent.includes(city)){

recent.unshift(city);

}

recent=recent.slice(0,5);

localStorage.setItem("recent",JSON.stringify(recent));

showRecent();

}

function showRecent(){

const box=document.getElementById("recentCities");

box.innerHTML="";

recent.forEach(city=>{

box.innerHTML+=`
<div class="city-chip" onclick="getWeather('${city}')">
${city}
</div>
`;

});

}

showRecent();