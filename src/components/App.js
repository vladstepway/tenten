import React, { useState } from 'react';
import './App.css';
import GameContainer from './GameContainer';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isMusicOn, turnMusic] = useState(true);
  const [isNotReady, setIsNotReady] = useState(false);
  const themeType = darkMode ? 'dark' : 'light';
  const theme = createMuiTheme({
    palette: {
      type: themeType,
      //#4527a0 for light theme
      primary: {
        light: 'rgba(129, 212, 250, 0.5)',
        main: '#f44336',
        dark: '#42a5f5',
        contrastText: '#000',
      },
      //#ffecb3 for dark
      secondary: {
        light: 'rgba(117, 124, 232, 0.5)',
        main: '#3f50b5',
        dark: '#4527a0',
        contrastText: '#fff',
      },
      additional: {
        light: '#eda',
      },
    },
  });

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };
  const handleMusicTurn = () => {
    turnMusic(!isMusicOn);
    console.log('music turn');
  };

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <CssBaseline />
        <GameContainer
          theme={theme}
          shadowColor={
            darkMode
              ? theme.palette.secondary.light
              : theme.palette.primary.light
          }
          isDarkMode={darkMode}
          onThemeChange={handleThemeChange}
          isMusicOn={isMusicOn}
          onMusicTurn={handleMusicTurn}
        />
      </React.Fragment>
    </ThemeProvider>
  );
}
