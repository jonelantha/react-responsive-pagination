import { srOnlySpanLabel } from 'react-responsive-pagination/labelBehaviour';

export function getLabelBehaviour({
  labelBehaviour,
  srOnlyClassName,
  a11yActiveLabel,
}: {
  labelBehaviour: unknown;
  srOnlyClassName: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  a11yActiveLabel: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}) {
  if (labelBehaviour === 'srOnlySpanLabel') {
    return { labelBehaviour: srOnlySpanLabel({ srOnlyClassName, a11yActiveLabel }) };
  }
}
