import { ChessBoard } from "./components/molecules/chess-board/chess-board";
import { FenForm } from "./components/molecules/fen-form/fen-form";
import { useAppDispatch } from "./store/hooks/store-hooks";
import { useEffect } from "react";
import { startGame } from "./store/fen/fen-slice";
import "./FENChess.scss";

export const FENChess = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const savedFenInput = localStorage.getItem("fen Inputs");
    if (savedFenInput) dispatch(startGame(JSON.parse(savedFenInput)));
  }, []);

  return (
    <div className="fen-chess">
      <h1>FEN Chess</h1>
      <div className="fen-chess__instructions">
        <h3>Instructions</h3>
        <ul>
          <li>
            Press Start Game to set all the pieces in a conventional initial
            chess position if desired.
          </li>
          <li>Press Reset to clear chessboard.</li>
          <li>
            FEN Input only accepts the following characters :{" "}
            <ul>
              <li>p: pawn</li>
              <li>n: knight</li>
              <li>r: rook</li>
              <li>b: bishop</li>
              <li>q: queen</li>
              <li>k: king</li>
              <li>numbers from 1 to 8</li>
            </ul>
          </li>
          <li>
            Use lowercase characters for black pieces and uppercase for white
            pieces
          </li>
          <li>A valid FEN Input represents exactly 8 squares per row</li>
          <li>You can change the chess theme with the theme selector</li>
        </ul>
      </div>
      <div className="fen-chess__play-area">
        <FenForm />
        <ChessBoard />
      </div>
    </div>
  );
};
