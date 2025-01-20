import { getWeather } from './weatherService.js';
import { displayWeather } from './uiRenderer.js';

let favorites = JSON.parse(localStorage.getItem('favorites')) || []; // Declare favorites globally
let units = ['imperial', 'metric', '']; // Cycle order: Fahrenheit -> Celsius -> Kelvin
let currentUnitIndex = 0; // Track current unit index

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('weather-form');
    const cityInput = document.getElementById('city-input');
    const viewFavoritesButton = document.getElementById('view-favorites');
    const hideFavoritesButton = document.getElementById('hide-favorites');
    const resetFavoritesButton = document.getElementById('reset-favorites');
    const changeScaleButton = document.getElementById('change-scale-btn'); // Correct button ID

    // Add event listener for form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const city = cityInput.value.trim();
        console.log('City Entered:', city);

        if (city) {
            getWeather(city, units[currentUnitIndex])
                .then(data => {
                    console.log('Weather Data Received:', data);
                    data.units = units[currentUnitIndex]; // Pass the current unit to display
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

    // Add event listener for unit toggle button
    changeScaleButton.addEventListener('click', () => {
        currentUnitIndex = (currentUnitIndex + 1) % units.length; // Cycle to the next unit
        const unitText = units[currentUnitIndex] === 'imperial'
            ? 'Switch to Celsius'
            : units[currentUnitIndex] === 'metric'
            ? 'Switch to Kelvin'
            : 'Switch to Fahrenheit';
        changeScaleButton.textContent = unitText; // Update button text
        updateWeatherWithCurrentUnit(); // Update weather display with new unit
    });

    // Add event listeners for favorites controls
    viewFavoritesButton.addEventListener('click', viewFavorites);
    hideFavoritesButton.addEventListener('click', hideFavorites);
    resetFavoritesButton.addEventListener('click', resetFavorites);
});

// Function to update weather with the current unit
function updateWeatherWithCurrentUnit() {
    const city = document.getElementById('city-input').value.trim();
    if (city) {
        getWeather(city, units[currentUnitIndex])
            .then(data => {
                data.units = units[currentUnitIndex]; // Pass the current unit to the display function
                displayWeather(data);
            })
            .catch(error => {
                console.error('Error updating weather data:', error);
            });
    } else {
        console.warn('No city entered. Please enter a city to update the weather display.');
    }
}

// Function to save a favorite city
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

// Function to display favorites
function viewFavorites() {
    console.log('Favorites array:', favorites);
    const favoritesList = document.getElementById('favorites-list');
    const favoritesContainer = document.getElementById('favorites-container');
    favoritesList.innerHTML = '';
    favoritesContainer.style.display = 'block'; // Ensure container is visible

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

// Function to hide favorites
function hideFavorites() {
    const favoritesContainer = document.getElementById('favorites-container');
    favoritesContainer.style.display = 'none'; // Hide the container
}

// Function to reset favorites
function resetFavorites() {
    localStorage.removeItem('favorites');
    favorites = [];
    alert('All favorite cities have been reset!');
    viewFavorites(); // Refresh the favorites list display
}
