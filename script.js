const apiKey = "690f11b9b4a946cacd0647ae0f14676f";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Map weather conditions to icon paths
const weatherIcons = {
  "Clouds": "images/cloud.png",
  "Clear": "images/icons8-clear-sky-64.png",
  "Rain": "images/icons8-rain-48.png",
  "Drizzle": "images/drizzle.png",
  "Mist": "images/mist.png"
};

// Event listeners setup
document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("searchBtn");
  const cityInput = document.getElementById("city");
  
  // Search on button click
  searchBtn.addEventListener("click", getWeather);
  
  // Search on Enter key press
  cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      getWeather();
    }
  });
});

async function getWeather() {
  const city = document.getElementById("city").value.trim();
  
  // Validate that city name is not empty
  if (!city) {
    document.getElementById("error").style.display = "block";
    document.getElementById("error").innerHTML = "Please enter a city name";
    document.getElementById("weather").style.display = "none";
    return;
  }
  
  try {

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status === 404) {
      document.getElementById("error").style.display = "block";
      document.getElementById("error").innerHTML = "Invalid city name";
      document.getElementById("weather").style.display = "none";
    } else if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const data = await response.json();

      // Validate required data exists
      if (!data.name || !data.main || !data.weather || !data.wind) {
        throw new Error("Invalid weather data received");
      }

      document.getElementById("cityName").innerHTML = data.name;
      document.getElementById("temp").innerHTML = Math.round(data.main.temp) + "°C";
      document.getElementById("humidity").innerHTML = data.main.humidity + "%";
      document.getElementById("wind").innerHTML = data.wind.speed + " km/h";

      const weatherMain = data.weather[0].main;
      const iconPath = weatherIcons[weatherMain] || "images/clear.png";
      document.getElementById("icon").src = iconPath;

      document.getElementById("weather").style.display = "block";
      document.getElementById("error").style.display = "none";
    }
  } catch (error) {
    document.getElementById("error").style.display = "block";
    document.getElementById("error").innerHTML = "An error occurred: " + error.message;
    document.getElementById("weather").style.display = "none";
  }
}