import { ChessBoard } from "./components/molecules/chess-board/chess-board";
import { FenForm } from "./components/molecules/fen-form/fen-form";
import { useAppSelector } from "./store/hooks/store-hooks";
import "./FENChess.scss";

export const FENChess = () => {
  const { fenInputs } = useAppSelector((state) => state.fen);

  return (
    <div className="fen-chess">
      <h1>FEN Chess</h1>
      <p>Instructions</p>
      <div className="fen-chess__play-area">
        <FenForm />
        <ChessBoard fenInputs={fenInputs} />
      </div>
    </div>
  );
};
