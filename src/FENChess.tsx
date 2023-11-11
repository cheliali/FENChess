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
      <p>Instructions</p>
      <p>Press Start Game to set all the pieces in an initial position</p>
      <div className="fen-chess__play-area">
        <FenForm />
        <ChessBoard />
      </div>
    </div>
  );
};
