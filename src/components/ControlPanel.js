import React from 'react';
import {createStyles, makeStyles, Switch} from "@material-ui/core";

export default function ControlPanel({onRestartClick, onThemeChange, isDarkMode}) {

    const useStyles = makeStyles((theme) =>
        createStyles({
                newGameButton: {
                    padding: '3px',
                    fontWeight: 600,
                    borderRadius: '4px',
                    marginLeft: '20px',
                    color: 'white',
                    backgroundColor: theme.palette.additional.light,
                    cursor: 'pointer',
                }
            }
        ),
    );

    const classes = useStyles();

    return (
        <div>
            <Switch color={'secondary'} checked={isDarkMode} onChange={onThemeChange}/>
            <button className={classes.newGameButton} onClick={onRestartClick}>Restart</button>
        </div>

    );
}