import { render, screen } from "@testing-library/react";
import { Input } from "./input";

describe("Input", () => {
  it("should render input", () => {
    render(<Input />);

    const input = screen.getByRole("textbox");

    expect(input).toBeInTheDocument();
  });

  it("should render input title", () => {
    render(<Input label="FEN Input" />);

    const label = screen.getByText(/FEN Input/i);

    expect(label).toBeInTheDocument();
  });

  it("should render input error message", () => {
    render(<Input errorMessage="error" />);

    const errorMessage = screen.getByText(/error/i);
    const input = screen.getByRole("textbox");

    expect(errorMessage).toBeInTheDocument();
    expect(input).toHaveClass("input__field--error");
  });
});
