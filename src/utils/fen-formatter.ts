export const formatFenString = (fenString: string) => {
  return fenString.split("").reduce((prev: string[], cur: string) => {
    if (isNaN(+cur)) return [...prev, cur];

    const spaces = Array.from({ length: +cur }, () => "");
    return [...prev, ...spaces];
  }, []);
};
