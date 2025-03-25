document.addEventListener('DOMContentLoaded', function() {
    console.log('Document is ready!');

    // Smooth scroll
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        });
    });

    // OpenWeatherMap API integration
    const apiLink = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=fbd1c7fecf098786636cd837cab5d106&q=";

    async function checkWeather(city) {
        const response = await fetch(apiLink + city);
        const data = await response.json();

        if (response.status == 404) {
            document.querySelector('.error').style.display = "block";
            document.querySelector('.weather').style.display = "none";
        } else {
            console.log(data);
            document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + '°C';
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
            document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';
            document.querySelector('.condition').innerHTML = data.weather[0].description;

            document.querySelector('.weather').style.display = "block";
            document.querySelector('.error').style.display = "none";
        }
    }

    // Search functionality
    const searchbox = document.querySelector('.search input');
    document.querySelector('.search button').addEventListener("click", () => {
        checkWeather(searchbox.value);
        console.log(searchbox.value);
    });

    // Form submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Form submitted!');

        // Normally, you would handle form submission here, e.g., send data to a server
        contactForm.reset();
    });
});
