import React from "react";
import {createStyles, makeStyles} from "@material-ui/core";

export default function Figure(props) {
    //Figure

    const useStyles = makeStyles((theme) =>
        createStyles({
                blockContainer: {
                    transition: 'transform .1s ease',
                    transformOrigin: '100% 100%',
                    marginTop: '20px',
                    height: '108px',
                    width: '110px',
                },
                blockCell: {
                    width: '20px',
                    height: '20px',
                    marginRight: '2px',
                    borderRadius: '2px',
                    display: 'inline-block',
                }
                // score: {
                //     backgroundColor: themeState ? theme.palette.secondary.light : theme.palette.primary.light
                // },
                // totalScore: {
                //     backgroundColor: themeState ? theme.palette.secondary.main : theme.palette.primary.main
                // }
            }
        ),
    );

    const handleMouseDown = (e) => {
        e.preventDefault()
        // console.log(e.target)
        let moveHandler = e => {
            //is dragging from app
            let x = e.clientX
            let y = e.clientY
            props.isDrag(x, y);
        };
        document.onmousemove = moveHandler
        document.ontouchmove = moveHandler
        let upHandler = e => {
            if (e.target.className !== ' cell') {//Pitted to death by blank space
                return
            }
            //It’s not tied to Tetris because the z-index of the grid is on Tetris, so Tetris cannot listen to mouseup.
            //Notify the end of the drag
            props.isDrop();
            document.onmousemove = null;
        };
        document.onmouseup = upHandler
        document.ontouchend = upHandler
    }

    const classes = useStyles();
    return (
        <div
            className={classes.blockContainer}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
            style={props.block.style}
        >
            {props.block.shape.map((shape, index) =>
                <div
                    key={index}
                    className={classes.blockCell}
                    style={{background: shape ? props.block.color : "transparent"}}
                />
            )}
        </div>
    );
}