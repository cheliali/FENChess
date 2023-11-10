import { Piece } from "../store/fen/fen-slice";

export const getFenArray = (fenString: string) => {
  return (fenString.split("") as Piece[]).reduce(
    (prev: (Piece | undefined)[], cur: Piece) => {
      if (isNaN(+cur)) return [...prev, cur];
      const spaces = Array.from({ length: +cur }, () => undefined);
      return [...prev, ...spaces];
    },
    []
  );
};

export const getFenString = (fenArray: (Piece | undefined)[]) => {
  return fenArray.reduce((prev, cur) => {
    if (cur) return prev + cur;
    if (isNaN(+prev?.slice(-1))) return `${prev}1`;
    return `${prev?.slice(0, -1)}${+prev?.slice(-1) + 1}`;
  }, "");
};
