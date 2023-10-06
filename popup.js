// Get DOM elements
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

// Function to get weather data and update the UI
function getWeather() {
    // API Key and city name from input
    const APIKey = '168777b4ea1efdc894898c0df6279151';
    const city = document.querySelector('.search-box input').value;

    // Check if city input is empty
    if (city === '') return;

    // Fetch weather data from OpenWeatherMap API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            // If the response is 404 (not found), display the error message
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            // Hide error message if the response is valid
            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            // Get DOM elements for displaying weather data
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            // Update weather data based on API response
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;
                case 'Rain':
                    image.src = 'images/rain.png';
                    break;
                case 'Snow':
                    image.src = 'images/snow.png';
                    break;
                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;
                case 'Haze':
                    image.src = 'images/mist.png';
                    break;
                default:
                    image.src = '';
            }

            // Update DOM elements with weather data
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            // Display weather box and details
            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
        });
}

// Event listener for the search button
search.addEventListener('click', getWeather);

// Event listener for pressing Enter key in the input field
document.querySelector('.search-box input').addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        getWeather();
    }
});

// Dark mode toggle
const toggleDarkMode = document.getElementById('toggle-dark-mode');
let darkModeEnabled = false;

toggleDarkMode.addEventListener('click', () => {
    darkModeEnabled = !darkModeEnabled;
    document.body.classList.toggle('dark-mode', darkModeEnabled);
});

