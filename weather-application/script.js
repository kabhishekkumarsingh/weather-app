
const apiKey = 'b9ef3ff0f56826e3a8581b66e0ad1c39';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const weatherIconElement = document.getElementById('weatherIcon');
const humidityElement=document.getElementById('humidity');
const windElement=document.getElementById('wind');
const visibilityElement=document.getElementById('visibility');
const sunriseElement=document.getElementById('sunrise');
const sunsetElement=document.getElementById('sunset');

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});


function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            locationElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            descriptionElement.textContent = data.weather[0].description;

            // Additional data
            humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
            windElement.textContent = `Wind: ${data.wind.speed} m/s`;
            visibilityElement.textContent = `Visibility: ${data.visibility / 1000} km`;

            const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
            const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
            sunriseElement.textContent = `Sunrise: ${sunriseTime}`;
            sunsetElement.textContent = `Sunset: ${sunsetTime}`;

            // Display weather icon
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            weatherIconElement.src = iconUrl;
            weatherIconElement.style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}
