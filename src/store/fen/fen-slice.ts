import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { blackPieces, whitePieces } from "../../utils/pieces-images";

type Inputs = {
  rowNumber: number;
  fenInput: string;
};

export const themeOptions = ["classic", "empires", "medieval"] as const;
export type Theme = (typeof themeOptions)[number];

export type Piece = keyof typeof whitePieces | keyof typeof blackPieces;

export interface FenState {
  fenInputs: string[];
  selectedSpot?: string;
  selectedPiece?: Piece;
  chessTheme: Theme;
}

const initialState: FenState = {
  fenInputs: Array.from({ length: 8 }, () => ""),
  chessTheme: "classic",
};

export const fenSlice = createSlice({
  name: "fen",
  initialState,
  reducers: {
    resetGame: (state) => {
      state.fenInputs = Array.from({ length: 8 }, () => "");
      localStorage.setItem("fen Inputs", JSON.stringify(state.fenInputs));
    },
    startGame: (
      state,
      { payload: fenInputs }: PayloadAction<string[] | undefined>
    ) => {
      if (fenInputs) state.fenInputs = fenInputs;
      else {
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
      }
      localStorage.setItem("fen Inputs", JSON.stringify(state.fenInputs));
    },
    updateFen: (state, { payload: form }: PayloadAction<Inputs>) => {
      state.fenInputs[form.rowNumber - 1] = form.fenInput;
      localStorage.setItem("fen Inputs", JSON.stringify(state.fenInputs));
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
    setChessTheme: (state, { payload: theme }: PayloadAction<Theme>) => {
      state.chessTheme = theme;
    },
  },
});
export const {
  resetGame,
  startGame,
  updateFen,
  setSelectedSpot,
  setSelectedPiece,
  setChessTheme,
} = fenSlice.actions;
