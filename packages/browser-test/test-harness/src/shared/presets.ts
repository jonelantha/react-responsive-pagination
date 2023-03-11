import {
  v1_bootstrap4PaginationPreset,
  bootstrap4PaginationPreset,
  bootstrap5PaginationPreset,
} from 'react-responsive-pagination';

export const presets = {
  none: null,
  v1Bootstrap4: v1_bootstrap4PaginationPreset,
  bootstrap4: bootstrap4PaginationPreset,
  bootstrap5: bootstrap5PaginationPreset,
};

export type PresetId = keyof typeof presets;
