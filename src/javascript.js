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
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
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
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", citySubmit);
let buttonSearch = document.querySelector("button");
buttonSearch.addEventListener("click", citySubmit);
searchCity("Kharkiv");
