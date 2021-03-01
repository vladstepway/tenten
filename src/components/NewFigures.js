import React, {Component} from "react";
import Figure from "./Figure";

export default class NewFigures extends Component {
    //Figures
    constructor(props) {
        super(props);
        this.handleDrag = this.handleDrag.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
    }

    handleDrag(i, x, y) {
        this.props.onDrag(x, y, i);
    }

    handleDrop(i) {
        this.props.onDrop(i)
    }

    render() {
        return (
            <div className="container">
                {this.props.srcCells.map((figure, index) =>
                    <Figure key={index} isDrag={this.handleDrag.bind(this, index)}
                            isDrop={this.handleDrop.bind(this, index)} block={figure}/>
                )}
            </div>
        );
    }
}