export function displayWeather(weatherData) {
    const temperature = weatherData.main?.temp || `N/A`;
    const description = weatherData.weather?.[0]?.description || `N/A`;
    const feelsLike = weatherData.main?.feels_like || `N/A`;
    const humidity = weatherData.main?.humidity || `N/A`;
    const pressure = weatherData.main?.pressure || `N/A`;
    const windSpeed = weatherData.wind?.speed || `N/A`;
    const visibility = weatherData.visibility || `N/A`;
    const units = weatherData.units || 'Kelvin'; // Pass units from the weather data

    const temperatureString = units === 'imperial'
        ? `${temperature}°F`
        : units === 'metric'
        ? `${temperature}°C`
        : `${temperature}K`;

    const feelsLikeString = units === 'imperial'
        ? `${feelsLike}°F`
        : units === 'metric'
        ? `${feelsLike}°C`
        : `${feelsLike}K`;

    const weatherContainer = document.getElementById(`weather-container`);

    if (weatherContainer) {
        weatherContainer.innerHTML = `
        <p>Temperature: ${temperatureString}</p>
        <p>Feels Like: ${feelsLikeString}</p>
        <p>Description: ${description}</p>
        <p>Humidity: ${humidity}%</p>
        <p>Pressure: ${pressure} hPa</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
        <p>Visibility: ${visibility !== 'N/A' ? (visibility / 1000).toFixed(2) + ' km ' : 'N/A'}</p>
        <button id="save-favorite">Save to Favorites</button>
        `;
    } else {
        console.error('Weather container element is missing');
    }

    // Dynamically reattach the save-favorite button listener
    const saveButton = document.getElementById('save-favorite');
    if (saveButton) {
        saveButton.addEventListener('click', () => {
            console.log('Save to Favorites button clicked!');
            const city = weatherData.name; // Assuming city name is part of weatherData
            saveFavorite(city); // Call the saveFavorite function
        });
    }
}
