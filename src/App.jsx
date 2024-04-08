import React, { useEffect, useState } from 'react';
import Search from './components/Search/Search';
import TempInfo from './components/TempInfo/TempInfo';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';

function App() {
  const [search, setSearch] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [polutionData, setPolutionData] = useState(null)
  const [error, setError] = useState()
  const apiKey = '0c4bf3c54a1f828b5038be4056d347c0';

  // Função para obter a localização do usuário
  async function getUserLocation() {
    try {
      // Verifica se o navegador suporta geolocalização
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async function (position) {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=pt_br&appid=${apiKey}`);
            if (!response.ok) {
              throw new Error('Failed to fetch weather data');
            }
            const data = await response.json();
            setWeatherData(data);
            const lat = data.coord.lat
            const lon = data.coord.lon
            const polution_response = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`)
            if (!polution_response.ok) {
              throw new Error('Failed to fetch air pollution data');
            }
            const polution_data = await polution_response.json()
            console.log(polution_data)
            setPolutionData(polution_data)
          } catch (error) {
            console.error(error);
            setError('Failed to fetch data'); // Atualiza o estado de erro
          }
        });
      } else {
        throw new Error('Geolocation is not supported');
      }
    } catch (error) {
      console.error(error);
      setError('Geolocation is not supported'); // Atualiza o estado de erro
    }
  }

  useEffect(() => {
    // Obter a localização do usuário quando o componente for montado
    getUserLocation();
  }, []);

  async function getWeatherData() {
    if (!search) return; // Don't make a request if search is empty

    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&lang=pt_br&appid=${apiKey}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log(data)

        setWeatherData(data);
        const lat = data.coord.lat
        const lon = data.coord.lon
        const polution_response = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        if (!polution_response.ok) {
          throw new Error('Failed to fetch data');
        }
        const polution_data = await polution_response.json()
        setPolutionData(polution_data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }

  return (
    <div className='app'>
      <Search onChange={(e) => { setSearch(e.target.value) }} value={search} onSearch={getWeatherData} />
      <TempInfo data={weatherData} polution_data={polutionData} />
      <ThemeToggle />
    </div>
  );
}

export default App;
