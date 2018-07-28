import React from "react";
import PropTypes from "prop-types";
import Shell from "./Shell";

const SQUARE_SIZE = 130;
class Board extends React.Component {
  static propTypes = {
    size: PropTypes.number.isRequired,
    shells: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        isOpen: PropTypes.bool.isRequired,
        hasBall: PropTypes.bool.isRequired
      })
    ).isRequired
  };
  constructor(props) {
    super(props);
    const shells = props.shells.reduce(
      (acc, shell) => ({
        ...acc,
        [shell.id]: shell
      }),
      {}
    );
    const shellsMap = props.shells.map(({ id }) => id);
    this.state = {
      shells,
      shellsMap
    };
  }
  getPosition = (direction, { x, y, id }) => {
    const { size } = this.props;
    if (x < 0 || x > SQUARE_SIZE * (size - 1)) {
      console.error(`Shell ${id} tried to move beyond the board`);
    }
    switch (direction) {
      case "UP":
        return { x, y: Math.max(0, y - 1) };
      case "DOWN":
        return { x, y: Math.min(size, y + 1) };
      case "LEFT":
        return { x: Math.max(0, x - 1), y };
      case "RIGHT":
        return { x: Math.min(size, x + 1), y };
      case "UP_RIGHT":
        return { x: Math.min(size, x + 1), y: Math.max(0, y - 1) };
      case "UP_LEFT":
        return { x: Math.max(0, x - 1), y: Math.max(0, y - 1) };
      case "DOWN_LEFT":
        return { x: Math.max(0, x - 1), y: Math.min(size, y + 1) };
      case "DOWN_RIGHT":
        return { x: Math.min(size, x + 1), y: Math.min(size, y + 1) };
      default:
        return { x, y };
    }
  };
  move = (direction, id) => {
    const { shells } = this.state;
    const { x, y } = this.getPosition(direction, shells[id]);
    this.setState({
      shells: {
        ...shells,
        [id]: {
          ...shells[id],
          x,
          y
        }
      }
    });
  };
  render() {
    const { size } = this.props;
    const { shells, shellsMap } = this.state;
    const width = size * SQUARE_SIZE;
    const height = size * SQUARE_SIZE;
    return (
      <div className="board-container" style={{ width, height }}>
        {shellsMap.map(id => {
          const { x, y, isOpen, hasBall } = shells[id];
          const top = y * SQUARE_SIZE + 15;
          const left = x * SQUARE_SIZE + 15;
          return (
            <div
              key={id}
              style={{ position: "absolute", top, left, transition: "all .3s" }}
            >
              <Shell
                squareSize={SQUARE_SIZE}
                id={id}
                hasBall={hasBall}
                isOpen={isOpen}
              />
            </div>
          );
        })}
        <button onClick={() => this.move("UP", shellsMap[0])}>UP</button>
        <button onClick={() => this.move("DOWN", shellsMap[0])}>DOWN</button>
        <button onClick={() => this.move("LEFT", shellsMap[0])}>LEFT</button>
        <button onClick={() => this.move("RIGHT", shellsMap[0])}>RIGHT</button>
        <button onClick={() => this.move("UP_LEFT", shellsMap[0])}>
          UP_LEFT
        </button>
        <button onClick={() => this.move("UP_RIGHT", shellsMap[0])}>
          UP_RIGHT
        </button>
        <button onClick={() => this.move("DOWN_LEFT", shellsMap[0])}>
          DOWN_LEFT
        </button>
        <button onClick={() => this.move("DOWN_RIGHT", shellsMap[0])}>
          DOWN_RIGHT
        </button>
      </div>
    );
  }
}

export default Board;
