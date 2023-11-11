import {
  Piece,
  whitePieces,
  blackPieces,
} from "../../../../store/fen/fen-slice";
import { useAppSelector } from "../../../../store/hooks/store-hooks";
import { getFenArray } from "../../../../utils/fen-formatter";
import { usePieceActions } from "./use-piece-actions";

export const useChessBoard = () => {
  const { selectedSpot, selectedPiece, fenInputs } = useAppSelector(
    (state) => state.fen
  );
  const chessBoardRows = Array.from({ length: 9 }, (_, i) => i + 1);
  const chessBoardColumns = Array.from({ length: 9 }, (_, i) =>
    String.fromCharCode(97 + i)
  );

  const getPieceColor = (piece: Piece | undefined) =>
    Object.keys(whitePieces).includes(piece ?? "") ? "white" : "black";

  const getPieceCoordinates = () => {
    const prevRow = +selectedSpot!.slice(0, selectedSpot!.indexOf("-"));
    const prevCol = +selectedSpot!.slice(selectedSpot!.indexOf("-") + 1);

    return { prevRow, prevCol };
  };
  const { showPieces, selectPiece, unselectPiece, movePiece } = usePieceActions(
    {
      fenInputs,
      getPieceColor,
      getPieceCoordinates,
    }
  );

  const formatFen = (rowI: number) => getFenArray(fenInputs[rowI]);

  const getClass = (rowI: number, colI: number) => {
    const baseClass = "chess-board__square";
    if (rowI === 8) return `${baseClass}--hidden`;
    if (colI === 8 && rowI < 8) return `${baseClass}--fenText`;
    if (selectedSpot && selectedSpot === `${rowI}-${colI}`)
      return `${baseClass} ${baseClass}--clicked`;
    return baseClass;
  };

  const renderPieceImg = (piece: Piece | undefined) => {
    if (piece) {
      return (
        <img width="50px" src={{ ...whitePieces, ...blackPieces }[piece]} />
      );
    }
  };

  const handlePieceActions = (
    currentRow: number,
    currentCol: number,
    currentFenArray: (Piece | undefined)[]
  ) => {
    if (!selectedSpot && !selectedPiece)
      return selectPiece(currentRow, currentCol, currentFenArray);

    if (selectedSpot && selectedSpot === `${currentRow}-${currentCol}`)
      return unselectPiece();

    const { prevRow, prevCol } = getPieceCoordinates();
    const prevPieceColor = getPieceColor(selectedPiece);
    const currentPieceColor = getPieceColor(currentFenArray[currentCol]);

    if (
      currentFenArray[currentCol] === undefined ||
      prevPieceColor !== currentPieceColor
    ) {
      movePiece(prevRow, prevCol, currentRow, currentCol);
      unselectPiece();
    }
  };

  return {
    chessBoardRows,
    chessBoardColumns,
    selectedPiece,
    fenInputs,
    renderPieceImg,
    showPieces,
    formatFen,
    getClass,
    handlePieceActions,
  };
};
