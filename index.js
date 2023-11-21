function refreshWeather(response) {
  let temperatureElement = document.querySelector("#real-temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let feelslikeElement = document.querySelector("#feelslike-temperature");
  let iconElement = document.querySelector("#icon");
  let pressureElement = document.querySelector("#pressure");


  temperatureElement.innerHTML = Math.round(temperature);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
  timeElement.innerHTML = formatDate(date);
  feelslikeElement.innerHTML = Math.round(response.data.temperature.feels_like);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-emoji">`;
  pressureElement.innerHTML = `${response.data.temperature.pressure}hPa`;

}

function formatDate(date) {
  let Date = date.getDate();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesay",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
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

  let month = months[date.getMonth()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${month} ${Date}, ${hour}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "0028ba044ca06fc2b3teda9ee7f81ob0";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Montreal");
