import { Fragment, FC } from "react";
import { Piece } from "../../../store/fen/fen-slice";
import "./chess-board.scss";
import { useChessBoard } from "./hooks/use-chess-board";
interface ChessBoardProps {
  fenInputs: string[];
}

export const ChessBoard: FC<ChessBoardProps> = ({ fenInputs }) => {
  const {
    chessBoardRows,
    chessBoardColumns,
    selectedPiece,
    renderPieceImg,
    showPieces,
    formatFen,
    getClass,
    handlePieceActions,
  } = useChessBoard(fenInputs);

  return (
    <div className="chess-board">
      {chessBoardRows.map((_, currentRow) => {
        let currentFenArray: (Piece | undefined)[] = [];
        if (currentRow < 8) {
          currentFenArray = formatFen(currentRow);
        }
        return (
          <Fragment key={currentRow}>
            {chessBoardColumns.map((_, currentCol) => (
              <div
                onClick={() => {
                  handlePieceActions(currentRow, currentCol, currentFenArray);
                }}
                className={getClass(currentRow, currentCol)}
                key={`${currentRow}-${currentCol}`}
              >
                {currentCol < 8
                  ? renderPieceImg(currentFenArray[currentCol])
                  : fenInputs[currentRow]}
              </div>
            ))}
          </Fragment>
        );
      })}
      <div className="chess-board__pieces-options">
        {selectedPiece && showPieces(selectedPiece)}
      </div>
    </div>
  );
};
