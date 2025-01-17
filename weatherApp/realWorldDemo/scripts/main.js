import { getWeather } from './weatherService.js';
import { displayWeather } from './uiRenderer.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('weather-form');
    const cityInput = document.getElementById('city-input');
    const viewFavoritesButton = document.getElementById('view-favorites');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const city = cityInput.value.trim();
        console.log('City Entered:', city);

        if (city) {
            getWeather(city)
                .then(data => {
                    console.log('Weather Data Received:', data);
                    displayWeather(data);

                    const saveButton = document.getElementById('save-favorite');
                    saveButton?.addEventListener('click', () => {
                        console.log('Save to Favorites button clicked!');
                        saveFavorite(city);
                    });
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

    viewFavoritesButton.addEventListener('click', viewFavorites);
});

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function saveFavorite(city) {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Saved favorite city:', data);
        if (!favorites.includes(city)) {
            favorites.push(city);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            alert(`City "${city}" saved to favorites!`);
        } else {
            alert(`City "${city}" is already in favorites!`);
        }
    })
    .catch(error => {
        console.error('Error saving favorite city:', error);
        alert('Failed to save the city. Please try again.');
    });
}

function viewFavorites() {
    console.log('Favorites array:', favorites);
    const favoritesList = document.getElementById('favorites-list');
    favoritesList.innerHTML = '';

    if (favorites.length === 0) {
        favoritesList.innerHTML = '<li>No favorites saved yet.</li>';
    } else {
        favorites.forEach(city => {
            const li = document.createElement('li');
            li.textContent = city;
            favoritesList.appendChild(li);
        });
    }
}
