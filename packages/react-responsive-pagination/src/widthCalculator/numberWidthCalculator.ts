export function createNumberWidthCalculator(widths: Params) {
  return function numberWidthCalculator(label: string) {
    const numDigits = label.length;

    return (
      widths.singleDigit +
      (widths.doubleDigit - widths.singleDigit) * (numDigits - 1)
    );
  };
}

type Params = {
  singleDigit: number;
  doubleDigit: number;
};

export type NumberWidthCalculator = ReturnType<typeof createNumberWidthCalculator>;
