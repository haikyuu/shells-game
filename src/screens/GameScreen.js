import React from "react";
import Board from "../components/Board";

const SHELLS = [
  { id: "1", x: 0, y: 2, isOpen: true, hasBall: false },
  { id: "2", x: 2, y: 2, isOpen: true, hasBall: true },
  { id: "3", x: 4, y: 2, isOpen: true, hasBall: false }
];
const GameScreen = () => {
  return <Board size={6} shells={SHELLS} />;
};

export default GameScreen;
