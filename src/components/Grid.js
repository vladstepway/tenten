import React, {Component} from "react";

class Grid extends Component {
    //Game board

    render() {
        return (
            <div className="Grid">
                {Array.from({length: 100}).map((i, index) =>
                    <div className="cell" key={index}/>
                )}
            </div>
        );
    }
}

export default Grid;
