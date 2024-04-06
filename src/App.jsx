import React, { useEffect, useState } from 'react'
import Search from './components/Search/Search';
import TempInfo from './components/TempInfo/TempInfo';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';

const data = {
  "coord": {
    "lon": -47.4581,
    "lat": -23.5017
  },
  "weather": [
    {
      "id": 800,
      "main": "Clear",
      "description": "céu limpo",
      "icon": "01n"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 293.99,
    "feels_like": 294.01,
    "temp_min": 293.99,
    "temp_max": 293.99,
    "pressure": 1016,
    "humidity": 72,
    "sea_level": 1016,
    "grnd_level": 938
  },
  "visibility": 10000,
  "wind": {
    "speed": 2.73,
    "deg": 145,
    "gust": 7.09
  },
  "clouds": {
    "all": 0
  },
  "dt": 1712370463,
  "sys": {
    "country": "BR",
    "sunrise": 1712308772,
    "sunset": 1712351091
  },
  "timezone": -10800,
  "id": 3447399,
  "name": "Sorocaba",
  "cod": 200
}

function App() {
  const [search, setSearch] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = '0c4bf3c54a1f828b5038be4056d347c0';


  async function getWeatherData() {
    if (!search) return; // Don't make a request if search is empty

    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&lang=pt_br&appid=${apiKey}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }

  //(weatherData.main.temp - 273.15).toFixed(1)
  return (
    <div className='app'>
      <Search onChange={(e) => { setSearch(e.target.value) }} value={search} onSearch={getWeatherData} />
      {weatherData ? <TempInfo data={weatherData} />
        : <h1 className='text-gradient' style={{ fontSize: 25 }}>Pesquise uma cidade para começar!</h1>}      <ThemeToggle />
    </div>
  );
}

export default App;
