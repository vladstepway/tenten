import React, {Component} from "react";
import BlockFactory from "../utils/BlockFactory";
import "./App.css";
import ScoreContainer from "./ScoreContainer";
import GameContainer from "./GameContainer";
import ControlPanel from "./ControlPanel";

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

    initTargetCells() {
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

    //handle figure dropping
    handleDrop(i) {
        let onGrid = false;//is figure on grid
        let cells = this.state.targetCells
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (cells[i][j].color === SHADOW_COLOR) {
                    onGrid = true;
                    break;
                }
            }
        }
        if (this.state.canDrop && onGrid) {
            console.log('can drop')
            let score = this.state.score;
            let color = this.state.dragBlock.color;
            for (let i = 0; i < 10; i++) {
                for (let j = 0; j < 10; j++) {
                    if (cells[i][j].color === SHADOW_COLOR) {
                        score += 1;
                        cells[i][j] = {
                            color: color,
                            fill: 1
                        };
                    }
                }
            }
            let srcCells = this.state.srcCells;
            let index = this.state.srcCells.indexOf(this.state.dragBlock)
            srcCells.splice(index, 1)
            if (srcCells.length === 0) {
                srcCells = this.initSrcCells()
            }
            this.setState({
                targetCells: cells,
                score: score,
                isDragging: false,
                srcCells: srcCells
            });
            this.clearBlock();
        } else {
            console.log('cant drop')
            let srcCells = this.state.srcCells;
            srcCells[i].style = {}
            this.setState({
                srcCells,
                isDragging: false,
                dragBlock: null,
                targetCells: this.clearShadow(),
                canDrop: true
            });
        }
    }

    clearBlock() {//clear board
        let cells = this.state.targetCells;
        let score = this.state.score;
        //rows detection
        for (let i = 0; i < 10; i++) {
            if (cells[i].every(cell => cell.fill)) {
                score += 10;
                for (let cell of cells[i]) {
                    cell.fill = 0;
                    cell.color = 'transparent';
                    cell.className = 'dispear';
                }
            }
        }
        //cols detection
        for (let i = 0; i < 10; i++) {
            if (cells.every(row => row[i].fill)) {
                score += 10;
                for (let row of cells) {
                    row[i].fill = 0;
                    row[i].color = 'transparent';
                    row[i].className = 'dispear';
                }
            }
        }
        this.setState({
            targetCells: cells,
            score
        })

    }

    clearShadow() {
        let cells = this.state.targetCells;
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (!cells[i][j].fill && cells[i][j].color === SHADOW_COLOR) {
                    cells[i][j] = {
                        color: "transparent"
                    };
                }
            }
        }
        return cells
    }

    //Draw the shadow when the block moves
    drawShadow(x, y) {
        if (this.state.isDragging) {
            let cells = this.clearShadow();
            let {shape} = this.state.dragBlock
            //Fill shadow
            let startX = x - 2, startY = y - 2, canDrop = true;
            for (let m = 0; m < 5; m++) {
                for (let n = 0; n < 5; n++) {
                    let cellX = startX + m, cellY = startY + n;
                    if (cellX >= 0 && cellX < 10 && cellY >= 0 && cellY < 10 && shape[m * 5 + n]) {
                        if (!cells[cellX][cellY].fill) {
                            //is unfilled
                            cells[cellX][cellY] = {
                                color: SHADOW_COLOR
                            }
                        } else {
                            canDrop = false
                        }
                    }
                }
            }
            this.setState({
                targetCells: cells,
                canDrop
            });
        }
    }

    reStart() {
        this.setState({
            srcCells: this.initSrcCells(),
            score: 0,
            targetCells: this.initTargetCells(),
            isDragging: false,
            canDrop: true,
            dragBlock: {}
        })
    }

    openSettings() {

    }

    render() {
        return (
            <div>
                <ControlPanel onRestartClick={this.reStart} onSettingsClick={this.openSettings}/>
                <ScoreContainer score={this.state.score}/>
                <GameContainer
                    isDragging={this.state.isDragging}
                    targetCells={this.state.targetCells}
                    block={this.state.dragBlock}
                    onBlockMove={this.drawShadow}

                    onDrag={this.handleDrag}
                    onDrop={this.handleDrop}
                    srcCells={this.state.srcCells}
                />
            </div>
        );
    }
}

export default App;