import { NumberWidthCalculator } from './numberWidthCalculator';

export function createPageWidthCalculator({
  getActivePageWidth,
  getNormalPageWidth,
}: Params) {
  return function pageWidthCalculator(label: string, active: boolean) {
    return active ? getActivePageWidth(label) : getNormalPageWidth(label);
  };
}

type Params = {
  getActivePageWidth: NumberWidthCalculator;
  getNormalPageWidth: NumberWidthCalculator;
};

export type GetPageWidth = ReturnType<typeof createPageWidthCalculator>;
