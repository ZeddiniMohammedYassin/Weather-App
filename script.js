// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", () => {
// API key and URL for fetching weather data
const apikey="31f6216a7a608d5d97929deed790abf4" ;
const apiurl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=" ;
// DOM elements
const searchBtn = document.querySelector(".search button");
const searchBox = document.querySelector(".search input");
const weathericon = document.querySelector(".weather-icon");

// Function to fetch location based on user's IP address
async function fetchText(){
    // Fetch location data from ipinfo.io
    let url='https://ipinfo.io/json?token=85ee9271d4c014' ;
    let response = await fetch(url);
    let data = await response.json() ;
    document.querySelector(".search input").value = data.city ;
    // Call the checkweather function with the user's city
    checkweather(data.city) ;

}
// Call fetchText function to set the default city based on user's location
fetchText();

// Function to fetch and display weather data for a given city
async function checkweather(city)
{
    // Fetch weather data from the OpenWeatherMap API
    const response = await fetch(apiurl + city +`&appid=${apikey}`) ;
    var data = await response.json();
    // Update DOM elements with weather data
    document.querySelector(".city").innerHTML=data.name;
    document.querySelector(".wind").innerHTML=data.wind.speed +"km/h" ;
    document.querySelector(".humidity").innerHTML=data.main.humidity +"%" ;
    document.querySelector(".temp").innerHTML=Math.round(data.main.temp) +"°c" ;
    // Get weather condition and set corresponding weather icon
    let condition=data.weather[0].main ;
    weathericon.src="images/"+condition.toLowerCase()+".png" ;
    
}

// Event listener for the search button to fetch weather data for the entered city
searchBtn.addEventListener("click", ()=>{
    checkweather(searchBox.value);
    
});   

// Event listener for the search input field to fetch weather data when Enter key is pressed
searchBox.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
        checkweather(searchBox.value);
    }
});
})




