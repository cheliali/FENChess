import { FenForm } from "./fen-form";
import { render, screen } from "../../../utils/test-utils/test-utils";
import userEvent, { UserEvent } from "@testing-library/user-event";
import { store } from "../../../store/store";
import { expect, vi } from "vitest";

describe("Fen Form", () => {
  let user: UserEvent;
  beforeAll(() => {
    user = userEvent.setup();
  });

  it("should render form", () => {
    render(<FenForm />);

    const selector = screen.getByRole("combobox");
    const input = screen.getByRole("textbox");
    const enterFenBtn = screen.getByText(/Enter/i);
    const startBtn = screen.getByText(/Start/i);
    const resetBtn = screen.getByText(/Reset/);

    expect(selector).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(enterFenBtn).toBeInTheDocument();
    expect(startBtn).toBeInTheDocument();
    expect(resetBtn).toBeInTheDocument();
  });

  it("should only accept valid fen characters", async () => {
    render(<FenForm />);

    const input = screen.getByRole("textbox");
    await user.type(input, "pablrt8");

    expect(input).toHaveDisplayValue("pbr8");
  });

  it("should only accept 8 characters", async () => {
    render(<FenForm />);

    const input = screen.getByRole("textbox");

    await user.type(input, "pbkqnrPBKQNR0");

    expect(input).toHaveDisplayValue("pbkqnrPB");
  });

  it("should submit valid fen input", async () => {
    const dispatchSpy = vi.spyOn(store, "dispatch");
    render(<FenForm />);

    const input = screen.getByRole("textbox");
    const enterBtn = screen.getByRole("button", { name: "enter" });

    await user.type(input, "7k");
    await user.click(enterBtn);

    expect(dispatchSpy).toHaveBeenCalled();
  });

  it("should not submit invalid fen input", async () => {
    render(<FenForm />);

    const input = screen.getByRole("textbox");
    const enterBtn = screen.getByRole("button", { name: "enter" });
    const errorMessage = screen.queryByText(/Invalid/i);

    expect(errorMessage).not.toBeInTheDocument();

    await user.type(input, "8k");
    await user.click(enterBtn);

    const errorMessageShown = screen.getByText(/Invalid/i);

    expect(errorMessageShown).toBeInTheDocument();
  });

  it("should start game", async () => {
    render(<FenForm />);

    const startBtn = screen.getByRole("button", { name: "start" });

    await user.click(startBtn);

    expect(store.getState().fen.fenInputs).toEqual([
      "RNBKQBNR",
      "PPPPPPPP",
      "8",
      "8",
      "8",
      "8",
      "pppppppp",
      "rnbkqbnr",
    ]);
  });
  it("should reset game", async () => {
    render(<FenForm />);

    const resetBtn = screen.getByRole("button", { name: "reset" });

    await user.click(resetBtn);

    expect(store.getState().fen.fenInputs).toEqual(
      Array.from({ length: 8 }, () => "")
    );
  });
});
