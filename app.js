//Setting up API call based on https://openweathermap.org/current
const API_= `https://api.openweathermap.org/data/2.5/weather?id=4719457&appid=26d15c5412679ccfa44c9653f8e319a3&units=imperial`;
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_ID = '26d15c5412679ccfa44c9653f8e319a3';
const API_CITY_CODE = '4719457';
const API_UNITS = 'imperial';
const API = `${API_URL}?id=${API_CITY_CODE}&appid=${API_ID}&units=${API_UNITS}`;


//Fetch weather data from API
function getWeatherData(){
    fetch(API)
        .then(data => data.json())
        .then(data => {
            let temp = Math.round(data.main.temp);                        
            let sunrise = data.sys.sunrise;
            let sunset = data.sys.sunset;            
            let weatherIcon = data.weather[0].icon;            
            
            displayWeatherImage(weatherIcon);            
            displayWeatherText(temp, sunrise, sunset);
        })
}


//Translate image code from JSON response to actual image file
function displayWeatherImage(src) {
    let imageSize = '2';   //2x, 4x etc.    
    let imageURL = `http://openweathermap.org/img/wn/${src}@${imageSize}x.png`;

    let weatherIcon = document.querySelector('#weatherIcon');
    weatherIcon.src = imageURL;      
}


//Fill out weather text on the page with the details from the API response
function displayWeatherText(temp, sunrise, sunset) {
    let tempSpan = document.querySelector('#temp');        
    let sunriseSpan = document.querySelector('#sunrise');
    let sunsetSpan = document.querySelector('#sunset');

    tempSpan.textContent = temp;        
    sunriseSpan.textContent = convertTime(sunrise);
    sunsetSpan.textContent = convertTime(sunset);
}


//Convert unix time to regular time
function convertTime(unixTime) {        
    let dateObj = new Date(unixTime * 1000);
    if (dateObj.getHours() < 13) {
        return `${dateObj.getHours()}:${dateObj.getMinutes()}am`
    } else {
        return `${dateObj.getHours()-12}:${dateObj.getMinutes()}pm`
    }     
}


//Display's the current time
function displayTime(){
    let now = new Date();    
    now.setHours(0);
    let timeGreet = '';
    let timeSpan = document.querySelector('#time');
    let timeGreetSpan = document.querySelector('#timeGreet');
    let hour = '';
    let minute = '';

    if(now.getHours() == 0) {
        hour = `12`;
        timeGreet = 'Good morning';
    } else if (now.getHours() < 13) {
        hour = `${now.getHours()}`;
        timeGreet = 'Good morning';
    } else {
        hour = `${now.getHours()-12}`;
        timeGreet = 'Good afternoon';
    }    

    if (now.getMinutes() < 10) {
        minute = `0${now.getMinutes()}`
    } else {
        minute = now.getMinutes()
    }  

    timeSpan.textContent = `${hour}:${minute}`;
    timeGreetSpan.textContent = timeGreet;

}


getWeatherData();
displayTime();

window.setInterval(function(){
    displayTime();
  }, 5000);
