import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../../../store/hooks/store-hooks";
import {
  startGame as startChessGame,
  resetGame as resetChessGame,
  updateFen,
  themeOptions,
  Theme,
  setChessTheme,
} from "../../../store/fen/fen-slice";
import { getFenArray } from "../../../utils/fen-formatter";
import { useEffect } from "react";

type Inputs = {
  rowNumber: number;
  fenInput: string;
  theme: Theme;
};

export const useFenForm = () => {
  const dispatch = useAppDispatch();

  const { register, handleSubmit, setError, watch, getValues, control } =
    useForm<Inputs>({
      defaultValues: {
        rowNumber: 1,
        fenInput: "",
        theme: "classic",
      },
      criteriaMode: "all",
    });

  useEffect(() => {
    dispatch(setChessTheme(getValues("theme")));
  }, [watch("theme")]);

  const chessBoardRows = Array.from({ length: 9 }, (_, i) => ({
    name: `${i + 1}`,
    value: `${i + 1}`,
  }));

  const chessThemes = themeOptions.map((theme) => ({
    name: theme,
    value: theme,
  }));

  const onSubmit: SubmitHandler<Inputs> = (form) => {
    console.log(getFenArray(form.fenInput).length);
    if (getFenArray(form.fenInput).length !== 8) {
      setError("fenInput", { message: "Invalid FEN" });
      return;
    }
    dispatch(updateFen(form));
  };

  const startGame = () => {
    dispatch(startChessGame());
  };
  const resetGame = () => {
    dispatch(resetChessGame());
  };

  return {
    control,
    chessBoardRows,
    chessThemes,
    register,
    handleSubmit,
    onSubmit,
    startGame,
    resetGame,
  };
};
