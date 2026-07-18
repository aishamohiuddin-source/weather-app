const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {

    const city = searchInput.value.trim();

    if(city !== ""){
        getWeather(city);
    }

});

searchInput.addEventListener("keypress",(e)=>{

    if(e.key==="Enter"){

        getWeather(searchInput.value.trim());

    }

});