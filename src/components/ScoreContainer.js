import React from "react";

export default function ScoreContainer(props) {
    return (
        <div className="score">
            score: {props.score}
        </div>
    );
}