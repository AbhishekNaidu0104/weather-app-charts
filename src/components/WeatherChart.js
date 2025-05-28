// src/components/WeatherChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WeatherChart = ({ forecastData }) => {
  if (!forecastData || !forecastData.list || forecastData.list.length === 0) {
    return <p>No forecast data available for chart.</p>;
  }

  const chartData = {
    labels: forecastData.list.map(item => {
      const date = new Date(item.dt * 1000);
      return `${date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric'})} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: forecastData.list.map(item => item.main.temp),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1,
        fill: true,
      },
      {
        label: 'Feels Like (°C)',
        data: forecastData.list.map(item => item.main.feels_like),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.1,
        fill: false, // Don't fill for the second line to avoid overlap confusion
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `5-Day Weather Forecast for ${forecastData.city.name}`,
        font: {
          size: 18
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += `${context.parsed.y.toFixed(1)}°C`;
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false, // Temperature can be negative
        title: {
            display: true,
            text: 'Temperature (°C)'
        }
      },
      x: {
        title: {
            display: true,
            text: 'Date & Time'
        }
      }
    }
  };

  return (
    <div className="weather-chart-container">
      <Line options={options} data={chartData} />
    </div>
  );
};

export default WeatherChart;