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
  getForecast(response.data.coord);
}
function formatForecast(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector(".footer");
  let forecastHtml = `<div class="footer">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        `
      <div class="forecast-area">
      <div class="forecast-week">
        
           ${formatForecast(forecastDay.dt)}
  
      </div>
      <img
        class="icons"
        src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
        height="25px"
        width="25px"
        alt="sun"
      />
      <div class="forecast-degree">
        <span class="forecast-degree-max">${Math.round(
          forecastDay.temp.max
        )}° </span>
        <span class="forecast-degree-min">${Math.round(
          forecastDay.temp.min
        )}° </span>
      </div>
      </div>
  `;
    }
  });

  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}
function getForecast(coordinates) {
  let apiKey = "b68e0598b634d70e6e94258486b5b3c9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  console.log(apiUrl);
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
searchCity("Kharkiv");
//displayForecast();
