import React, { useEffect, useState } from 'react'
import Search from './components/Search/Search';
import TempInfo from './components/TempInfo/TempInfo';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';



function App() {
  const [search, setSearch] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = '0c4bf3c54a1f828b5038be4056d347c0';

  useEffect(() => {
    if (!search) return; // Don't make a request if search is empty

    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}`);
        console.log(await response.json())
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
  }, [search]);


  return (
    <div className='app'>
      <Search onChange={(e) => { setSearch(e.target.value) }} value={search} />
      <TempInfo city={'Sorocaba, SP'} temperature={29} humidity={45} wind={8} weather={'rainy'} />
      <ThemeToggle />
    </div>
  );
}

export default App;
