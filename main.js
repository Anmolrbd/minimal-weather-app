
    const apiKey = "6966b2f231a9c39abffbe4497b7d9bbd";
    const searchBtn = document.querySelector("#clickbtn");
    const searchInput = document.querySelector("#city");
    const cityName = document.querySelector("#place");
    const temperature = document.querySelector("#centigrade");
    const weatherIcon = document.querySelector("#weather-icon");
    const humidity = document.querySelector("#humiditypercentage");
    const wind = document.querySelector("#windspeedrate");

    searchBtn.addEventListener("click", () => {
      const city = searchInput.value.trim();
      if (city) getWeather(city);
    });

    async function getWeather(city) {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod == 404) {
          cityName.textContent = "City not found ";
          temperature.textContent = "--°C";
          humidity.textContent = "--";
          wind.textContent = "--";
          return;
        }

        cityName.textContent = `${data.name}, ${data.sys.country}`;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        humidity.textContent = `${data.main.humidity}%`;
        wind.textContent = `${data.wind.speed} m/s`;

        const iconCode = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

      } catch (error) {
        cityName.textContent = "Error fetching data ";
        console.error(error);
      }
    }
