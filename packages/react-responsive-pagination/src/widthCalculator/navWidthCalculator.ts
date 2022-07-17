export function createNavWidthCalculator(widths: Params) {
  return function navWidthCalculator(type: '<' | '>', enabled: boolean) {
    const widthsForType = widths[type];

    return enabled ? widthsForType.enabled : widthsForType.disabled;
  };
}

type Params = {
  '<': {
    enabled: number;
    disabled: number;
  };
  '>': {
    enabled: number;
    disabled: number;
  };
};

export type GetNavWidth = ReturnType<typeof createNavWidthCalculator>;
