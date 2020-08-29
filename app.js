window.addEventListener('load', () => {

    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    let temperatureSpan = document.querySelector('.temperature span');


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?q=vienna,AT&appid=09af6e7123579bd866598c0c0973661a`;


            fetch(api)
                .then(response => {
                    return response.json();

                })
                .then(data => {
                    console.log(data);
                    const { city } = data.name;
                    const { temp } = data.main;
                    const { description, main, icon } = data.weather[0];
                    // Set DOM elements from the API
                    temperatureDegree.textContent = temp;
                    temperatureDescription.textContent = 'Main: ' + main + ' Description: ' + description;
                    locationTimezone.textContent = data.timezone + ' / ' + data.name;

                    // Formula for Celsius/Kelvin
                    let celsius = temp - 273.15;

                    //Set Icon
                    setIcons(icon, document.querySelector('.icon'));

                    //Change temperature to Celsius/Kelvin
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === 'K') {
                            temperatureSpan.textContent = '°C';
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else {
                            temperatureSpan.textContent = 'K';
                            temperatureDegree.textContent = temp;
                        }
                    });

                })
        })
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: 'white' });
        const currentIcon = icon.replace(/02d/g, "PARTLY_CLOUDY_DAY");
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

})