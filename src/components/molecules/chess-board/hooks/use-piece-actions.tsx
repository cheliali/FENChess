import {
  useAppDispatch,
  useAppSelector,
} from "../../../../store/hooks/store-hooks";
import {
  Piece,
  setSelectedPiece,
  setSelectedSpot,
  updateFen,
  whitePieces,
  blackPieces,
} from "../../../../store/fen/fen-slice";

import { getFenArray, getFenString } from "../../../../utils/fen-formatter";

interface UsePieceActionsProps {
  fenInputs: string[];
  getPieceColor: (piece: Piece | undefined) => "white" | "black";
  getPieceCoordinates: () => {
    prevRow: number;
    prevCol: number;
  };
}

export const usePieceActions = ({
  fenInputs,
  getPieceColor,
  getPieceCoordinates,
}: UsePieceActionsProps) => {
  const dispatch = useAppDispatch();
  const { selectedPiece } = useAppSelector((state) => state.fen);

  const unselectPiece = () => {
    dispatch(setSelectedPiece(undefined));
    dispatch(setSelectedSpot(undefined));
  };

  const selectPiece = (
    currentRow: number,
    currentCol: number,
    currentFenArray: (Piece | undefined)[]
  ) => {
    if (currentFenArray[currentCol] === undefined) return;
    dispatch(setSelectedPiece(currentFenArray[currentCol]));
    dispatch(setSelectedSpot(`${currentRow}-${currentCol}`));
  };

  const showPieces = (piece: Piece | undefined) => {
    const currentPieceColor = getPieceColor(piece);

    const pieces = currentPieceColor === "white" ? whitePieces : blackPieces;

    return Object.keys(pieces).map((newPiece) => {
      return (
        <img
          width="50px"
          src={pieces[newPiece as keyof typeof pieces]}
          onClick={() => switchPiece(newPiece as Piece)}
          key={newPiece}
        />
      );
    });
  };

  const switchPiece = (newPiece: Piece) => {
    const { prevRow, prevCol } = getPieceCoordinates();
    const currentArray = getFenArray(fenInputs[prevRow]);
    currentArray[prevCol] = newPiece;
    const updatedCurrentFen = getFenString(currentArray);
    dispatch(
      updateFen({ rowNumber: prevRow + 1, fenInput: updatedCurrentFen })
    );
    dispatch(setSelectedPiece(newPiece as Piece));
    unselectPiece();
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

  return { unselectPiece, selectPiece, showPieces, switchPiece, movePiece };
};
