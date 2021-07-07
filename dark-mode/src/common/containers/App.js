import React, {useCallback, useState} from 'react';
import {ThemeProvider} from "../../utils/DarkModeContext";
import '../../styles/_dark-mode.scss';
import '../styles/_main-container.scss'

export default function App({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = useCallback(
    (event) => {
      if(event) event.preventDefault();
      setDarkMode(prev => !prev);
    },
    [],
  );
  return (
    <ThemeProvider value={{darkMode, toggleDarkMode}}>
      <div className={`app-container${darkMode ? ' dark-mode': ''}`}>
        {children}
      </div>
    </ThemeProvider>
  );
}
