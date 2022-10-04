import { bootstrap5PaginationPreset } from 'react-responsive-pagination';

export const presets = {
  none: null,
  bootstrap5: bootstrap5PaginationPreset,
};

export type PresetId = keyof typeof presets;
