import React, {Component} from "react";

export default class Figure extends Component {
    //Figure
    constructor(props) {
        super(props);
        this.handleMouseDown = this.handleMouseDown.bind(this);
    }

    handleMouseDown(e) {
        e.preventDefault()
        console.log(e.target)
        let moveHandler = e => {
            //is dragging from app
            let x = e.clientX
            let y = e.clientY
            this.props.isDrag(x, y);
        };
        document.onmousemove = moveHandler
        document.ontouchmove = moveHandler
        let upHandler = e => {
            if (e.target.className !== ' cell') {//Pitted to death by blank space
                return
            }
            //It’s not tied to Tetris because the z-index of the grid is on Tetris, so Tetris cannot listen to mouseup.
            //Notify the end of the drag
            this.props.isDrop();
            document.onmousemove = null;
        };
        document.onmouseup = upHandler
        document.ontouchend = upHandler
    }

    render() {
        return (
            <div
                className="block_container"
                onMouseDown={this.handleMouseDown}
                onTouchStart={this.handleMouseDown}
                style={this.props.block.style}
            >
                {this.props.block.shape.map((i, index) =>
                    <div
                        key={index}
                        className="block_cell"
                        style={{background: i ? this.props.block.color : "transparent"}}
                    />
                )}
            </div>
        );
    }
}