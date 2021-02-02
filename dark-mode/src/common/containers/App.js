import React, { useState, useEffect } from 'react';
import ThemeContext, { themes } from '../../routes/App/ThemeContext';

export default function App({ children }) {
  const [theme, setTheme] = useState(themes.light);

  const toggleTheme = () => {
    const nextTheme = theme === themes.dark
      ? themes.light
      : themes.dark

    setTheme(nextTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('class', theme);
  }, [theme])

  return (
    <ThemeContext.Provider value={{
      theme,
      toggleTheme,
    }} >
      {children}
    </ThemeContext.Provider>
  );
}
