import React from "react";
import { Board } from './Board';

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
      ascendingSort: true,
    }
  }
  
  handleClick(i) {
    this.setState((state) => {
      const history = state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = state.xIsNext ? 'X' : 'O';
      return ({
        history: history.concat([{
          squares: squares,
        }]),
        stepNumber: history.length,
        xIsNext: !state.xIsNext,
      });
    });
  }

  handleSort() {
    this.setState((state) => ({
      ascendingSort: !state.ascendingSort,
    }));
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((move, step) => {
      const delta = step ?
        move.squares.findIndex((el, index) => {
            return (el !== history[step-1].squares[index]);
        }) : 0;
      const row = ~~(delta / 3) + 1;
      const col = (delta % 3) + 1;
      const desc = step ?
        'Go to move #' + step + ' (' + col + ', ' + row + ')' :
        'Go to game start';
      return (
        <li key={step}>
          <button
            className={ step === this.state.stepNumber ? 'current-step' : '' }
            onClick={ () => this.jumpTo(step) }
          >
            {desc}
          </button>
        </li>
      )
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }


    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={ current.squares }
            onClick={ (i) => this.handleClick(i) }
          />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <button
            onClick={ () => this.handleSort() }>
            { this.state.ascendingSort ? 'Ascending' : 'Descending' }
          </button>
          <ol>{ this.state.ascendingSort ? moves : moves.reverse() }</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}