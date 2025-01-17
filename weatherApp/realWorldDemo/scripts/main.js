import { getWeather } from './weatherService.js';
import { displayWeather } from './uiRenderer.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('weather-form');
    const cityInput = document.getElementById('city-input');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const city = cityInput.value.trim();
        console.log('City Entered:', city);
    
        if (city) {
            getWeather(city)
                .then(data => {
                    console.log('Weather Data Received:', data);
                    displayWeather(data);
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                    displayWeather({
                        main: { temp: 'N/A' },
                        weather: [{ description: 'Unable to fetch data' }],
                        sys: { sunrise: null, sunset: null },
                        timezone: 0,
                    });
                });
        } else {
            console.error('City input is empty');
        }
    });    
});
