const apiKey = '6d987148da7e950118d24ad85857c727'; // Replace with your OpenWeatherMap API key
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');
const autocompleteList = document.getElementById('autocomplete-list');

// List of popular Indian cities for autocomplete
const indianCities = [
    "Mumbai", "Delhi", "Bengaluru", "Chennai", "Kolkata", "Ahmedabad",
    "Pune", "Jaipur", "Hyderabad", "Surat", "Lucknow", "Kanpur", "Nagpur",
    "Indore", "Thane", "Bhopal", "Visakhapatnam", "Patna", "Vadodara", "Ghaziabad",
    "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut", "Rajkot", "Varanasi",
    "Srinagar", "Amritsar", "Allahabad", "Ranchi", "Jodhpur", "Chandigarh",
    "Coimbatore", "Vijayawada", "Mysore", "Gurgaon", "Guwahati", "Hubli", "Noida",
    "Udaipur", "Shimla", "Manali", "Panaji", "Tiruchirappalli", "Madurai", "Mangalore",
    "Bhavnagar", "Haridwar", "Dehradun", "Rishikesh", "Gaya", "Jamshedpur", "Dhanbad",
    "Kozhikode", "Thrissur", "Kollam", "Alappuzha", "Kottayam", "Salem", "Erode",
    "Nellore", "Kakinada", "Warangal", "Bellary", "Belgaum", "Kolhapur", "Solapur",
    "Aurangabad", "Latur", "Dhule", "Parbhani", "Satara", "Sangli", "Bareilly",
    "Moradabad", "Aligarh", "Bhagalpur", "Muzaffarpur", "Gopalganj", "Itanagar",
    "Shillong", "Imphal", "Aizawl", "Kohima", "Agartala", "Port Blair", "Puducherry",
    "Silchar", "Tezpur", "Kharagpur", "Siliguri", "Durgapur", "Asansol", "Malda"
];


// Handle search button click
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city !== '') {
        getWeather(city);
    } else {
        alert('Please enter a city name');
    }
});

// Autocomplete functionality
cityInput.addEventListener('input', function() {
    const inputValue = this.value.toLowerCase();
    autocompleteList.innerHTML = '';
    if (!inputValue) return;

    const filteredCities = indianCities.filter(city =>
        city.toLowerCase().startsWith(inputValue)
    );

    filteredCities.forEach(city => {
        const suggestion = document.createElement('div');
        suggestion.textContent = city;
        suggestion.addEventListener('click', () => {
            cityInput.value = city;
            autocompleteList.innerHTML = '';
            getWeather(city);
        });
        autocompleteList.appendChild(suggestion);
    });
});

// Fetch weather data
async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherInfo.innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
}

// Display weather details
function displayWeather(data) {
    const { name } = data;
    const { temp, humidity } = data.main;
    const { description, icon } = data.weather[0];
    const { speed } = data.wind;

    weatherInfo.innerHTML = `
        <h2>Weather in ${name}</h2>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
        <p><strong>Temperature:</strong> ${temp} °C</p>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind Speed:</strong> ${speed} m/s</p>
    `;
}
