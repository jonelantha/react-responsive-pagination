import { NavType } from '../../../view';

export function createNavWidthCalculator(widths: Params) {
  return function navWidthCalculator(type: NavType, enabled: boolean) {
    const widthsForType = widths[type];

    return enabled ? widthsForType.disabled : widthsForType.disabled;
  };
}

type Params = {
  previous: {
    enabled: number;
    disabled: number;
  };
  next: {
    enabled: number;
    disabled: number;
  };
};

export type GetNavWidth = ReturnType<typeof createNavWidthCalculator>;
