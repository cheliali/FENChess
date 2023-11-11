import userEvent, { UserEvent } from "@testing-library/user-event";
import {
  setSelectedPiece,
  setSelectedSpot,
  startGame,
} from "../../../store/fen/fen-slice";
import { store } from "../../../store/store";
import { render, screen } from "../../../utils/test-utils/test-utils";
import { ChessBoard } from "./chess-board";
import { vi } from "vitest";

describe("Chessboard", () => {
  let user: UserEvent;
  beforeAll(() => {
    user = userEvent.setup();
  });
  beforeEach(() => {
    store.dispatch(startGame());
    store.dispatch(setSelectedPiece(undefined));
    store.dispatch(setSelectedSpot(undefined));
  });

  it("should render chessboard", () => {
    render(<ChessBoard />);
    const chessBlocks = screen.getAllByTestId(/chess-block/i);
    const pieceImages = screen.getAllByRole("img");
    expect(chessBlocks.length).toBeGreaterThanOrEqual(64);
    expect(pieceImages.length).toBe(32);
  });

  it("should select piece and unselect", async () => {
    const spyDispatch = vi.spyOn(store, "dispatch");
    render(<ChessBoard />);

    const chessBlock = screen.getByTestId("chess-block-0-0");

    await user.click(chessBlock);

    expect(chessBlock).toHaveClass("chess-board__square--clicked");
    expect(spyDispatch).toHaveBeenNthCalledWith(1, {
      payload: "R",
      type: "fen/setSelectedPiece",
    });
    expect(spyDispatch).toHaveBeenNthCalledWith(2, {
      payload: "0-0",
      type: "fen/setSelectedSpot",
    });

    await user.click(chessBlock);

    expect(chessBlock).not.toHaveClass("chess-board__square--clicked");
    expect(spyDispatch).not.toHaveBeenNthCalledWith(1, {
      payload: undefined,
      type: "fen/setSelectedPiece",
    });
    expect(spyDispatch).not.toHaveBeenNthCalledWith(2, {
      payload: undefined,
      type: "fen/setSelectedSpot",
    });
  });

  it("should not select empty block", async () => {
    const spyDispatch = vi.spyOn(store, "dispatch");
    render(<ChessBoard />);

    const chessBlock = screen.getByTestId("chess-block-4-4");

    await user.click(chessBlock);

    expect(chessBlock).not.toHaveClass("chess-board__square--clicked");
    expect(spyDispatch).not.toHaveBeenCalled();
  });

  it("should switch piece", async () => {
    const spyDispatch = vi.spyOn(store, "dispatch");
    render(<ChessBoard />);

    const chessBlock = screen.getByTestId("chess-block-7-7");

    await user.click(chessBlock);

    const pieceImgs = screen.getAllByRole("img", { name: /switch-options/i });

    expect(pieceImgs.length).toBe(6);

    const desiredPiece = screen.getByRole("img", { name: "switch-options-k" });

    await user.click(desiredPiece);

    expect(spyDispatch).toHaveBeenNthCalledWith(3, {
      payload: {
        fenInput: "rnbkqbnk",
        rowNumber: 8,
      },
      type: "fen/updateFen",
    });
    expect(spyDispatch).toHaveBeenNthCalledWith(4, {
      payload: "k",
      type: "fen/setSelectedPiece",
    });
  });
  it("should move piece", async () => {
    const spyDispatch = vi.spyOn(store, "dispatch");
    render(<ChessBoard />);

    const chessBlock = screen.getByTestId("chess-block-0-0");
    const desiredBlock = screen.getByTestId("chess-block-4-4");

    await user.click(chessBlock);
    await user.click(desiredBlock);

    expect(spyDispatch).toHaveBeenCalledWith({
      payload: {
        fenInput: "4R3",
        rowNumber: 5,
      },
      type: "fen/updateFen",
    });

    const desiredBlock2 = screen.getByTestId("chess-block-4-5");

    await user.click(desiredBlock);
    await user.click(desiredBlock2);

    expect(spyDispatch).toHaveBeenCalledWith({
      payload: {
        fenInput: "5R2",
        rowNumber: 5,
      },
      type: "fen/updateFen",
    });
  });
  it("should not move same color pieces", async () => {
    render(<ChessBoard />);

    const chessBlock = screen.getByTestId("chess-block-0-0");
    const desiredBlock = screen.getByTestId("chess-block-0-1");

    await user.click(chessBlock);
    await user.click(desiredBlock);

    expect(store.getState().fen.fenInputs[0]).toEqual("RNBKQBNR");
  });
});
