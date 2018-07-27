import React from "react";
import PropTypes from "prop-types";
import Shell from "./Shell";

const SQUARE_SIZE = 130;

const Board = ({ size, shells }) => {
  const width = size * SQUARE_SIZE;
  const height = size * SQUARE_SIZE;
  return (
    <div className="board-container" style={{ width, height }}>
      {shells.map(({ id, x, y, isOpen, hasBall }) => {
        const top = y * SQUARE_SIZE + 15;
        const left = x * SQUARE_SIZE + 15;
        return (
          <div key={id} style={{ position: "absolute", top, left }}>
            <Shell
              squareSize={SQUARE_SIZE}
              id={id}
              hasBall={hasBall}
              isOpen={isOpen}
            />
          </div>
        );
      })}
    </div>
  );
};
Board.propTypes = {
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
export default Board;
