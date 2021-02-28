import React, {Component} from "react";
import BlockFactory from "../utils/BlockFactory";

const SHADOW_COLOR = "rgba(255, 96, 96, .3)"//Shadow color
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            srcCells: this.initSrcCells(),
            score: 0,
            targetCells: this.initTargetCells(),
            isDragging: false,
            canDrop: true,
            dragBlock: {}
        };
        this.handleDrag = this.handleDrag.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.drawShadow = this.drawShadow.bind(this);
        this.reStart = this.reStart.bind(this);
    }

    initSrcCells() {
        let srcCells = [];
        for (let m = 0; m < 3; m++) {
            srcCells.push(BlockFactory.generateFigure())
        }
        return srcCells;
    }

    initTargetCells(){
        let targetCells = [];
        for (let i = 0; i < 10; i++) {
            targetCells.push([]);
            for (let j = 0; j < 10; j++) {
                targetCells[i][j] = {
                    color: "transparent",
                    className: '',
                    fill: 0
                };
            }
        }
        return targetCells;
    }

    handleDrag(x, y, i) {
        let srcCells = this.state.srcCells;
        srcCells[i].style = {
            position: "absolute",
            transform: "scale(2)",
            left: x,
            top: y
        }
        this.setState({
            srcCells,
            isDragging: true,
            dragBlock: srcCells[i]
        });
    }
}

export default App;