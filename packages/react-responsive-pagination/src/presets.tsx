import type { LabelBehaviour } from './labelBehaviour.ts';
import { srOnlySpanLabel } from './labelBehaviour.ts';

/**
 * @public
 */
export const v1_bootstrap4PaginationPreset: {
  ariaCurrentAttr: false;
  labelBehaviour: LabelBehaviour;
} = {
  ariaCurrentAttr: false,
  labelBehaviour: /*#__PURE__*/ srOnlySpanLabel(),
};

/**
 * legacy - may be removed
 * @public
 */
export const bootstrap4PaginationPreset = {};

/**
 * legacy - may be removed
 * @public
 */
export const bootstrap5PaginationPreset = {};
