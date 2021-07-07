import React from 'react';
const ThemeContext = React.createContext({
  darkMode: false,
  toggleDarkMode: () => null
});
export const ThemeProvider = ThemeContext.Provider;
export const useThemeProvider = () => React.useContext(ThemeContext)
