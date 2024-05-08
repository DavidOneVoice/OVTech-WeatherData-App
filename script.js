document.addEventListener('DOMContentLoaded', function () {
    const locationInput = document.getElementById('locationInput');
    const getWeatherBtn = document.getElementById('getWeatherBtn');
    const weatherInfo = document.getElementById('weatherInfo');

    getWeatherBtn.addEventListener('click', function () {
        const location = locationInput.value.trim();
        if (location !== '') {
            fetchWeather(location);
        }
    });

    async function fetchWeather(location) {
        const apiKey = '779964580d89ae38bb63132d3e7c71b0'; // Replace with your API key
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            weatherInfo.innerHTML = 'Error fetching weather data. Please try again later.';
        }
    }

    function displayWeather(data) {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp);
        const weatherDescription = data.weather[0].description;
        const weatherIcon = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

        const weatherHtml = `
            <h2>${cityName}</h2>
            <img class="weather-icon" src="${weatherIcon}" alt="Weather Icon">
            <p class="weather-description">${weatherDescription}</p>
            <div class="weather-details">
                <p>Temperature: ${temperature}°C</p>
                <!-- You can add more weather details here -->
            </div>
        `;

        weatherInfo.innerHTML = weatherHtml;
    }
});
