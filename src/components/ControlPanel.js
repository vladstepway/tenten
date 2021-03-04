import React from 'react';
import {Container, Switch} from "@material-ui/core";

export default function ControlPanel({onRestartClick, onThemeChange, isDarkMode}) {
    return (
        <div>
            <Switch color={'secondary'} checked={isDarkMode} onChange={onThemeChange}/>
            <button className="newGameButton" onClick={onRestartClick}>Restart</button>
        </div>

    );
}