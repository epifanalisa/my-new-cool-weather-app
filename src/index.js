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

//week5 challenge 1

function showTemperature(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;

  let cityCurrentTemp = Math.round(response.data.main.temp);
  let cityTodayTemp = document.querySelector("#temperature");
  cityTodayTemp.innerHTML = cityCurrentTemp;

  let cityHumidity = response.data.main.humidity;
  let cityTodayHumidity = document.querySelector("#humidity");
  cityTodayHumidity.innerHTML = cityHumidity;

  let wind = Math.round(response.data.wind.speed);
  let cityTodayWind = document.querySelector("#windspeed");
  cityTodayWind.innerHTML = wind;
}

function searchCity(event) {
  event.preventDefault();

  let cityName = document.querySelector("#a-city-input").value;
  let apiKey = "c3a1a5230563e615b6290132c320c7ca";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
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
form.addEventListener("submit", searchCity);

//Bonus

let currentButton = document.querySelector("#search-current-location");
currentButton.addEventListener("click", showCurrentLocation);
