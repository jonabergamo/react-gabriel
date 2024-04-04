import React, { useState, useEffect } from 'react';

const lightThemes = ['default', 'orange', 'green'];
const darkThemes = ['dark', 'dark-orange', 'dark-green'];

export default function ThemeToggle() {
  const [themeIndex, setThemeIndex] = useState(() => {
    const storedThemeIndex = parseInt(localStorage.getItem('themeIndex'));
    return isNaN(storedThemeIndex) ? 0 : storedThemeIndex;
  });

  useEffect(() => {
    const theme = isDarkMode ? darkThemes[themeIndex] : lightThemes[themeIndex];
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('themeIndex', themeIndex);
  }, [themeIndex]);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedDarkMode = JSON.parse(localStorage.getItem('darkMode'));
    return storedDarkMode !== null ? storedDarkMode : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
    setThemeIndex(0); // Reset theme index when toggling mode
  };

  const handleThemeChange = (index) => {
    setThemeIndex(index);
  };

  return (
    <div className="toggle-container">
      <button id="theme-toggle" onClick={toggleTheme}>
        Toggle Theme: {isDarkMode ? 'Dark' : 'Light'}
      </button>


      <div className="theme-selector">
        {(isDarkMode ? darkThemes : lightThemes).map((theme, index) => (
          <button key={index} onClick={() => handleThemeChange(index)}>
            {theme}
          </button>
        ))}
      </div>
    </div>
  );
}
