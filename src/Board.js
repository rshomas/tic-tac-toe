import React from 'react';
import { Square } from './Square'

export class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={ this.props.squares[i] }
        onClick={ () => this.props.onClick(i) }
      />
    );
  }

  render() {
    let rows = [];
    for (let row = 0; row < 3; row++) {
      let cols = [];
      for (let col = 0; col < 3; col++) {
        cols.push(this.renderSquare(row * 3 + col));
      }
      rows.push(
      <div className="board-row">
        { cols }
      </div>);
    }
    return (
      <div>
        { rows }
      </div>
    );

  }
}