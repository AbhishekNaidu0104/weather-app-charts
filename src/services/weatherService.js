// src/services/weatherService.js
import axios from 'axios';

const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getCurrentWeather = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric', // or 'imperial' for Fahrenheit
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching current weather:", error.response ? error.response.data : error.message);
    throw error.response ? new Error(error.response.data.message) : error;
  }
};

// OpenWeatherMap's free tier historical data is limited.
// For a graphical representation over time, the 5-day/3-hour forecast is more suitable
// and available on the free tier. We'll call it "forecast" rather than "historical".
export const getWeatherForecast = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric', // or 'imperial'
        cnt: 40, // Get all 40 timestamps for 5 days (5 * 8 timestamps/day)
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather forecast:", error.response ? error.response.data : error.message);
    throw error.response ? new Error(error.response.data.message) : error;
  }
};