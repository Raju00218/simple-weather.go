// Base URL and API Key
const API_KEY = "46d5fa2641aa7262b8ccf898e33505b7";
const Base_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`;

// DOM Elements
const city = document.querySelector('.city');
const temp = document.querySelector('.tem');
const humidity = document.querySelector('.humidity');
const desc = document.querySelector('.desc');
const cloud = document.querySelector('.cloud');
const fetchWeather = document.getElementById('fetch-Weather');

// Event Listener for Button Click
fetchWeather.addEventListener('click', () => {
  const field = document.getElementById('city');
  if (field.value.trim() === "") {
    alert("Please enter a city name!");
    return;
  }
  getWeather(field.value);
});

// Function to Fetch Weather Data
const getWeather = async (searchField) => {
  try {
    // Construct API URL
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${searchField.toLowerCase()}&appid=${API_KEY}`;

    // Fetch Weather Data
    const response = await fetch(URL);

    // Check if the response is OK
    if (!response.ok) {
      throw new Error("City not found or API error!");
    }

    // Parse JSON Data
    const data = await response.json();

    // Update DOM Elements with Weather Data
    city.textContent = `City: ${data.name}`;
    const celsius = (data.main.temp - 273.15).toFixed(2);
    temp.textContent = `Temperature: ${celsius}°C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    desc.textContent = `Weather: ${data.weather[0].description}`;
    cloud.innerHTML = `Wind Speed: ${data.wind.speed} Km/h`;

    // Add Weather Icon
    const img = document.createElement('img');
    if (data.weather && data.weather[0] && data.weather[0].icon) {
      img.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    } else {
      console.error("Icon data is missing");
    }

    // Clear Previous Icon (Optional)
    cloud.innerHTML = `Wind Speed: ${data.wind.speed} Km/h`;
    cloud.append(img);
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    alert(error.message);
  }
};
