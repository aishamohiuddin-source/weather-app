async function getForecast(city){

const url=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;

const res=await fetch(url);

const data=await res.json();

showForecast(data.list);

}