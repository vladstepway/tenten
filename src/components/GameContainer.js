import React from 'react';
import BoardContainer from './BoardContainer';
import GameBoardContainer from './GameBoardContainer';
import FiguresContainer from './FiguresContainer';
import BlockFactory from '../utils/BlockFactory';
import ControlPanel from './ControlPanel';
import ScoreContainer from './ScoreContainer';
import { withStyles } from '@material-ui/core';

//https://stackoverflow.com/questions/56554586/how-to-use-usestyle-to-style-class-component-in-material-ui
const useStyles = withStyles(
  (theme) => ({
    header: (props) => ({
      backgroundColor: props.isDarkMode
        ? theme.palette.secondary.dark
        : theme.palette.primary.dark,
      display: 'flex',
    }),
    app: (props) => ({
      display: 'flex',
      padding: '5%',
      justifyContent: 'center',
      boxSizing: 'border-box',
      width: '100%',
      position: 'absolute',
      backgroundColor: props.isDarkMode
        ? theme.palette.secondary.dark
        : theme.palette.primary.dark,
    }),
    gameBoard: () => ({
      position: 'relative',
    }),
  }),
  { withTheme: true },
);

const GameContainer = useStyles(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        score: 0,
        srcCells: this.initSrcCells(),
        targetCells: this.initTargetCells(),
        isDragging: false,
        canDrop: true,
        dragBlock: {},
      };
      this.handleDrag = this.handleDrag.bind(this);
      this.handleDrop = this.handleDrop.bind(this);
      this.onBlockMove = this.onBlockMove.bind(this);
      this.reStart = this.reStart.bind(this);
    }

    initSrcCells() {
      let srcCells = [];
      for (let m = 0; m < 3; m++) {
        srcCells.push(BlockFactory.generateFigure());
      }
      return srcCells;
    }

    initTargetCells() {
      let targetCells = [];
      for (let i = 0; i < 10; i++) {
        targetCells.push([]);
        for (let j = 0; j < 10; j++) {
          targetCells[i][j] = {
            color: 'transparent',
            className: '',
            fill: 0,
          };
        }
      }
      return targetCells;
    }

    handleDrag(x, y, i) {
      let srcCells = this.state.srcCells;
      srcCells[i].style = {
        position: 'absolute',
        transform: 'scale(2)',
        left: x,
        top: y,
      };
      this.setState({
        srcCells,
        isDragging: true,
        dragBlock: srcCells[i],
      });
    }

    //handle figure dropping
    handleDrop(figureIndex) {
      let onGrid = false; //is figure on grid
      let cells = this.state.targetCells;
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          if (cells[i][j].color === this.props.shadowColor) {
            onGrid = true;
            break;
          }
        }
      }
      if (this.state.canDrop && onGrid) {
        let score = this.state.score;
        let color = this.state.dragBlock.color;
        for (let i = 0; i < 10; i++) {
          for (let j = 0; j < 10; j++) {
            if (cells[i][j].color === this.props.shadowColor) {
              score += 1;
              cells[i][j] = {
                color: color,
                fill: 1,
              };
            }
          }
        }
        let srcCells = this.state.srcCells;
        let index = this.state.srcCells.indexOf(this.state.dragBlock);
        srcCells.splice(index, 1);
        if (srcCells.length === 0) {
          srcCells = this.initSrcCells();
        }
        this.setState({
          targetCells: cells,
          score: score,
          isDragging: false,
          srcCells: srcCells,
        });
        this.clearBlock();
      } else {
        let srcCells = this.state.srcCells;
        srcCells[figureIndex].style = {};
        this.setState({
          srcCells,
          isDragging: false,
          dragBlock: null,
          targetCells: this.clearShadow(),
          canDrop: true,
        });
      }
      //   const [isPlaying, playMusic] = useAudio('./sounds/click.mp3');
    }

    clearBlock() {
      //clear board
      let cells = this.state.targetCells;
      let score = this.state.score;
      //rows detection
      for (let i = 0; i < 10; i++) {
        if (cells[i].every((cell) => cell.fill)) {
          score += 10;
          for (let cell of cells[i]) {
            cell.fill = 0;
            cell.color = 'transparent';
            cell.className = 'disappear';
          }
        }
      }
      //cols detection
      for (let i = 0; i < 10; i++) {
        if (cells.every((row) => row[i].fill)) {
          score += 10;
          for (let row of cells) {
            row[i].fill = 0;
            row[i].color = 'transparent';
            row[i].className = 'disappear';
          }
        }
      }
      this.setState({
        targetCells: cells,
        score,
      });
    }

    clearShadow() {
      let cells = this.state.targetCells;
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          if (
            !cells[i][j].fill &&
            cells[i][j].color === this.props.shadowColor
          ) {
            cells[i][j] = {
              color: 'transparent',
            };
          }
        }
      }
      return cells;
    }

    //Draw the shadow when the block moves
    onBlockMove(x, y) {
      if (this.state.isDragging) {
        let cells = this.clearShadow();
        let { shape } = this.state.dragBlock;
        //Fill shadow
        let startX = x - 2,
          startY = y - 2,
          canDrop = true;
        for (let m = 0; m < 5; m++) {
          for (let n = 0; n < 5; n++) {
            let cellX = startX + m,
              cellY = startY + n;
            if (
              cellX >= 0 &&
              cellX < 10 &&
              cellY >= 0 &&
              cellY < 10 &&
              shape[m * 5 + n]
            ) {
              if (!cells[cellX][cellY].fill) {
                //is unfilled
                cells[cellX][cellY] = {
                  color: this.props.shadowColor,
                };
              } else {
                canDrop = false;
              }
            }
          }
        }
        this.setState({
          targetCells: cells,
          canDrop,
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
        dragBlock: {},
      });
    }

    render() {
      const { classes } = this.props;

      return (
        <div>
          <div className={classes.header}>
            <ControlPanel
              isDarkMode={this.props.isDarkMode}
              onRestartClick={this.reStart}
              onThemeChange={this.props.onThemeChange}
              isMusicOn={this.props.isMusicOn}
              onMusicTurn={this.props.onMusicTurn}
            />
            <ScoreContainer
              score={this.state.score}
              isDarkMode={this.props.isDarkMode}
            />
          </div>
          <div className={classes.app}>
            <div className={classes.gameBoard}>
              <BoardContainer isDarkMode={this.props.isDarkMode} />
              <GameBoardContainer
                isDarkMode={this.props.isDarkMode}
                isDragging={this.state.isDragging}
                targetCells={this.state.targetCells}
                block={this.state.dragBlock}
                onBlockMove={this.onBlockMove}
                classes={classes}
              />
            </div>
            <FiguresContainer
              onDrag={this.handleDrag}
              onDrop={this.handleDrop}
              srcCells={this.state.srcCells}
            />
          </div>
        </div>
      );
    }
  },
);
export default GameContainer;

