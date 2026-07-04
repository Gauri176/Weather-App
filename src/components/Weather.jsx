import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloudy_icon from '../assets/cloudy.png'
import drizzle_icon from '../assets/drizzle.png'
import snowy_icon from '../assets/snowy.png'
import sun_icon from '../assets/sun.png'
import humidity_icon from '../assets/humidity.png'
import wind_icon from '../assets/wind.png'
import rain_icon from '../assets/rain.png'

const Weather = () => {
     const inputRef = useRef()
     const [WeatherData, setWeatherData] = useState(false);

     const allicons = {
      "01d": clear_icon,
      "01n": clear_icon, // Fixed: changed '01dn' to '01n'
      "02d": cloudy_icon,
      "02n": cloudy_icon,
      "03d": cloudy_icon,
      "03n": cloudy_icon,
      "04d": drizzle_icon,
      "04n": drizzle_icon,
      "09d": rain_icon,
      "09n": rain_icon,
      "10d": rain_icon,
      "10n": rain_icon,
      "13d": snowy_icon,
      "13n": snowy_icon,
     }

     const search = async (city) => {
      if (city === "") {
        alert("Enter city name")
        return;
      }
       try {
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
          
          const response = await fetch(url);
          const data = await response.json();

          // Fixed: Alert only if the response is NOT ok (e.g., city not found)
          if (!response.ok) {
            alert(data.message || "City not found");
            return;
          }

          console.log(data);
          const icon = allicons[data.weather[0].icon] || clear_icon;
          
          setWeatherData({
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            temperature: Math.floor(data.main.temp),
            location: data.name,
            icon: icon
          })
       } catch (error) {
          setWeatherData(false);
          console.error("Error in fetching weather data", error);
       }
     }

     useEffect(() => {
       search("New York");
     }, [])
      
  return (
    <div className='weather'>
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder='Search...'/>
            <img src={search_icon} alt="search" onClick={() => search(inputRef.current.value)}/>
        </div>

      {WeatherData ? (
        <>
          <img src={WeatherData.icon} alt="weather icon" className='weather_icon' />
          <p className='temperature'>{WeatherData.temperature}°C</p> {/* Fixed: replaced '0c' with '°C' */}
          <p className='location'>{WeatherData.location}</p>
          
          <div className="weather-data">
            <div className='col'>
              <img src={humidity_icon} alt="humidity" />
              <div>
                <p>{WeatherData.humidity}%</p> {/* Fixed: capitalized 'WeatherData' */}
                <span>Humidity</span>
              </div>
            </div>
            
            <div className='col'>
              <img src={wind_icon} alt="wind" />
              <div>
                <p>{WeatherData.windSpeed} Km/h</p>       
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
  </div>
  )
}

export default Weather