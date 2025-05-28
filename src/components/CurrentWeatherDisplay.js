// src/components/CurrentWeatherDisplay.js
import React from 'react';
import './CurrentWeatherDisplay.css';

const CurrentWeatherDisplay = ({ data }) => {
  if (!data) return <p>No current weather data to display.</p>;

  const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  return (
    <div className="current-weather">
      <h2>Current Weather in {data.name}</h2>
      <div className="weather-details">
        <img src={iconUrl} alt={data.weather[0].description} className="weather-icon"/>
        <div>
          <p className="temperature">{Math.round(data.main.temp)}°C</p>
          <p className="description">{data.weather[0].main} ({data.weather[0].description})</p>
        </div>
      </div>
      <div className="additional-info">
        <p>Feels like: {Math.round(data.main.feels_like)}°C</p>
        <p>Humidity: {data.main.humidity}%</p>
        <p>Wind: {data.wind.speed} m/s</p>
        <p>Pressure: {data.main.pressure} hPa</p>
      </div>
    </div>
  );
};

export default CurrentWeatherDisplay;