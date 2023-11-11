import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Selector } from "./selector";

describe("Selector", () => {
  const options = [
    { name: "1", value: "1" },
    { name: "2", value: "2" },
  ];

  it("should render combobox", () => {
    render(<Selector label="Row Number" options={options} />);

    const label = screen.getByText("Row Number");
    const combobox = screen.getByRole("combobox");

    expect(label).toBeInTheDocument();
    expect(combobox).toBeInTheDocument();
  });

  it("should render options", () => {
    render(<Selector options={options} />);

    const renderedOptions = screen.getAllByRole("option");

    expect(renderedOptions.length).toBe(options.length);
  });
  it("should select correct option", async () => {
    const user = userEvent.setup();

    render(<Selector options={options} />);

    const combobox = screen.getByRole("combobox");
    const selectedOption: HTMLInputElement = screen.getByRole("option", {
      name: options[1].name,
    });

    expect(combobox).toHaveDisplayValue(options[0].name);

    await user.selectOptions(combobox, selectedOption);

    expect(combobox).toHaveDisplayValue(options[1].name);
  });
});
