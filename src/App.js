// src/App.js
import React, { useState, useEffect } from 'react';
import * as weatherService from './services/weatherService';
import CurrentWeatherDisplay from './components/CurrentWeatherDisplay';
import WeatherChart from './components/WeatherChart';
import './App.css';
import './components/WeatherChart.css'; // if you created it

function App() {
  const [city, setCity] = useState('London'); // Default city
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [inputCity, setInputCity] = useState('London');

  const fetchAllWeatherData = async (selectedCity) => {
    if (!selectedCity) {
      setError("Please enter a city name.");
      return;
    }
    setLoading(true);
    setError('');
    setCurrentWeather(null);
    setForecastData(null);

    try {
      const current = await weatherService.getCurrentWeather(selectedCity);
      setCurrentWeather(current);

      const forecast = await weatherService.getWeatherForecast(selectedCity);
      setForecastData(forecast);

    } catch (err) {
      setError(err.message || 'Failed to fetch weather data. Check city name or API key.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch weather for the default city on initial load
    if (city) {
      fetchAllWeatherData(city);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to run only on mount


  const handleSearch = (e) => {
    e.preventDefault();
    if (inputCity.trim()) {
      setCity(inputCity.trim()); // Update the city state which triggers useEffect
      fetchAllWeatherData(inputCity.trim());
    } else {
      setError("Please enter a city name.");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Dashboard</h1>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
            placeholder="Enter city name"
            className="city-input"
          />
          <button type="submit" className="search-button" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </header>

      <main className="App-content">
        {error && <p className="error-message">{error}</p>}
        {loading && !error && <p className="loading-message">Loading weather data...</p>}
        
        {!loading && !error && currentWeather && <CurrentWeatherDisplay data={currentWeather} />}
        {!loading && !error && forecastData && <WeatherChart forecastData={forecastData} />}

        {!loading && !error && !currentWeather && !forecastData && (
            <p>Enter a city and click search to see the weather.</p>
        )}
      </main>
      <footer className="App-footer">
        <p>Weather data provided by <a href="https://openweathermap.org/" target="_blank" rel="noopener noreferrer">OpenWeatherMap</a></p>
      </footer>
    </div>
  );
}

export default App;