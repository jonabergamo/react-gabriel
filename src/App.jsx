import React, { useEffect, useState } from 'react'
import Search from './components/Search/Search';
import TempInfo from './components/TempInfo/TempInfo';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';

const data = {
  "coord": {
    "lon": -47.6886,
    "lat": -23.3503
  },
  "weather": [
    {
      "id": 802,
      "main": "Clouds",
      "description": "scattered clouds",
      "icon": "03n"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 295.73,
    "feels_like": 295.87,
    "temp_min": 295.73,
    "temp_max": 295.73,
    "pressure": 1014,
    "humidity": 70,
    "sea_level": 1014,
    "grnd_level": 950
  },
  "visibility": 10000,
  "wind": {
    "speed": 3.26,
    "deg": 163,
    "gust": 6.25
  },
  "clouds": {
    "all": 39
  },
  "dt": 1712359262,
  "sys": {
    "country": "BR",
    "sunrise": 1712308823,
    "sunset": 1712351151
  },
  "timezone": -10800,
  "id": 3461134,
  "name": "Iperó",
  "cod": 200
}

function App() {
  const [search, setSearch] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = '0c4bf3c54a1f828b5038be4056d347c0';

  useEffect(() => {

  }, [search]);

  async function getWeatherData() {
    if (!search) return; // Don't make a request if search is empty

    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log(data)
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
      <TempInfo data={data} />
      <ThemeToggle />
    </div>
  );
}

export default App;
