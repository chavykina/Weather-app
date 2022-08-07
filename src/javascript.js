function currentDate(date) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let monthname = months[date.getMonth()];
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return monthname + " " + day + ", " + hours + ":" + minutes;
}
let now = new Date();
let currentDay = document.querySelector("#current-date");
currentDay.innerHTML = currentDate(now);

function displayWeather(response) {
  document.querySelector(".main").innerHTML = response.data.name;
  document.querySelector(".scale").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".main1").innerHTML = response.data.weather[0].main;
}
function searchCity(city) {
  let apiKey = "b68e0598b634d70e6e94258486b5b3c9";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}
function citySubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#chooseAcity").value;
  searchCity(city);
}
function showCoords(position) {
  let apiKey = "b68e0598b634d70e6e94258486b5b3c9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function currentCoords(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCoords);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", citySubmit);
let currentButton = document.querySelector(".currentButton");
currentButton.addEventListener("click", currentCoords);

function convertFahrenheit() {
  let apiKey = "b68e0598b634d70e6e94258486b5b3c9";
  let unit = "imperial";
  let city = document.querySelector("#chooseAcity").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}
function fahrenheit(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(convertFahrenheit);
}
function convertCelsius() {
  let apiKey = "b68e0598b634d70e6e94258486b5b3c9";
  let unit = "metric";
  let city = document.querySelector("#chooseAcity").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}
function celsium(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(convertCelsius);
}
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertFahrenheit);

let celsiusLink = document.querySelector("#celsium");
celsiusLink.addEventListener("click", convertCelsius);
function showFahrenheit(position) {
  let apiKey = "b68e0598b634d70e6e94258486b5b3c9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}
