import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const Weathermap = () => {

    const[weatherData, setWeatherData] = useState({})

    useEffect(() => {

        const successGeolocation = pos => {

            const latit = pos.coords.latitude;
            const long = pos.coords.longitude;
            
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latit}&lon=${long}&appid=e3908f5bb7edfa2af147d1c47b59aa9f`)
            .then((res) => setWeatherData(res.data))
        }
        
        navigator.geolocation.getCurrentPosition(successGeolocation);
    }, [])

    console.log(weatherData);
    const tempCelsius = weatherData.main?.temp - 273.15;
    const tempFahrenheit = tempCelsius * 9/5 + 32;

    const [isCelsius, setIsCelsius] = useState(true)

    const changeTemp = () => {
        setIsCelsius(!isCelsius)
    }

    return (
        <>
        <div className='Content-App-weather'>
           <h1>Weather App</h1>
           <div className="img-and-temp">
                <p><i className="fa-solid fa-location-dot"></i> {weatherData.name}, {weatherData.sys?.country === "CO"? "Colombia." : weatherData.sys?.country} </p>
                <img src= {`http://openweathermap.org/img/wn/${weatherData.weather?.[0].icon}@2x.png`} alt="" />
                <h3>
                    <i className="fa-solid fa-temperature-half"></i>  {isCelsius? `${tempCelsius.toFixed(0)} °C`  : `${tempFahrenheit.toFixed(0)} °F`} {" "}
                </h3>
                <button onClick={changeTemp}>{isCelsius? " Change to °F" : "Change to °C"}</button>
           </div>
           <div className="description-weather">
                <h3>"{weatherData.weather?.[0].description}"</h3>
                <div className="content-p">
                    <p> <i className="fa-solid fa-droplet"></i> <b>Humidity:</b>  {weatherData.main?.humidity} %.</p>
                    <p> <i className="fa-solid fa-wind"></i> <b>Wind Speed:</b> {weatherData.wind?.speed} m/s.</p>
                    <p> <i className="fa-solid fa-temperature-arrow-up"></i> <b>Pressure:</b> {weatherData.main?.pressure} hPa.</p>
                </div>
           </div>   
        </div>
        </>
    );
};

export default Weathermap;