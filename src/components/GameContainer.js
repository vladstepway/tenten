import React from "react";
import BoardContainer from "./BoardContainer";
import GameBoardContainer from "./GameBoardContainer";
import NewFiguresContainer from "./NewFigures";

export default function GameContainer(props) {
    console.log(props)
    return (
        <div className="App">
            <div style={{position: 'relative'}}>
                <BoardContainer/>
                <GameBoardContainer
                    isDragging={props.isDragging}
                    targetCells={props.targetCells}
                    block={props.block}
                    onBlockMove={props.onBlockMove}
                />
            </div>
            <NewFiguresContainer
                onDrag={props.onDrag}
                onDrop={props.onDrop}
                srcCells={props.srcCells}
            />
        </div>
    );
}