import { ComponentProps } from "react";
import React from "react";
import "./input.scss";

export interface InputProps extends ComponentProps<"input"> {
  errorMessage?: string;
  label?: string;
}
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ errorMessage, label, ...rest }, ref) => {
    return (
      <div className="input">
        {label && (
          <label className="input__label" htmlFor="input">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`input__field ${errorMessage && "input__field--error"}`}
          autoComplete="off"
          {...rest}
        />
        {errorMessage && (
          <span className="input__message-error">{errorMessage}</span>
        )}
      </div>
    );
  }
);
