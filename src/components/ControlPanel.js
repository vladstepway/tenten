import React from "react";

export default function ControlPanel(props) {
    console.log(props)
    return (
        <button className="newGameButton" onClick={props.onRestartClick}>Restart</button>
    );
}