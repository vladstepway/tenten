import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core';
import clickSound from './../assets/sounds/click.mp3';

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
      // blockContainer:hover {
      //     transform:'',
      // },
      blockCell: {
        width: '20px',
        height: '20px',
        marginRight: '2px',
        borderRadius: '2px',
        display: 'inline-block',
      },
    }),
  );

  const handleMouseDown = (e) => {
    e.preventDefault();
    let moveHandler = (e) => {
      //is dragging from app
      let x = e.clientX;
      let y = e.clientY;
      props.isDrag(x, y);
    };
    document.onmousemove = moveHandler;
    document.ontouchmove = moveHandler;
    let upHandler = (e) => {
      if (!e.target.className.includes(' cell')) {
        //Pitted to death by blank space
        return;
      }
      //It’s not tied to Tetris because the z-index of the grid is on Tetris, so Tetris cannot listen to mouseup.
      //Notify the end of the drag
      props.isDrop();
      document.onmousemove = null;
    };
    document.onmouseup = upHandler;
    document.ontouchend = upHandler;
  };

  const classes = useStyles();
  return (
    <div
      className={classes.blockContainer}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      style={props.figure.style}
    >
      {props.figure.shape.map((shape, index) => (
        <div
          key={index}
          className={classes.blockCell}
          style={{ background: shape ? props.figure.color : 'transparent' }}
        />
      ))}
    </div>
  );
}
