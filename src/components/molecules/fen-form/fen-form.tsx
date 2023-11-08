import { Controller } from "react-hook-form";
import { Selector } from "../selector/selector";
import { Input } from "../../atoms/input/input";
import { useFenForm } from "./use-fen-form";
import "./fen-form.scss";

export const FenForm = () => {
  const {
    control,
    chessBoardRows,
    register,
    handleSubmit,
    onSubmit,
    startGame,
    resetGame,
  } = useFenForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="fen-form__form">
      <Selector options={chessBoardRows} {...register("rowNumber")} />
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
                if (!/^[pbkqnr0-9]*$/.test(value)) return;
                return onChange(value);
              }}
            />
          );
        }}
      />
      <button type="submit" className="fen-form__button">
        Enter FEN
      </button>
      <button type="button" onClick={startGame} className="fen-form__button">
        Start Game
      </button>
      <button type="button" onClick={resetGame} className="fen-form__button">
        Reset Game
      </button>
    </form>
  );
};
