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

function showTemperature(response) {
  let cityName = document.querySelector("#current-city");
  cityName.innerHTML = response.data.name;

  celsiusTemperature = response.data.main.temp;

  let cityCurrentTemp = Math.round(celsiusTemperature);
  let cityTodayTemp = document.querySelector("#temperature");
  cityTodayTemp.innerHTML = cityCurrentTemp;

  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = response.data.weather[0].description;

  let cityHumidity = response.data.main.humidity;
  let cityTodayHumidity = document.querySelector("#humidity");
  cityTodayHumidity.innerHTML = cityHumidity;

  let wind = Math.round(response.data.wind.speed);
  let cityTodayWind = document.querySelector("#windspeed");
  cityTodayWind.innerHTML = wind;

  let currentWeatherIcon = document.querySelector("#current-weather-icon");
  currentWeatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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

function changeToFahrenheit(event) {
  event.preventDefault();
  celsiusUnits.classList.remove("active");
  fahrenheitUnits.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = Math.round(fahrenheitTemperature);
}

function changeToCelsius(event) {
  event.preventDefault();
  celsiusUnits.classList.add("active");
  fahrenheitUnits.classList.remove("active");

  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-city-form");
form.addEventListener("submit", handleCitySearch);

let currentButton = document.querySelector("#search-current-location");
currentButton.addEventListener("click", showCurrentLocation);

let fahrenheitUnits = document.querySelector("#fahrenheit-link");
fahrenheitUnits.addEventListener("click", changeToFahrenheit);

let celsiusUnits = document.querySelector("#celsius-link");
celsiusUnits.addEventListener("click", changeToCelsius);

search("Dnipro");
