import React, { useState, useEffect } from 'react';
import './styles.css';
import Tooltip from '../Tooltip/Tooltip';

const lightThemes = ['default', 'orange', 'green', 'red'];
const darkThemes = ['dark', 'dark-orange', 'dark-green', 'dark-red'];

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedDarkMode = JSON.parse(localStorage.getItem('darkMode'));
    return storedDarkMode !== null ? storedDarkMode : false;
  });

  const [themeIndex, setThemeIndex] = useState(() => {
    const storedThemeIndex = parseInt(localStorage.getItem('themeIndex'));
    return !isNaN(storedThemeIndex) ? storedThemeIndex : 0; // Alterado para usar o índice armazenado
  });

  useEffect(() => {
    const theme = isDarkMode ? darkThemes[themeIndex] : lightThemes[themeIndex];
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('themeIndex', themeIndex);
    localStorage.setItem('darkMode', isDarkMode);
  }, [themeIndex, isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const handleThemeChange = (index) => {
    setThemeIndex(index);
  };

  const themeStyle = (theme) => {
    switch (theme) {
      case 'default':
        return 'hsl(262, 83%, 58%)';
      case 'dark':
        return 'hsl(262, 83%, 58%)';
      case 'green':
        return 'hsl(142, 76%, 36%)';
      case 'orange':
        return 'rgb(249, 115, 22)';
      case 'dark-green':
        return 'hsl(142, 76%, 36%)';
      case 'red':
        return 'hsl(0, 76%, 36%)';
      case 'dark-red':
        return 'hsl(0, 76%, 36%)';
      case 'dark-orange':
        return 'rgb(249, 115, 22)';
      default:
        return 'red';
    }
  };
  return (
    <div className="toggle-container">

      <label className="toggle" htmlFor="switch">
        <input id="switch" className="toggle-input" type="checkbox" checked={!isDarkMode} onClick={toggleTheme} />
        <div className="icon icon--moon">
          <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path clipRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" fillRule="evenodd" />
          </svg>
        </div>
        <div className="icon icon--sun">
          <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
          </svg>
        </div>
      </label>
      <div className="theme-selector">
        {(isDarkMode ? darkThemes : lightThemes).map((theme, index) => (
          <Tooltip text={theme} position={'bottom'} key={index} >
            <button onClick={() => handleThemeChange(index)} className='color-icon' style={{
              backgroundColor: themeStyle(theme), boxShadow: themeIndex === index ? '0 0 0 4px rgba(var(--primary-rgb), 0.5)' : ''
            }} />
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
