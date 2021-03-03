import React, {useState} from "react";
import "./App.css";
import GameContainer from "./GameContainer";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles'
import {CssBaseline} from "@material-ui/core";


export default function App() {

    const [darkMode, setDarkMode] = useState(false);
    const themeType = darkMode ? "dark" : "light";
    const theme = createMuiTheme({
        palette: {
            type: themeType,
            //#4527a0 for light theme
            primary: {
                light: '#ff7961',
                main: '#f44336',
                dark: '#ba000d',
                contrastText: '#000',

            },
            //#ffecb3 for dark
            secondary: {
                light: '#757ce8',
                main: '#3f50b5',
                dark: '#002884',
                contrastText: '#fff',
            },
        }
    });

    const handleThemeChange = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div>
            <ThemeProvider theme={theme}>
                <React.Fragment>
                    <CssBaseline/>
                    <GameContainer/>
                </React.Fragment>
            </ThemeProvider>
        </div>
    );
}