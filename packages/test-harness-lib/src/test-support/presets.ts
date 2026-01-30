import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import {
  v1_bootstrap4PaginationPreset,
  bootstrap4PaginationPreset,
  bootstrap5PaginationPreset,
} from 'react-responsive-pagination/presets';

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
  //https://tailwindcss.com/plus/ui-blocks/application-ui/navigation/pagination
  tw1: {
    containerClassName: tw`flex justify-center -space-x-px rounded-md shadow-xs`,
    pageItemClassName: tw`inline-flex items-center first:rounded-l-md last:rounded-r-md`,
    activeItemClassName: tw`active z-10 bg-indigo-600 text-white`,
    inactiveItemClassName: tw`text-sm font-semibold text-gray-900 inset-ring inset-ring-gray-300 hover:bg-gray-50 dark:text-gray-200 dark:inset-ring-gray-700 dark:hover:bg-white/5`,
    disabledItemClassName: tw`pointer-events-none text-sm font-semibold text-gray-700 inset-ring inset-ring-gray-300 dark:text-gray-400 dark:inset-ring-gray-700`,
    pageLinkClassName: tw`px-4 py-2 focus:z-20 focus:outline-offset-0 [.active_&]:focus-visible:outline-2 [.active_&]:focus-visible:outline-offset-2 [.active_&]:focus-visible:outline-indigo-600`,
  },
  // https://www.material-tailwind.com/docs/html/pagination
  tw2: {
    containerClassName: tw`flex justify-center space-x-1`,
    pageItemClassName: tw`inline-flex items-center rounded-md border border-slate-300 text-center text-sm transition-colors dark:border-slate-600`,
    activeItemClassName: tw`border-transparent bg-slate-800 text-white shadow-sm hover:bg-slate-700 hover:shadow-lg focus:bg-slate-700 focus:shadow-none dark:bg-slate-700 dark:hover:bg-slate-600 dark:focus:bg-slate-600`,
    inactiveItemClassName: tw`text-slate-600 shadow-sm hover:border-transparent hover:bg-slate-800 hover:text-white hover:shadow-lg dark:text-slate-400 dark:hover:bg-slate-700`,
    disabledItemClassName: tw`pointer-events-none opacity-50 shadow-none`,
    pageLinkClassName: tw`px-3 py-2 focus:z-20`,
  },
  tw3: {
    containerClassName: tw`flex justify-center space-x-1`,
    pageItemClassName: tw`inline-flex items-center rounded-full border border-slate-300 text-center text-sm transition-colors dark:border-slate-600`,
    activeItemClassName: tw`border-transparent bg-slate-800 text-white shadow-sm hover:bg-slate-700 hover:shadow-lg focus:bg-slate-700 focus:shadow-none dark:bg-slate-700 dark:hover:bg-slate-600 dark:focus:bg-slate-600`,
    inactiveItemClassName: tw`text-slate-600 shadow-sm hover:border-transparent hover:bg-slate-800 hover:text-white hover:shadow-lg dark:text-slate-400 dark:hover:bg-slate-700`,
    disabledItemClassName: tw`pointer-events-none opacity-50 shadow-none`,
    pageLinkClassName: tw`px-3 py-2 focus:z-20`,
  },
  tw4: {
    containerClassName: tw`flex justify-center`,
    pageItemClassName: tw`inline-flex items-center border border-slate-300 text-center text-sm shadow-sm transition-colors not-last:border-r-0 first:rounded-l-md last:rounded-r-md dark:border-slate-600`,
    activeItemClassName: tw`border-transparent bg-slate-800 text-white hover:bg-slate-700 hover:shadow-lg focus:bg-slate-700 focus:shadow-none dark:bg-slate-700 dark:hover:bg-slate-600 dark:focus:bg-slate-600`,
    inactiveItemClassName: tw`text-slate-600 hover:border-transparent hover:bg-slate-800 hover:text-white hover:shadow-lg dark:text-slate-400 dark:hover:bg-slate-700`,
    disabledItemClassName: tw`pointer-events-none`,
    pageLinkClassName: tw`px-3 py-2 focus:z-20`,
  },
  // https://preline.co/docs/pagination.html
  tw5: {
    containerClassName: tw`flex justify-center gap-x-1`,
    pageItemClassName: tw`inline-flex items-center rounded-lg border border-transparent text-sm text-gray-800 focus:bg-gray-100 focus:outline-hidden dark:text-white dark:focus:bg-white/10`,
    activeItemClassName: tw`bg-gray-200 hover:bg-gray-100 dark:bg-neutral-600 dark:hover:bg-white/10`,
    inactiveItemClassName: tw`hover:bg-gray-100 dark:hover:bg-white/10`,
    disabledItemClassName: tw`pointer-events-none opacity-50`,
    pageLinkClassName: tw`px-3 py-2 focus:z-20`,
  },
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
