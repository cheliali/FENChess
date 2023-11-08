import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Inputs = {
  rowNumber: number;
  fenInput: string;
};

export interface FenState {
  fenInput: string[];
}

const initialState: FenState = {
  fenInput: Array.from({ length: 8 }, () => ""),
};

export const fenSlice = createSlice({
  name: "fen",
  initialState,
  reducers: {
    resetGame: (state) => {
      state.fenInput = Array.from({ length: 8 }, () => "");
    },
    startGame: (state) => {
      state.fenInput = [
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
      state.fenInput[form.rowNumber - 1] = form.fenInput;
    },
  },
});
export const { resetGame, startGame, updateFen } = fenSlice.actions;
