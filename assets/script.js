
const btnSearch = document.querySelector("button");
btnSearch.addEventListener("click", ()=>{
    
    let city = document.querySelector("input").value;
    if(city != ""){
        getCoords(city);   
    }else{
        alert("vous n'avez rien inserer")
    }
})

async function getCoords(city){
    display = document.querySelector(".display");
    display.innerText="";

    let response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=41106baaf584cd18d9a54f95672bb03d`);
    let data = await response.json();
    let p = Promise.resolve(data);
    p.then(function(d) {
        lat = d[0].lat;
        lon = d[0].lon;
        getWeatherInfo(); 
    }) 
    
}

async function getWeatherInfo(){
    let city = document.querySelector("input").value;
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=41106baaf584cd18d9a54f95672bb03d&lang=fr`);
    let data = await response.json();
    console.log(data);
    let description = data.weather[0].description
    let wind = data.wind.speed;
    let temp = Math.round((data.main.temp) - 273.15);
    // console.log(temp);
    // console.log(wind);
    // console.log(description);

    let display = document.querySelector(".display");
    let title = document.createElement("h2");
    title.innerText = city.toUpperCase();
    display.appendChild(title);

    let temperature = document.createElement("h3");
    temperature.innerText ="Aujourd'hui il fait " + temp + "°";
    display.appendChild(temperature);

    let descriptionW = document.createElement("h3");
    descriptionW.innerText ="C'est plutot " + description;
    display.appendChild(descriptionW);

    let windSpeed = document.createElement("h3");
    windSpeed.innerText ="La vitesse du vent est de "+ wind+"m/s";
    display.appendChild(windSpeed);
} 
