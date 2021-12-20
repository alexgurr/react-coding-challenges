import React, { useState, createContext } from "react";
import Themes from "./constants/themes";

export const ThemeContext = createContext();

export const ThemeProvider = (props) => {
	const [currentTheme, setCurrentTheme] = useState(Themes.LIGHT); //can have this as bool. using string to support multiple themes.

	return (
		<ThemeContext.Provider value={[currentTheme, setCurrentTheme]}>
			{props.children}
		</ThemeContext.Provider>
	);
};
