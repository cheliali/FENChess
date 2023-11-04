import { ComponentProps, FC } from "react";
import React from "react";
import "./input.scss";

export interface InputProps extends ComponentProps<"input"> {
  errorMessage?: string;
  placeholder?: string;
  value?: string;
  label?: string;
  handleChange?: (e: React.ChangeEvent<any>) => void;
}

export const Input: FC<InputProps> = ({
  label,
  errorMessage,
  handleChange,
  ...rest
}) => {
  return (
    <div className="input">
      {label && (
        <label className="input__label" htmlFor="input">
          {label}
        </label>
      )}
      <input
        className={`input__field ${errorMessage && "input__field--error"} `}
        onChange={handleChange}
        autoComplete="off"
        {...rest}
      />
      {errorMessage && (
        <span className="input__message-error">{errorMessage}</span>
      )}
    </div>
  );
};
