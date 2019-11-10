import { NumberWidthCalculator } from './numberWidthCalculator';

export function createPageWidthCalculator({
  getActivePageWidth,
  getNormalPageWidth,
}: Params) {
  return function pageWidthCalculator(page: number, active: boolean) {
    return active ? getActivePageWidth(page) : getNormalPageWidth(page);
  };
}

type Params = {
  getActivePageWidth: NumberWidthCalculator;
  getNormalPageWidth: NumberWidthCalculator;
};

export type GetPageWidth = ReturnType<typeof createPageWidthCalculator>;
