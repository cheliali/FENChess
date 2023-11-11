import React, { Fragment } from "react";
import "./selector.scss";

export interface Option {
  name: string;
  value: string;
}

export interface SelectorProps {
  options: Option[];
  label?: string;
}

export const Selector = React.forwardRef<HTMLSelectElement, SelectorProps>(
  ({ options, label, ...rest }, ref) => {
    return (
      <Fragment>
        <label className="custom-select__label">{label}</label>
        <select ref={ref} {...rest} className="custom-select">
          {options.map(({ name, value }) => (
            <option key={value} value={value} className="custom-select__option">
              {name}
            </option>
          ))}
        </select>
      </Fragment>
    );
  }
);
