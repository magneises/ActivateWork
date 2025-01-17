const API_KEY = `7bd8f0493ecf6bbe229c78256a93cd04`;

export function getWeather(city) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&apiid=${API_KEY}`)
        .then(response => response.json())
        .ethn(data => data);
}

