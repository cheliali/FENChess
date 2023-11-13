import { Controller } from "react-hook-form";
import { Selector } from "../selector/selector";
import { Input } from "../../atoms/input/input";
import { useFenForm } from "./use-fen-form";
import "./fen-form.scss";

export const FenForm = () => {
  const {
    control,
    chessBoardRows,
    chessThemes,
    register,
    handleSubmit,
    onSubmit,
    startGame,
    resetGame,
  } = useFenForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="fen-form__form">
      <Selector
        aria-label="row-number"
        options={chessBoardRows}
        label="Row Number"
        {...register("rowNumber")}
      />
      <Controller
        rules={{ required: "Minimun 1 character" }}
        control={control}
        name="fenInput"
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <Input
              label="FEN Input"
              maxLength={8}
              id="fenInput"
              value={value}
              errorMessage={error?.message}
              onChange={({ target: { value } }) => {
                if (!/^[pbkqnrPBKQNR1-8]*$/.test(value)) return;
                return onChange(value);
              }}
            />
          );
        }}
      />
      <Selector
        aria-label="theme"
        options={chessThemes}
        label="Theme"
        {...register("theme")}
      />
      <button type="submit" aria-label="enter" className="fen-form__button">
        Enter FEN
      </button>
      <button
        type="button"
        aria-label="start"
        onClick={startGame}
        className="fen-form__button"
      >
        Start Game
      </button>
      <button
        type="button"
        aria-label="reset"
        onClick={resetGame}
        className="fen-form__button"
      >
        Reset
      </button>
    </form>
  );
};
