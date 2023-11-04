import { Fragment, useState } from "react";
import { ChessBoard } from "./components/molecules/chess-board/chess-board";
import { Input } from "./components/atoms/input/input";

export const FENChess = () => {
  const resetedFenInput = Array.from({ length: 8 }, () => "");
  const startGameFen = [
    "RNBKQBNR",
    "PPPPPPPP",
    "8",
    "8",
    "8",
    "8",
    "pppppppp",
    "rnbqkbnr",
  ];

  const [fenInput, setFenInput] = useState(resetedFenInput);

  const startGame = () => {
    setFenInput(startGameFen);
  };

  return (
    <Fragment>
      <ChessBoard fenInput={fenInput} />
      <Input label="Row#" />
      <Input label="Input" />
      <button onClick={startGame}>Start</button>
    </Fragment>
  );
};
