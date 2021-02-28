import React, {Component} from "react";

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
}

export default App;