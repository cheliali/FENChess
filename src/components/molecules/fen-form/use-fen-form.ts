import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../../../store/hooks/store-hooks";
import {
  startGame as startChessGame,
  resetGame as resetChessGame,
  updateFen,
  toggleSelection,
} from "../../../store/fen/fen-slice";
import { getFenArray } from "../../../utils/fen-formatter";

type Inputs = {
  rowNumber: number;
  fenInput: string;
};

export const useFenForm = () => {
  const dispatch = useAppDispatch();

  const { register, handleSubmit, control, setError } = useForm<Inputs>({
    defaultValues: {
      rowNumber: 1,
      fenInput: "",
    },
    criteriaMode: "all",
  });

  const chessBoardRows = Array.from({ length: 9 }, (_, i) => ({
    name: `${i + 1}`,
    value: `${i + 1}`,
  }));

  const onSubmit: SubmitHandler<Inputs> = (form) => {
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
    register,
    handleSubmit,
    onSubmit,
    startGame,
    resetGame,
  };
};
