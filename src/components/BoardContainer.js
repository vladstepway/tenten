import React from "react";
import {createStyles, makeStyles} from "@material-ui/core";

export default function BoardContainer(props) {

    const useStyles = makeStyles((theme) =>
        createStyles({
                boardContainer: {
                    backgroundColor: props.isDarkMode ? theme.palette.secondary.dark : theme.palette.primary.dark,
                    width: '420px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    height: '400px',
                },
                cell: {
                    width: '9.2%',
                    height: '9.2%',
                    backgroundColor: props.isDarkMode ? theme.palette.secondary.main : theme.palette.primary.main,
                    transition: 'background-color .3s ease',
                    display: 'inline-block',
                    padding: 0,
                    margin: '2px 2px 0 0',
                    borderRadius: ' 2px',
                }
            }
        ),
    );

    const classes = useStyles();

    return (
        <div className={classes.boardContainer}>
            {Array.from({length: 100}).map((i, index) =>
                <div className={classes.cell} key={index}/>
            )}
        </div>
    );
}