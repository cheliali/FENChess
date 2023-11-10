import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import K from "../../assets/images/K.png";
import Q from "../../assets/images/Q.png";
import B from "../../assets/images/B.png";
import R from "../../assets/images/R.png";
import N from "../../assets/images/N.png";
import P from "../../assets/images/P.png";
import k from "../../assets/images/ki.png";
import q from "../../assets/images/qi.png";
import b from "../../assets/images/bi.png";
import r from "../../assets/images/ri.png";
import n from "../../assets/images/ni.png";
import p from "../../assets/images/pi.png";

type Inputs = {
  rowNumber: number;
  fenInput: string;
};

export type Piece = keyof typeof whitePieces | keyof typeof blackPieces;

export interface FenState {
  fenInputs: string[];
  selectedSpot?: string;
  selectedPiece?: Piece;
}

const initialState: FenState = {
  fenInputs: Array.from({ length: 8 }, () => ""),
};

export const whitePieces = {
  K,
  Q,
  B,
  R,
  N,
  P,
};

export const blackPieces = {
  k,
  q,
  b,
  r,
  n,
  p,
};

export const fenSlice = createSlice({
  name: "fen",
  initialState,
  reducers: {
    resetGame: (state) => {
      state.fenInputs = Array.from({ length: 8 }, () => "");
    },
    startGame: (state) => {
      state.fenInputs = [
        "RNBKQBNR",
        "PPPPPPPP",
        "8",
        "8",
        "8",
        "8",
        "pppppppp",
        "rnbkqbnr",
      ];
    },
    updateFen: (state, { payload: form }: PayloadAction<Inputs>) => {
      state.fenInputs[form.rowNumber - 1] = form.fenInput;
    },
    setSelectedSpot: (
      state,
      { payload: spotCoordinates }: PayloadAction<string | undefined>
    ) => {
      state.selectedSpot = spotCoordinates;
    },
    setSelectedPiece: (
      state,
      { payload: piece }: PayloadAction<Piece | undefined>
    ) => {
      state.selectedPiece = piece;
    },
  },
});
export const {
  resetGame,
  startGame,
  updateFen,
  setSelectedSpot,
  setSelectedPiece,
} = fenSlice.actions;
