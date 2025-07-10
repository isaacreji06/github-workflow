// OpenWeatherMap API key
const apiKey = '3a2b4c5d6e7f8g9h0i1j2k3l4m5n6o7p';

function getWeather() {
    const cityName = document.getElementById('cityInput').value.trim();

    if (!cityName) {
        document.getElementById('resultContainer').innerHTML = '<p class="error-message">Please enter a city name!</p>';
        return;
    }

    document.getElementById('resultContainer').innerHTML = '<p>Loading...</p>';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                document.getElementById('resultContainer').innerHTML = '<p class="error-message">City not found!</p>';
                return;
            }

            const weatherCondition = data.weather[0].main;
            const temperature = Math.round(data.main.temp);
            const humidity = data.main.humidity;
            const city = data.name;

            document.getElementById('resultContainer').innerHTML = `
                <div class="weather-condition">${weatherCondition}</div>
                <div class="temperature">${temperature}°C</div>
                <div class="detail">Humidity: ${humidity}%</div>
                <div class="detail">City: ${city}</div>
            `;
        })
        .catch(error => {
            document.getElementById('resultContainer').innerHTML = '<p class="error-message">Error fetching weather data!</p>';
        });
}
