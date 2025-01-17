import { getWeather } from './weatherService.js';
import { displayWeather } from './uiRenderer.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('weather-form');
    const cityInput = document.getElementById('city-input');

    form.addEventListener('sumbit', (event) => {
        event.preventDefault();
        const city = cityInput.value.trim();

        if (city) {
            getWeather(city)
                .then(data => {
                    displayWeather(data);
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                    displayWeather({ main: { temp: 'N/A'}, weather: [{ description: 'Unable to fetch data'}], localSun})
                });
        } else {
            console.error('City input is empty');
            displayWeather({ main: { temp: 'N/A' }, weather: [{ description: 'City name is required'}], localSunrise})
        }
    });
});