// export default function GameContainer(props) {
//
//     const useStyles = makeStyles((theme) =>
//         createStyles({
//                 header: {
//                     backgroundColor: props.isDarkMode ? theme.palette.secondary.dark : theme.palette.primary.dark,
//                     display: 'flex'
//                 }, app: {
//                     display: 'flex',
//                     padding: '5%',
//                     justifyContent: 'center',
//                     boxSizing: 'border-box',
//                     width: '100%',
//                     position: 'absolute',
//                     backgroundColor: props.isDarkMode ? theme.palette.secondary.dark : theme.palette.primary.dark,
//                 }, gameBoard: {
//                     position: 'relative'
//                 },
//
//             }
//         ),
//     );
//
//
//     const initSrcCells = () => {
//         let srcCells = [];
//         for (let m = 0; m < 3; m++) {
//             srcCells.push(BlockFactory.generateFigure())
//         }
//         return srcCells;
//     }
//
//     const initTargetCells = () => {
//         let targetCells = [];
//         for (let i = 0; i < 10; i++) {
//             targetCells.push([]);
//             for (let j = 0; j < 10; j++) {
//                 targetCells[i][j] = {
//                     color: "transparent",
//                     className: '',
//                     fill: 0
//                 };
//             }
//         }
//         return targetCells;
//     }
//
//     const [state, setState] = useState({
//         score: 0,
//         srcCells: initSrcCells(),
//         targetCells: initTargetCells(),
//         isDragging: false,
//         canDrop: true,
//         dragBlock: {}
//     })
//     // const [shadowColor, setShadowColor] = useState(props.isDarkMode ? props.theme.palette.secondary.light : props.theme.palette.primary.light)
//
//     const handleDrag = (x, y, i) => {
//         console.log('handleDrag', x, y, i)
//         let srcCells = state.srcCells;
//         srcCells[i].style = {
//             position: "absolute",
//             transform: "scale(2)",
//             left: x,
//             top: y
//         }
//         setState(prevState => ({
//             ...prevState,
//             srcCells,
//             isDragging: true,
//             dragBlock: srcCells[i],
//         }));
//     }
//
//     //handle figure dropping
//     const handleDrop = (figureIndex) => {
//         console.log('handleDrop', figureIndex)
//         let onGrid = false;//is figure on grid
//         let cells = state.targetCells
//         for (let i = 0; i < 10; i++) {
//             for (let j = 0; j < 10; j++) {
//                 if (cells[i][j].color === props.shadowColor) {
//                     onGrid = true;
//                     break;
//                 }
//             }
//         }
//         if (state.canDrop && onGrid) {
//             let score = state.score;
//             let color = state.dragBlock.color;
//             for (let i = 0; i < 10; i++) {
//                 for (let j = 0; j < 10; j++) {
//                     if (cells[i][j].color === props.shadowColor) {
//                         score += 1;
//                         cells[i][j] = {
//                             color: color,
//                             fill: 1
//                         };
//                     }
//                 }
//             }
//             let srcCells = state.srcCells;
//             let index = state.srcCells.indexOf(state.dragBlock)
//             srcCells.splice(index, 1)
//             if (srcCells.length === 0) {
//                 srcCells = initSrcCells()
//             }
//             setState(prevState => ({
//                 ...prevState,
//                 targetCells: cells,
//                 score: score,
//                 isDragging: false,
//                 srcCells: srcCells,
//             }));
//             clearBlock();
//         } else {
//             let srcCells = state.srcCells;
//             srcCells[figureIndex].style = {}
//             setState(prevState => ({
//                 ...prevState,
//                 srcCells: srcCells,
//                 isDragging: false,
//                 dragBlock: null,
//                 targetCells: clearShadow(),
//                 canDrop: true,
//             }));
//         }
//     }
//
//     const clearBlock = () => {//clear board
//         console.log('clearBlock')
//         let cells = state.targetCells;
//         let score = state.score;
//         //rows detection
//         for (let i = 0; i < 10; i++) {
//             if (cells[i].every(cell => cell.fill)) {
//                 score += 10;
//                 for (let cell of cells[i]) {
//                     cell.fill = 0;
//                     cell.color = 'transparent';
//                     cell.className = 'disappear';
//                 }
//             }
//         }
//         //cols detection
//         for (let i = 0; i < 10; i++) {
//             if (cells.every(row => row[i].fill)) {
//                 score += 10;
//                 for (let row of cells) {
//                     row[i].fill = 0;
//                     row[i].color = 'transparent';
//                     row[i].className = 'disappear';
//                 }
//             }
//         }
//         setState(prevState => ({
//             ...prevState,
//             targetCells: cells,
//             score,
//         }))
//     }
//
//     const clearShadow = () => {
//         let cells = state.targetCells;
//         for (let i = 0; i < 10; i++) {
//             for (let j = 0; j < 10; j++) {
//                 if (!cells[i][j].fill && cells[i][j].color === props.shadowColor) {
//                     cells[i][j] = {
//                         color: "transparent"
//                     };
//                 }
//             }
//         }
//         return cells
//     }
//
//     //Draw the shadow when the block moves
//     const drawShadow = (x, y) => {
//         console.log('drawShadow', x, y)
//         if (state.isDragging) {
//             let cells = clearShadow();
//             let {shape} = state.dragBlock
//             //Fill shadow
//             let startX = x - 2, startY = y - 2, canDrop = true;
//             for (let m = 0; m < 5; m++) {
//                 for (let n = 0; n < 5; n++) {
//                     let cellX = startX + m, cellY = startY + n;
//                     if (cellX >= 0 && cellX < 10 && cellY >= 0 && cellY < 10 && shape[m * 5 + n]) {
//                         if (!cells[cellX][cellY].fill) {
//                             //is unfilled
//                             cells[cellX][cellY] = {
//                                 color: props.shadowColor
//                             }
//                         } else {
//                             canDrop = false
//                         }
//                     }
//                 }
//             }
//             setState(prevState => ({
//                 ...prevState,
//                 targetCells: cells,
//                 canDrop,
//             }));
//         }
//     }
//
//     const reStart = () => {
//         setState(prevState => ({
//             ...prevState,
//             srcCells: initSrcCells(),
//             score: 0,
//             targetCells: initTargetCells(),
//             isDragging: false,
//             canDrop: true,
//             dragBlock: {},
//
//         }))
//     }
//
//     const classes = useStyles();
//
//     return (
//         <div>
//             <div className={classes.header}>
//                 <ControlPanel isDarkMode={props.isDarkMode}
//                               onRestartClick={reStart}
//                               onThemeChange={props.onThemeChange}/>
//                 <ScoreContainer score={state.score} isDarkMode={props.isDarkMode}/>
//             </div>
//             <div className={classes.app}>
//                 <div className={classes.gameBoard}>
//                     <BoardContainer isDarkMode={props.isDarkMode}/>
//                     <GameBoardContainer
//                         isDarkMode={props.isDarkMode}
//                         isDragging={state.isDragging}
//                         targetCells={state.targetCells}
//                         block={state.dragBlock}
//                         onBlockMove={drawShadow}
//                         classes={classes}
//                     />
//                 </div>
//                 <FiguresContainer
//                     onDrag={handleDrag}
//                     onDrop={handleDrop}
//                     srcCells={state.srcCells}
//                 />
//             </div>
//         </div>
//     );
// }
