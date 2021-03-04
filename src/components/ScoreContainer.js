import React from "react";
import {createStyles, makeStyles} from "@material-ui/core";

export default function ScoreContainer(props) {
    const useStyles = makeStyles((theme) =>
        createStyles({
                score: {
                    backgroundColor: props.isDarkMode ? theme.palette.secondary.dark : theme.palette.primary.dark,
                    fontSize: '20px',
                    marginLeft: '20px'
                }
            }
        ),
    );

    const classes = useStyles();
    return (
        <div className={classes.score}>
            score: {props.score}
        </div>
    );
}