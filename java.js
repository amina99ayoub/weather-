const API_KEY = "26c8ac3e2da6950b8914f55007dbc9a9"; // Replace with your OpenWeatherMap API key

// Select DOM elements
const searchBar = document.querySelector(".search-bar");
const searchButton = document.querySelector("button");
const weatherContainer = document.querySelector(".weather");

// Event listener for the search button
searchButton.addEventListener("click", () => {
  const city = searchBar.value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    alert("Please enter a city name.");
  }
});

// Fetch weather data from OpenWeatherMap API
async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      displayWeather(data);
    } else {
      alert(data.message); // Show API error messages like "city not found"
    }
  } catch (error) {
    alert("An error occurred while fetching the weather data.");
    console.error(error);
  }
}

// Display the fetched weather data
function displayWeather(data) {
  // Remove "loading" class to make the weather information visible
  weatherContainer.classList.remove("loading");

  // Update the UI with weather data
  document.querySelector(".city").innerText = `Weather in ${data.name}`;
  document.querySelector(".temp").innerText = `${Math.round(data.main.temp)}°C`;
  document.querySelector(".description").innerText = data.weather[0].description;
  document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  document.querySelector(".humidity").innerText = `Humidity: ${data.main.humidity}%`;
  document.querySelector(".wind").innerText = `Wind speed: ${data.wind.speed.toFixed(1)} km/h`;
}
