import { Fragment, FC } from "react";
import { useChessBoard } from "./use-chess-board";
import "./chess-board.scss";

interface ChessBoardProps {
  fenInput: string[];
}

export const ChessBoard: FC<ChessBoardProps> = ({ fenInput }) => {
  const { chessBoardRows, chessBoardColumns, formatFen, getModifier } =
    useChessBoard(fenInput);

  return (
    <div className="chess-board">
      {chessBoardRows.map((row, rowI) => {
        let fenArray: string[] = [];
        if (rowI < 8) {
          fenArray = formatFen(rowI);
        }
        return (
          <Fragment key={row}>
            {chessBoardColumns.map((col, colI) => (
              <div
                //TODO ONCLICK
                className={`chess-board__square${getModifier(rowI, colI)}`}
                key={`${row}-${col}`}
              >
                {colI < 8 ? fenArray[colI] : fenInput[rowI]}
              </div>
            ))}
          </Fragment>
        );
      })}
    </div>
  );
};
