import { Fragment } from "react";
import { Piece } from "../../../store/fen/fen-slice";
import { useChessBoard } from "./hooks/use-chess-board";
import "./chess-board.scss";

export const ChessBoard = () => {
  const {
    chessBoardRows,
    chessBoardColumns,
    selectedPiece,
    fenInputs,
    renderPieceImg,
    showPieces,
    formatFen,
    getClass,
    handlePieceActions,
  } = useChessBoard();

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
                data-testid={`chess-block-${currentRow}-${currentCol}`}
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
