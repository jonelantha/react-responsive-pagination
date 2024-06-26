export function getElementWidth(element: Element) {
  const style = getComputedStyle(element);

  return (
    styleMetricToInt(style.marginLeft) +
    getWidth(element) +
    styleMetricToInt(style.marginRight)
  );
}

export function getContentWidth(element: Element) {
  const style = getComputedStyle(element);

  return (
    element.getBoundingClientRect().width -
    styleMetricToInt(style.borderLeftWidth) -
    styleMetricToInt(style.paddingLeft) -
    styleMetricToInt(style.paddingRight) -
    styleMetricToInt(style.borderRightWidth)
  );
}

export function getNonContentWidth(element: Element) {
  const style = getComputedStyle(element);

  return (
    styleMetricToInt(style.marginLeft) +
    styleMetricToInt(style.borderLeftWidth) +
    styleMetricToInt(style.paddingLeft) +
    styleMetricToInt(style.paddingRight) +
    styleMetricToInt(style.borderRightWidth) +
    styleMetricToInt(style.marginRight)
  );
}

export function getWidth(element: Element) {
  return element.getBoundingClientRect().width;
}

function styleMetricToInt(styleAttribute: string | null) {
  return styleAttribute ? parseInt(styleAttribute) : 0;
}
