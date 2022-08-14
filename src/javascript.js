function currentDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function currentDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayWeather(response) {
  document.querySelector(".main").innerHTML = response.data.name;
  document.querySelector(".scale").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".main1").innerHTML = response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#current-date").innerHTML = currentDate(
    response.data.dt * 1000
  );
  let iconElement = document.querySelector(".sunicon1");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemp = response.data.main.temp;
  document.querySelector(".scale").innerHTML = Math.round(celsiusTemp);
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
function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let tempElement = document.querySelector(".scale");
  tempElement.innerHTML = Math.round(fahrenheitTemp);
  linkCelsius.classList.remove("active");
  linkFahrenheit.classList.add("active");
}
function showCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector(".scale");
  tempElement.innerHTML = Math.round(celsiusTemp);
  linkCelsius.classList.add("active");
  linkFahrenheit.classList.remove("active");
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", citySubmit);
let searchBtn = document.querySelector("button");
searchBtn.addEventListener("click", citySubmit);
searchCity("Kharkiv");
let celsiusTemp = null;
let linkFahrenheit = document.querySelector("#fahrenheit");
linkFahrenheit.addEventListener("click", showFahrenheit);
let linkCelsius = document.querySelector("#celsium");
linkCelsius.addEventListener("click", showCelsius);
