import React from "react";
import {createStyles, makeStyles} from "@material-ui/core";

export default function GameBoardContainer(props) {


    const useStyles = makeStyles((theme) =>
        createStyles({
                boardContainer: {
                    width: '420px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    height: ' 400px',
                },
                coloredBoardContainer: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                }
            }
        ),
    );

    const handleMouseOver = (i, j, e) => {
        props.onBlockMove(i, j)
    }

    const handleColoredCells = () => {
        let coloredCells = [];
        let cells = props.targetCells;
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                coloredCells.push(
                    <div
                        className={(cells[i][j].className || '') + ' cell'}
                        style={{backgroundColor: cells[i][j].color}}
                        onMouseOver={e => handleMouseOver(i, j)}
                        key={i + "" + j}
                    />
                );
            }
        }
        return coloredCells;
    }

    const classes = useStyles();

    const colorCells = handleColoredCells();
    return (
        <div className={`${classes.boardContainer} ${classes.coloredBoardContainer}`}>
            {colorCells}
        </div>
    )
}