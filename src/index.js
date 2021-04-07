let now = new Date();

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
  "Dec"
];

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let month = months[now.getMonth()];
let day = days[now.getDay()];
let date = now.getDate();
let year = now.getFullYear();

let currentDate = document.querySelector(".dateToday");
currentDate.innerHTML = `${day} ${date}. ${month} ${year}`;

let searchIcon = document.querySelector(".searchIcon");
let searchCity = document.querySelector(".searchBox");

searchIcon.addEventListener("click", cityDisplay);
searchCity.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    cityDisplay();
  }
});

let apiKey = "72bb2a7b73389d4215aec25363ed9079";
let units = "metric";

function cityDisplay(event) {
  let cityName = document.querySelector("h1");
  cityName.innerHTML = `${searchCity.value}`;
  loadAPI(searchCity);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = city;
  let h2 = document.querySelector(".numberTemperature");
  h2.innerHTML = temperature;
  describeWeather(response);
  console.log(response.data);
}

function describeWeather(response) {
  let weatherDescription = response.data.weather[0].description;
  let h3 = document.querySelector("h3");
  h3.innerHTML = weatherDescription;
}

function myLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

navigator.geolocation.getCurrentPosition(myLocation);

function loadAPI(searchCity) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

let button = document.querySelector("button");
button.addEventListener("click", myLocation);
