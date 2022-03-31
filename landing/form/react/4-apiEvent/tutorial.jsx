class ShoppingList extends React.Component {
	render() {
		return (
			<div className="shopping-list">
				<h1>Lista de compras para {this.props.name}</h1>
				<ul>
					<li>Instagram</li>
					<li>WhatsApp</li>
					<li>Oculus</li>
				</ul>
			</div>
		);
	}
}

function Square(props) {
  return (
			<button className={`square ${props.highlight ? 'square-win' : ''}`} onClick={props.onClick}>
				{props.isSelected ? <b>{props.value}</b> : props.value}
			</button>
		);
}

class Board extends React.Component {

	renderSquare(i, pos, highlight) {
		return (
			<Square
        key={i}
				value={this.props.squares[i]}
				onClick={() => this.props.onClick(i, pos)}
				isSelected={this.props.selectedSquare == i ? true : false}
        highlight={highlight}
			/>
		);
	}

	render() {

    let indexSquares = 0;
    let board = [];
    for (let i = 1; i < 4; i++) {
      let squares = [];
      for (let j = 1; j < 4; j++) {
        let highlight = false;
        if (this.props.lines && (this.props.lines[0] == indexSquares || this.props.lines[1] == indexSquares || this.props.lines[2] == indexSquares)) {
          highlight = true;
        }
        squares.push(
          this.renderSquare(indexSquares, `y:${j} - x:${i}`, highlight)
        );
        indexSquares ++;
      }
      board.push(
        <div key={i} className="board-row">
          {squares}
        </div>
      );
    }	
		return (
			<div>
				<div className="status">{status}</div>
				{board}
			</div>
		);
	}
}

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			history: [
				{
					squares: Array(9).fill(null),
					pos: '',
					selectedSquare: null,
				},
			],
			xIsNext: true,
			stepNumber: 0,
			selectedSquare: null,
			orderHistoryAsc: true,
			moves: [],
      isFinished: false,
		};
	}
	handleClick(i, pos) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		// const history = this.state.history;
		const current = history[history.length - 1];
		const squares = current.squares.slice();
		// const squares = this.state.squares.slice();
		if (calculateWinner(squares) || squares[i]) {
      return;
		}
    this.state.isFinished = false;
    const emptySquares = squares.filter((item, index) => {
      return item === null
    });
    console.log(emptySquares);
    if(emptySquares.length === 1) {
      this.state.isFinished = true;
    }
		squares[i] = this.state.xIsNext ? 'X' : 'O';
		this.setState({
			history: history.concat([
				{
					squares: squares,
					pos: pos,
					selectedSquare: i,
				},
			]),
			xIsNext: !this.state.xIsNext,
			stepNumber: history.length,
		});
	}
	jumpTo(step) {
		this.setState({
			xIsNext: step % 2 === 0,
			stepNumber: step,
		});
	}
	switchOrder() {
    this.setState({
      orderHistoryAsc: !this.state.orderHistoryAsc,
    });
  }
	render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winner = calculateWinner(current.squares);

		this.state.moves = history.map((step, i) => {
			const desc = i
				? 'Go to move #' + i + ` {${step.pos}}`
				: 'Go to game start';
			return (
				<li key={i}>
					<button onClick={() => this.jumpTo(i)}>{desc}</button>
				</li>
			);
		}).sort((a, b) => {
      if(this.state.orderHistoryAsc){
        return a.key - b.key;
      } else {
        return b.key - a.key;
      }
    });


		let status;
		if (winner) {
			status = 'Winner: ' + winner.team;
		} else if (this.state.isFinished) {
			status = 'Empate';
		} else {
			status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

		return (
			<div className="game">
				<div className="game-board">
					<Board
						lines={winner ? winner.line : null}
						squares={current.squares}
						selectedSquare={current.selectedSquare}
						onClick={(i, pos) => this.handleClick(i, pos)}
					/>
				</div>
				<div className="game-info">
					<button onClick={() => this.switchOrder()}>
						{!this.state.orderHistoryAsc ? '👆 asc' : '👇 dsc'}
					</button>
					<div>{status}</div>
					<ul>{this.state.moves}</ul>
				</div>
			</div>
		);
	}
}

// ========================================

const domContainer = document.querySelector('#appreact');

ReactDOM.render(<React.StrictMode><Game /></React.StrictMode>, domContainer);

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
				return {team: squares[a], line: lines[i]};
			}
		}
		return null;
	}
