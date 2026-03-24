// const input = document.getElementById("cityInput");
// const button = document.getElementById("searchBtn");
// const result = document.getElementById("result");

const input = document.getElementById("cityInput");
const button = document.getElementById("searchBtn");
const result = document.getElementById("result");

button.addEventListener("click", async function () {
    const city = input.value.trim();

    if (city === "") {
        result.innerHTML = "Введите город";
        return;
    }

    result.innerHTML = "Загрузка...";

    const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=ru&format=json`);
    const geoData = await geoResponse.json();

    if (!geoData.results) {
        result.innerHTML = "Город не найден";
        return;
    }

    const lat = geoData.results[0].latitude;
    const lon = geoData.results[0].longitude;
    const name = geoData.results[0].name;
    const country = geoData.results[0].country;
    const elevation = geoData.results[0].elevation;
   

    const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,relative_humidity_2m`);
    const weatherData = await weatherResponse.json();
    const temp = weatherData.current.temperature_2m;
    result.innerHTML = `
        <div class="card" id="card">
            <h2>${name}, ${country}</h2>
            <p>Широта: ${lat} N, Долгота: ${lon} E</p>
            <p>Температура: ${temp}°C</p>
            <p>Ветер: ${weatherData.current.wind_speed_10m}км/ч</p>
            <p>Влажность: ${weatherData.current.relative_humidity_2m}%</p>
            <p>Высота над уровнем моря: ${elevation}m asl</p>
           
        </div>
    `;
    
    
    const card = document.getElementById("card");
    if (temp < 0){
        card.style.backgroundColor = "#468ddfff";
        card.style.color = "white";
    }
    else if(temp > 0 & temp < 10){
        card.style.backgroundColor = "#46df9fff";
        card.style.color = "white";
    }
    else if(temp > 11 & temp < 20){
        card.style.backgroundColor = "#dfbb46ff";
        card.style.color = "#ffffffff";
    }
    else{
        card.style.backgroundColor = "#e6633cff";
        card.style.color = "white";
    }
});


