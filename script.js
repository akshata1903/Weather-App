const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const weatherIcon = document.querySelector(".weatherIcon i");
const weatherCondition = document.querySelector(".weatherCondition");
const tempElement = document.querySelector(".temperature span");
const loctionElement = document.querySelector(".place");
const dataElement = document.querySelector(".date");

const currentDate = new Date();
const option = { month: "long" };
const monthName = currentDate.toLocaleString("en-US", option);
dataElement.textContent = currentDate.getDate() + "," + monthName;


weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    loctionElement.textContent = "Loading....";
    weatherIcon.className = "";
    tempElement.textContent = "";
    weatherCondition.textContent = "";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + encodeURIComponent(search.value) + '&appid=63ac439234a33885b0f41072c50aaafd';
    showData(url);
});

if("geolocation" in navigator){
    loctionElement.textContent="Loading...";
    navigator.geolocation.getCurrentPosition(function (position){
        const lat = position.coords?.latitude;
        const log = position.coords?.longitude;
        console.log("lat",position);
            const long = position.coords.longitude;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}`+ encodeURIComponent(search.value) + "&appid=63ac439234a33885b0f41072c50aaafd";
            showData(url);
        });
    }else{
        console.error("Geoloction is not available");
    }

function showData(url) {
    getWeatherData(url, (result) => {
        console.log(result);
        if (result.cod == 200) {
            if (result?.weather[0]?.description == "rain" || result.weather[0].description == "fog") {
                weatherIcon.className = "wi wi-day-" + result.weather[0].description;
            }
            else {
                weatherIcon.className = "wi wi-day-cloudy"
            }
            loctionElement.textContent = result?.name;
            tempElement.textContent = (result?.main?.temp - 273.5).toFixed(2) + String.fromCharCode(176);
            tempElement.weatherCondition = result?.weather[0]?.description?.toUpperCase();
        } else {
            loctionElement.textContent = "City not found";
        }
    });
}
function getWeatherData(url, callback) {
    fetch(url).then((response) => {
        response.json().then((date) => {
            callback(date);
        });
    });
}
