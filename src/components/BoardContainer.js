import React from "react";

export default function BoardContainer() {
    return (
        <div className="boardContainer">
            {Array.from({length: 100}).map((i, index) =>
                <div className="cell" key={index}/>
            )}
        </div>
    );
}