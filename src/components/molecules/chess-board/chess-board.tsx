import { Fragment, FC } from "react";
import { useChessBoard } from "./use-chess-board";
import { Piece } from "../../../store/fen/fen-slice";
import "./chess-board.scss";
interface ChessBoardProps {
  fenInputs: string[];
}

export const ChessBoard: FC<ChessBoardProps> = ({ fenInputs }) => {
  const {
    chessBoardRows,
    chessBoardColumns,
    selectedPiece,
    replaceText,
    showPieces,
    formatFen,
    getModifier,
    selectPiece,
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
                  selectPiece(currentRow, currentCol, currentFenArray);
                }}
                className={`chess-board__square${getModifier(
                  currentRow,
                  currentCol
                )}`}
                key={`${currentRow}-${currentCol}`}
              >
                {currentCol < 8
                  ? replaceText(currentFenArray[currentCol])
                  : fenInputs[currentRow]}
              </div>
            ))}
          </Fragment>
        );
      })}
      <div>{selectedPiece && showPieces(selectedPiece)}</div>
    </div>
  );
};
