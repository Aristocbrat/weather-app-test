const container = document.querySelector(".container");
const searchbox = document.querySelector(".searchbox");
const notfound = document.querySelector(".notfound");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".notfound");

searchbox.addEventListener('click', () => {
    const myApiKey = '2fe35202da2213156d46057aa0371d5f';
    const city = document.querySelector('.searchbox input').value;

    if (city === "")
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${myApiKey}`)
    .then(response => response.json())
    .then(json => {
        // Log the weather condition to the console
        console.log(json.weather[0].main);

        if (json.cod === '404') {
            container.style.height = '380px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add("fadeIn");
            return;
        }

        error404.style.display = 'none';
        error404.classList.remove("fadeIn");

        const image = document.querySelector(".weather-box img");
        const temperature = document.querySelector('.weather-box .tempt');
        const description = document.querySelector('.weather-box .descr');
        const humidity = document.querySelector('.weather-details .humidity span');
        const windy = document.querySelector('.weather-details .Windy span');

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'images/clear.jpg';
                break;
            case 'Sunny':
                image.src = 'images/sunny.jpg';
                break;
            case 'Humid':
                image.src = 'images/humid.jpg';
                break;
            case 'Rain':
                image.src = 'images/rain.jpg';
                break;
            case 'Hamattan':
                image.src = 'images/Ham.jpg';
                break;
            case 'Clouds':
                image.src = 'images/overcast.jpg';
                break;
            default:
                image.src = '';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)} <span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        windy.innerHTML = `${parseInt(json.wind.speed)} Km/hr`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = "580px";
    });
});

