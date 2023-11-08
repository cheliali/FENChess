import { formatFenString } from "../../../utils/fen-formatter";

export const useChessBoard = (fenInput: string[]) => {
  const chessBoardRows = Array.from({ length: 9 }, (_, i) => i + 1);
  const chessBoardColumns = Array.from({ length: 9 }, (_, i) =>
    String.fromCharCode(97 + i)
  );

  const formatFen = (index: number) => {
    const formattedFenArr = formatFenString(fenInput[index]);

    if (formattedFenArr.length !== 8) return fenInput[index].split("");
    return formattedFenArr;
  };

  const getModifier = (rowI: number, colI: number) => {
    if (rowI === 8) return "--hidden";
    if (colI === 8 && rowI < 8) return "--fenText";
    return "";
  };

  return {
    chessBoardRows,
    chessBoardColumns,
    formatFen,
    getModifier,
  };
};
