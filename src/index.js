function formatDate(time) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let date = now.getDate();
  let day = days[now.getDay()];
  let month = months[now.getMonth()];

  return `${hours}:${minutes} ${day}, ${month} ${date}`;
}

let now = new Date();
let currentTime = document.querySelector(".current-date");
currentTime.innerHTML = formatDate(now);

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col-2">
                <div class="weather-forecast-date">${formatForecastDay(
                  forecastDay.dt
                )}</div>
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  width="60px"
                />
                <div class="forecast-temperatures">
                  <span class="forecast-temp-max">${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <span class="forecast-temp-min">${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                </div>
              </div>
            `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "c3a1a5230563e615b6290132c320c7ca";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let cityName = document.querySelector("#current-city");
  cityName.innerHTML = response.data.name;

  let cityTodayTemp = document.querySelector("#temperature");
  cityTodayTemp.innerHTML = Math.round(response.data.main.temp);

  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = response.data.weather[0].description;

  let cityTodayHumidity = document.querySelector("#humidity");
  cityTodayHumidity.innerHTML = response.data.main.humidity;

  let cityTodayWind = document.querySelector("#windspeed");
  cityTodayWind.innerHTML = Math.round(response.data.wind.speed);

  let currentWeatherIcon = document.querySelector("#current-weather-icon");
  currentWeatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function search(cityName) {
  let apiKey = "c3a1a5230563e615b6290132c320c7ca";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleCitySearch(event) {
  event.preventDefault();
  let cityName = document.querySelector("#a-city-input").value;
  search(cityName);
}

function searchLocation(position) {
  let apiKey = "c3a1a5230563e615b6290132c320c7ca";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let form = document.querySelector("#search-city-form");
form.addEventListener("submit", handleCitySearch);

let currentButton = document.querySelector("#search-current-location");
currentButton.addEventListener("click", showCurrentLocation);

search("Kyiv");
