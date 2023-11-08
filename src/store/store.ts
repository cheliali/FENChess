import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { fenSlice } from "./fen/fen-slice";

export const store = configureStore({
  reducer: {
    fen: fenSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
