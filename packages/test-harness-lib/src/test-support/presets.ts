import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import {
  v1_bootstrap4PaginationPreset,
  bootstrap4PaginationPreset,
  bootstrap5PaginationPreset,
} from 'react-responsive-pagination/presets';
import { twExamples } from '../../../docs/src/components/tailwind-examples';

const tw = (strings: TemplateStringsArray, ...values: string[]) =>
  String.raw({ raw: strings }, ...values);

const pageItem = cva(
  'inline-flex items-center rounded-lg border border-transparent text-sm text-gray-800 focus:bg-gray-100 focus:outline-hidden dark:text-white dark:focus:bg-white/10',
  {
    variants: {
      type: {
        active:
          'bg-gray-200 hover:bg-gray-100 dark:bg-neutral-600 dark:hover:bg-white/10',
        inactive: 'hover:bg-gray-100 dark:hover:bg-white/10',
        disabled: 'pointer-events-none opacity-50',
      },
    },
  },
);

export const presets = {
  none: null,
  v1Bootstrap4: v1_bootstrap4PaginationPreset,
  bootstrap4: bootstrap4PaginationPreset,
  bootstrap5: bootstrap5PaginationPreset,
  ...twExamples,
  twCva: {
    containerClassName: tw`flex justify-center gap-x-1`,
    pageItemClassName: '',
    activeItemClassName: twMerge(pageItem({ type: 'active' })),
    inactiveItemClassName: twMerge(pageItem({ type: 'inactive' })),
    disabledItemClassName: twMerge(pageItem({ type: 'disabled' })),
    pageLinkClassName: tw`px-3 py-2 focus:z-20`,
  },
};

export type PresetId = keyof typeof presets;
