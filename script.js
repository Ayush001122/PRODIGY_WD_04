const apiKey = 'api-key'; 

function displayWeather(data) {
  const iconMap = {
    Clear: "fa-sun",
    Clouds: "fa-cloud",
    Rain: "fa-cloud-showers-heavy",
    Drizzle: "fa-cloud-rain",
    Thunderstorm: "fa-bolt",
    Snow: "fa-snowflake",
    Mist: "fa-smog",
    Haze: "fa-smog",
    Fog: "fa-smog",
    Smoke: "fa-smog",
    Dust: "fa-wind"
  };

  const animMap = {
    Clear: "https://assets10.lottiefiles.com/packages/lf20_ukbskn2t.json",
    Clouds: "https://assets2.lottiefiles.com/packages/lf20_w3m0f0uq.json",
    Rain: "https://assets4.lottiefiles.com/packages/lf20_qmfs6zvg.json",
    Drizzle: "https://assets7.lottiefiles.com/packages/lf20_mf3pbbk3.json",
    Thunderstorm: "https://assets3.lottiefiles.com/private_files/lf30_t26law.json",
    Snow: "https://assets9.lottiefiles.com/packages/lf20_sFZQvh.json",
    Mist: "https://assets1.lottiefiles.com/packages/lf20_hbr24nkr.json",
    Haze: "https://assets1.lottiefiles.com/packages/lf20_hbr24nkr.json",
    Fog: "https://assets1.lottiefiles.com/packages/lf20_hbr24nkr.json",
    Smoke: "https://assets1.lottiefiles.com/packages/lf20_hbr24nkr.json"
  };

  const main = data.weather[0].main;
  const description = data.weather[0].description
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const cityName = data.name.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  document.getElementById('cityName').innerText = `Weather in ${cityName}`;
  document.getElementById('description').innerHTML = `
    <i class="fas ${iconMap[main] || 'fa-smog'}" style="font-size: 2rem; margin-right: 10px;"></i> 
    ${description}`;
  document.getElementById('temperature').innerText = `Temperature: ${data.main.temp} °C`;
  document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
  document.getElementById('wind').innerText = `Wind Speed: ${data.wind.speed} m/s`;

  document.getElementById("weatherAnim").setAttribute("src", animMap[main] || animMap["Mist"]);

  const hour = new Date().getHours();
  document.body.style.background = hour >= 6 && hour < 18
    ? "linear-gradient(135deg, #fdfbfb, #ebedee)"
    : "linear-gradient(135deg, #c9d6ff, #e2e2e2)";
}


async function fetchWeather(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.cod === 200) {
      displayWeather(data);
    } else {
      alert("Location not found");
    }
  } catch (error) {
    alert("Failed to fetch weather data.");
    console.error(error);
  }
}

function getWeather() {
  const location = document.getElementById('locationInput').value;
  if (location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
    fetchWeather(url);
  }
}

function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
      fetchWeather(url);
    }, () => {
      alert("Geolocation permission denied.");
    });
  } else {
    alert("Geolocation not supported by your browser.");
  }
}
