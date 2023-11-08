import React from "react";

import "./selector.scss";

export interface Option {
  name: string;
  value: string;
}

export interface SelectorProps {
  options: Option[];
}

export const Selector = React.forwardRef<HTMLSelectElement, SelectorProps>(
  ({ options, ...rest }, ref) => {
    return (
      <select ref={ref} {...rest} className="custom-select">
        {options.map(({ name, value }) => (
          <option key={value} value={value} className="custom-select__option">
            {name}
          </option>
        ))}
      </select>
    );
  }
);
