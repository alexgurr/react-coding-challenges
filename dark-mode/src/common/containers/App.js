import React, { useReducer }from 'react';
import AppContext from '../../context/AppContext';
import APPTHEME from '../../constant/appTheme';

const initState = {
  theme: APPTHEME.LIGHT
};

const htmlRoot = document.getElementsByTagName('html')[0];

const reducer = (state, action) => {
    switch (action.type) {
        case 'setLightTheme':
          htmlRoot.classList.remove('dark-mode');
          return Object.assign({}, state, { theme: APPTHEME.LIGHT });
        case 'setDarkTheme':
          htmlRoot.classList.add('dark-mode');
          return Object.assign({}, state, { theme: APPTHEME.DARK });
        default: return state;
    }
}

export default function App({ children }) {
  const [state, dispatch] = useReducer(reducer, initState);

  return <AppContext.Provider value={{ state, dispatch }}>
    {children}
  </AppContext.Provider>;
}
