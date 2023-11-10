import {
  Piece,
  setSelectedPiece,
  setSelectedSpot,
  updateFen,
  whitePieces,
  blackPieces,
} from "../../../store/fen/fen-slice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../store/hooks/store-hooks";
import { getFenArray, getFenString } from "../../../utils/fen-formatter";

export const useChessBoard = (fenInputs: string[]) => {
  const dispatch = useAppDispatch();
  const { selectedSpot, selectedPiece } = useAppSelector((state) => state.fen);
  const chessBoardRows = Array.from({ length: 9 }, (_, i) => i + 1);
  const chessBoardColumns = Array.from({ length: 9 }, (_, i) =>
    String.fromCharCode(97 + i)
  );

  const whitePiecesArray = Object.keys(whitePieces);

  const blackPiecesArray = Object.keys(blackPieces);

  const switchPiece = (newPiece: Piece) => {
    const { prevRow, prevCol } = getPrevPieceState();
    const currentArray = getFenArray(fenInputs[prevRow]);
    currentArray[prevCol] = newPiece;
    const updatedCurrentFen = getFenString(currentArray);
    dispatch(
      updateFen({ rowNumber: prevRow + 1, fenInput: updatedCurrentFen })
    );
    dispatch(setSelectedPiece(newPiece as Piece));
    togglePieceSelection();
  };

  const showPieces = (piece: Piece | undefined) => {
    const { currentPieceColor } = getCurrentPieceState(piece);
    if (currentPieceColor === "white") {
      return whitePiecesArray.map((newPiece) => {
        return (
          <img
            src={whitePieces[newPiece as keyof typeof whitePieces]}
            onClick={() => switchPiece(newPiece as Piece)}
            key={newPiece}
          />
        );
      });
    }
    if (currentPieceColor === "black") {
      return blackPiecesArray.map((newPiece) => {
        return (
          <img
            src={blackPieces[newPiece as keyof typeof blackPieces]}
            onClick={() => switchPiece(newPiece as Piece)}
            key={newPiece}
          />
        );
      });
    }
  };

  const formatFen = (rowI: number) => getFenArray(fenInputs[rowI]);

  const getModifier = (rowI: number, colI: number) => {
    if (rowI === 8) return "--hidden";
    if (colI === 8 && rowI < 8) return "--fenText";
    if (selectedSpot && selectedSpot === `${rowI}-${colI}`) return "--clicked";
    return "";
  };

  const togglePieceSelection = () => {
    dispatch(setSelectedPiece(undefined));
    dispatch(setSelectedSpot(undefined));
  };

  const setCurrentPiece = (
    currentRow: number,
    currentCol: number,
    currentFenArray: (Piece | undefined)[]
  ) => {
    dispatch(setSelectedPiece(currentFenArray[currentCol]));
    dispatch(setSelectedSpot(`${currentRow}-${currentCol}`));
  };

  const getPrevPieceState = () => {
    const prevRow = +selectedSpot!.slice(0, selectedSpot!.indexOf("-"));
    const prevCol = +selectedSpot!.slice(selectedSpot!.indexOf("-") + 1);
    const prevPieceColor = whitePiecesArray.includes(selectedPiece!)
      ? "white"
      : "black";
    return { prevRow, prevCol, prevPieceColor };
  };

  const getCurrentPieceState = (currPiece: Piece | undefined) => {
    const currentPieceColor = whitePiecesArray.includes(currPiece ?? "")
      ? "white"
      : "black";
    return { currentPieceColor };
  };

  const movePiece = (
    prevRow: number,
    prevCol: number,
    currentRow: number,
    currentCol: number
  ) => {
    const prevArray = getFenArray(fenInputs[prevRow]);
    const currentArray = getFenArray(fenInputs[currentRow]);

    if (prevRow === currentRow) {
      currentArray[currentCol] = selectedPiece;
      currentArray[prevCol] = undefined;
    } else {
      currentArray[currentCol] = selectedPiece;

      prevArray[prevCol] = undefined;
    }
    const updatedCurrentFen = getFenString(currentArray);
    const updatedPrevFen = getFenString(prevArray);

    if (currentCol !== 8) {
      dispatch(updateFen({ rowNumber: prevRow + 1, fenInput: updatedPrevFen }));
      dispatch(
        updateFen({ rowNumber: currentRow + 1, fenInput: updatedCurrentFen })
      );
    }
  };

  const selectPiece = (
    currentRow: number,
    currentCol: number,
    currentFenArray: (Piece | undefined)[]
  ) => {
    if (selectedSpot && selectedSpot === `${currentRow}-${currentCol}`) {
      togglePieceSelection();
    } else if (selectedPiece && selectedSpot) {
      const { prevRow, prevCol, prevPieceColor } = getPrevPieceState();
      const { currentPieceColor } = getCurrentPieceState(
        currentFenArray[currentCol]
      );
      if (
        currentFenArray[currentCol] === undefined ||
        prevPieceColor !== currentPieceColor
      ) {
        movePiece(prevRow, prevCol, currentRow, currentCol);
        togglePieceSelection();
      }
    } else {
      setCurrentPiece(currentRow, currentCol, currentFenArray);
    }
  };

  return {
    chessBoardRows,
    chessBoardColumns,
    selectedPiece,
    showPieces,
    formatFen,
    getModifier,
    selectPiece,
  };
};
