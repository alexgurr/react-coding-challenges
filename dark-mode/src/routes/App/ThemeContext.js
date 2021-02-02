import React from 'react';

export const themes = {
    dark: 'dark-mode',
    light: 'light-mode'
};

const ThemeContext = React.createContext({
    theme: themes.light,
    toggleTheme: () => { },
});

export default ThemeContext;
