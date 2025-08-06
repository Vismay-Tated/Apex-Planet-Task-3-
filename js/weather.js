// Initialize Lucide Icons
lucide.createIcons();

// --- Weather App Logic ---
const weatherApiKey = 'd48dd2307eed266626fade4c18eb426d'; // Your API Key.
const cityInput = document.getElementById('city-input');
const getWeatherBtn = document.getElementById('get-weather-btn');
const weatherCard = document.getElementById('weather-card');
const weatherResult = document.getElementById('weather-result');
const weatherError = document.getElementById('weather-error');
const weatherLoader = document.getElementById('weather-loader');

async function getWeather() {
    const city = cityInput.value.trim();
    if (!city) return;
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`;
    
    weatherError.classList.add('hidden');
    weatherResult.classList.add('hidden');
    weatherLoader.classList.remove('hidden');

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`City not found or API error: ${response.statusText}`);
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error("Error fetching weather:", error);
        weatherError.classList.remove('hidden');
    } finally {
        weatherLoader.classList.add('hidden');
    }
}

function displayWeather(data) {
    const { name } = data;
    const { main, description, icon } = data.weather[0];
    const { temp, humidity, feels_like } = data.main;
    const { speed } = data.wind;

    const weatherBgClasses = {
        "Clear": "weather-bg-clear",
        "Clouds": "weather-bg-clouds",
        "Rain": "weather-bg-rain",
        "Drizzle": "weather-bg-rain",
        "Thunderstorm": "weather-bg-thunderstorm",
        "Snow": "weather-bg-snow",
    };
    
    weatherCard.className = 'max-w-md mx-auto rounded-2xl shadow-2xl overflow-hidden'; // Reset classes
    const bgClass = weatherBgClasses[main] || 'weather-bg-default';
    weatherCard.classList.add(bgClass);

    weatherResult.innerHTML = `
        <div class="p-6 text-white">
            <div class="text-center mb-4">
                <h2 class="text-3xl font-bold">${name}</h2>
                <p class="text-lg capitalize opacity-90">${description}</p>
            </div>
            <div class="flex justify-center items-center gap-4 my-6">
                <img src="https://openweathermap.org/img/wn/${icon}@4x.png" alt="Weather Icon" class="w-32 h-32 -mt-4 -mb-4">
                <p class="text-7xl font-extrabold tracking-tighter">${Math.round(temp)}<span class="text-4xl opacity-80 align-top mt-2">°C</span></p>
            </div>
            <div class="grid grid-cols-3 gap-4 text-center bg-black bg-opacity-20 backdrop-blur-sm rounded-xl p-4">
                <div class="flex flex-col items-center">
                    <i data-lucide="droplets" class="w-6 h-6 mb-1 opacity-80"></i>
                    <p class="font-bold text-lg">${humidity}%</p>
                    <p class="text-xs opacity-80">Humidity</p>
                </div>
                <div class="flex flex-col items-center">
                    <i data-lucide="wind" class="w-6 h-6 mb-1 opacity-80"></i>
                    <p class="font-bold text-lg">${speed.toFixed(1)} km/h</p>
                    <p class="text-xs opacity-80">Wind</p>
                </div>
                <div class="flex flex-col items-center">
                    <i data-lucide="thermometer-sun" class="w-6 h-6 mb-1 opacity-80"></i>
                    <p class="font-bold text-lg">${Math.round(feels_like)}°</p>
                    <p class="text-xs opacity-80">Feels Like</p>
                </div>
            </div>
        </div>
    `;
    
    lucide.createIcons();
    weatherResult.classList.remove('hidden');
}

getWeatherBtn.addEventListener('click', getWeather);
cityInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        getWeather();
    }
});
