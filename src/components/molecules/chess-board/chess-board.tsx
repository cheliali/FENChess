import { Fragment, FC } from "react";
import "./chess-board.scss";

interface ChessBoardProps {
  fenInput: string[];
}

export const ChessBoard: FC<ChessBoardProps> = ({ fenInput }) => {
  const chessBoardRows = Array.from({ length: 9 }, (_, i) => i + 1);
  const chessBoardColumns = Array.from({ length: 9 }, (_, i) =>
    String.fromCharCode(97 + i)
  );
  const resetedFenInput = Array.from({ length: 8 }, () => "");

  //TODO: VALIDAR QUE LAS LETRAS SEAN CORRECTAS Y QUE EL INPUT NO SEA MAYOR DE 8
  const pieces = ["p", "r", "n", "b", "k", "q"];

  const formatFen = (index: number) => {
    const formattedFenArr = fenInput[index]
      .split("")
      .reduce((prev: string[], cur) => {
        if (isNaN(+cur)) return [...prev, cur];

        const spaces = Array.from({ length: +cur }, () => "");
        return [...prev, ...spaces];
      }, []);

    if (formattedFenArr.length !== 8) return fenInput[index].split("");
    return formattedFenArr;
  };

  const getModifier = (rowI: number, colI: number) => {
    if (rowI === 8) return "--hidden";
    if (colI === 8 && rowI < 8) return "--fenText";
    return "";
  };

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
