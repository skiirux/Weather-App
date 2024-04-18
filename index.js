const apiKey = "a1bca7a6625c45747e121a25b7ec8aa1";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');
const errorMessage = document.querySelector('.error');

async function getWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if(response.status === 404) {
        document.querySelector('.errors').style.display = "block";
        document.querySelector('.weather').style.display = "none";
    }
    if (!response.ok) {
      throw new Error('City not found');
    }
    const data = await response.json();
    // console.log(data);

    // Clear error message
    errorMessage.innerHTML = '';

    // Set weather icon
    if (data.weather[0].main === "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main === "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main === "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main === "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main === "Mist") {
      weatherIcon.src = "images/mist.png";
    }else if (data.weather[0].main === "snow") {
        weatherIcon.src = "images/snow.png";
      }

   document.querySelector('.weather').style.display = "block";
   document.querySelector('.errors').style.display = "none";

    // Update weather data
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
    document.querySelector('.wind').innerHTML = data.wind.speed + "km/h";
  } catch (error) {
    errorMessage.innerHTML = "City not found";
  }
}

searchBtn.addEventListener('click', () => {
  getWeather(searchBox.value);
});

searchBox.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    getWeather(searchBox.value);
  }
});
