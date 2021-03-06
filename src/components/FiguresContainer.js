import React from "react";
import Figure from "./Figure";
import {createStyles, makeStyles} from "@material-ui/core";

export default function FiguresContainer(props) {

    const useStyles = makeStyles((theme) =>
        createStyles({
                container: {
                    height: '400px',
                    width: '110px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    marginLeft: '20px',
                }
            }
        ),
    );

    const classes = useStyles();

    const handleDrop = (index) => {
        props.onDrop(index)
    }

    const handleDrag = (index, leftX, topY) => {
        props.onDrag(leftX, topY, index);
    }

    return (
        <div className={classes.container}>
            {props.srcCells.map((figure, index) =>
                <Figure key={index}
                        isDrag={handleDrag.bind(this, index)}
                        isDrop={handleDrop.bind(this, index)}
                        figure={figure}/>
            )}
        </div>
    );

}