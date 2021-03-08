import React from 'react';

export default function GameBoardContainer(props) {
  const handleMouseOver = (i, j, e) => {
    props.onBlockMove(i, j);
  };

  const handleColoredCells = () => {
    let coloredCells = [];
    let cells = props.targetCells;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        coloredCells.push(
          <div
            className={(cells[i][j].className || '') + ` cell`}
            style={{ backgroundColor: cells[i][j].color }}
            onMouseOver={(e) => handleMouseOver(i, j)}
            key={i + '' + j}
          />,
        );
      }
    }
    return coloredCells;
  };

  const colorCells = handleColoredCells();
  return (
    <div className={`boardContainer coloredBoardContainer`}>{colorCells}</div>
  );
}
