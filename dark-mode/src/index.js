import React from "react";
import ReactDOM from "react-dom";

import AppContainer from "./common/containers/App";

import { ThemeProvider } from "./contexts/ThemeContext";

import "./styles/_main.scss";
import Routes from "./routes";

ReactDOM.render(
	<ThemeProvider>
		<AppContainer>
			<Routes />
		</AppContainer>
	</ThemeProvider>,
	document.getElementById("root")
);
