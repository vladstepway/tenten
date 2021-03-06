import React, {useState} from "react";
import "./App.css";
import GameContainer from "./GameContainer";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles'
import {CssBaseline} from "@material-ui/core";


export default function App() {

    const [darkMode, setDarkMode] = useState(false);
    const [isNotReady, setIsNotReady] = useState(false);
    const themeType = darkMode ? "dark" : "light";
    const theme = createMuiTheme({
        palette: {
            type: themeType,
            //#4527a0 for light theme
            primary: {
                light: 'rgba(255, 121, 97, 0.3)',
                main: '#f44336',
                dark: '#ba000d',
                contrastText: '#000',

            },
            //#ffecb3 for dark
            secondary: {
                light: 'rgba(117, 124, 232, 0.3)',
                main: '#3f50b5',
                dark: '#4527a0',
                contrastText: '#fff',
            },
            additional: {
                light: '#eda'
            }
        }
    });

    const handleThemeChange = () => {
        setDarkMode(!darkMode);
    };

    return (
        <ThemeProvider theme={theme}>
            <React.Fragment>
                <CssBaseline/>
                <GameContainer isDarkMode={darkMode} onThemeChange={handleThemeChange}/>
            </React.Fragment>
        </ThemeProvider>
    );
}