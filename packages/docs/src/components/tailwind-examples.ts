const tw = (strings: TemplateStringsArray, ...values: string[]) =>
  String.raw({ raw: strings }, ...values);

type ClassNameProps = {
  containerClassName: string;
  pageItemClassName: string;
  activeItemClassName: string;
  inactiveItemClassName: string;
  disabledItemClassName: string;
  pageLinkClassName: string;
};

export const twExamples = {
  basicLight: {
    containerClassName: tw`flex justify-center gap-1`,
    pageItemClassName: tw`inline-flex items-center rounded-md border text-sm`,
    activeItemClassName: tw`border-blue-700 bg-blue-700 text-white shadow-sm`,
    inactiveItemClassName: tw`border-slate-300 text-slate-600 shadow-sm hover:bg-blue-700 hover:text-white hover:shadow-lg`,
    disabledItemClassName: tw`pointer-events-none border-slate-300 text-slate-600 opacity-50`,
    pageLinkClassName: tw`px-3 py-2`,
  },
  basicDark: {
    containerClassName: tw`flex justify-center gap-1`,
    pageItemClassName: tw`inline-flex items-center rounded-md border text-sm`,
    activeItemClassName: tw`border-blue-800 bg-blue-800 text-white shadow-sm`,
    inactiveItemClassName: tw`border-slate-600 text-slate-400 shadow-sm hover:bg-blue-800 hover:text-white hover:shadow-lg`,
    disabledItemClassName: tw`pointer-events-none border-slate-600 text-slate-400 opacity-50`,
    pageLinkClassName: tw`px-3 py-2`,
  },
  // https://www.material-tailwind.com/docs/html/pagination#rounded-pagination
  materialRounded: {
    containerClassName: tw`flex justify-center space-x-1`,
    pageItemClassName: tw`inline-flex items-center rounded-md border text-sm transition-colors`,
    activeItemClassName: tw`border-slate-800 bg-slate-800 text-white shadow-sm hover:bg-slate-700 hover:shadow-lg focus:bg-slate-700 focus:shadow-none dark:border-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 dark:focus:bg-slate-600`,
    inactiveItemClassName: tw`border-slate-300 text-slate-600 shadow-sm hover:border-transparent hover:bg-slate-800 hover:text-white hover:shadow-lg dark:border-slate-600 dark:text-slate-400 dark:hover:bg-slate-700`,
    disabledItemClassName: tw`pointer-events-none border-slate-300 text-slate-600 opacity-50 shadow-none dark:border-slate-600 dark:text-slate-400`,
    pageLinkClassName: tw`px-3 py-2 focus:z-20`,
  },
  // https://www.material-tailwind.com/docs/html/pagination#circular-pagination
  materialCircular: {
    containerClassName: tw`flex justify-center space-x-1`,
    pageItemClassName: tw`inline-flex items-center rounded-full border text-sm transition-colors`,
    activeItemClassName: tw`border-slate-800 bg-slate-800 text-white shadow-sm hover:bg-slate-700 hover:shadow-lg focus:bg-slate-700 focus:shadow-none dark:border-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 dark:focus:bg-slate-600`,
    inactiveItemClassName: tw`border-slate-300 text-slate-600 shadow-sm hover:border-transparent hover:bg-slate-800 hover:text-white hover:shadow-lg dark:border-slate-600 dark:text-slate-400 dark:hover:bg-slate-700`,
    disabledItemClassName: tw`pointer-events-none border-slate-300 text-slate-600 opacity-50 shadow-none dark:border-slate-600 dark:text-slate-400`,
    pageLinkClassName: tw`px-3.5 py-2 focus:z-20`,
  },
  // https://www.material-tailwind.com/docs/html/pagination#pagination-group
  materialGrouped: {
    containerClassName: tw`flex justify-center`,
    pageItemClassName: tw`inline-flex items-center border text-sm shadow-sm transition-colors not-last:border-r-0 first:rounded-l-md last:rounded-r-md`,
    activeItemClassName: tw`border-slate-800 bg-slate-800 text-white hover:bg-slate-700 hover:shadow-lg focus:bg-slate-700 focus:shadow-none dark:border-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 dark:focus:bg-slate-600`,
    inactiveItemClassName: tw`border-slate-300 text-slate-600 hover:border-transparent hover:bg-slate-800 hover:text-white hover:shadow-lg dark:border-slate-600 dark:text-slate-400 dark:hover:bg-slate-700`,
    disabledItemClassName: tw`pointer-events-none border-slate-300 text-slate-600 opacity-50 shadow-none dark:border-slate-600 dark:text-slate-400`,
    pageLinkClassName: tw`px-3 py-2 focus:z-20`,
  },
  // https://preline.co/docs/pagination.html
  preline: {
    containerClassName: tw`flex justify-center gap-x-1`,
    pageItemClassName: tw`inline-flex items-center rounded-lg border border-transparent text-sm text-gray-800 focus:bg-gray-100 focus:outline-hidden dark:text-white dark:focus:bg-white/10`,
    activeItemClassName: tw`bg-gray-200 hover:bg-gray-100 dark:bg-neutral-600 dark:hover:bg-white/10`,
    inactiveItemClassName: tw`hover:bg-gray-100 dark:hover:bg-white/10`,
    disabledItemClassName: tw`pointer-events-none opacity-50`,
    pageLinkClassName: tw`px-3 py-2 focus:z-20`,
  },
  //https://tailwindcss.com/plus/ui-blocks/application-ui/navigation/pagination
  plus: {
    containerClassName: tw`flex justify-center -space-x-px`,
    pageItemClassName: tw`inline-flex items-center shadow-xs first:rounded-l-md last:rounded-r-md`,
    activeItemClassName: tw`active z-10 bg-indigo-600 text-white`,
    inactiveItemClassName: tw`text-sm font-semibold text-gray-900 inset-ring inset-ring-gray-300 hover:bg-gray-50 dark:text-gray-200 dark:inset-ring-gray-700 dark:hover:bg-white/5`,
    disabledItemClassName: tw`pointer-events-none text-sm font-semibold text-gray-700 inset-ring inset-ring-gray-300 dark:text-gray-400 dark:inset-ring-gray-700`,
    pageLinkClassName: tw`px-4 py-2 focus:z-20 focus:outline-offset-0 [.active_&]:focus-visible:outline-2 [.active_&]:focus-visible:outline-offset-2 [.active_&]:focus-visible:outline-indigo-600`,
  },
} satisfies Record<string, ClassNameProps>;

export const makeTwExampleCode = (
  classProps: ClassNameProps,
  indent = '',
) => `${indent}containerClassName="${classProps.containerClassName}"
${indent}pageItemClassName="${classProps.pageItemClassName}"
${indent}activeItemClassName="${classProps.activeItemClassName}"
${indent}inactiveItemClassName="${classProps.inactiveItemClassName}"
${indent}disabledItemClassName="${classProps.disabledItemClassName}"
${indent}pageLinkClassName="${classProps.pageLinkClassName}"`;

export const makeFullTwExampleCode = (classProps: ClassNameProps) => `
import React, { useState } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
// project with tailwind configured

function MyTailwindApp() {
  const totalPages = 120;

  const [currentPage, setCurrentPage] = useState(1);

  function handlePageChange(page) {
    setCurrentPage(page);
    // ... do something with \`page\`
  }

  return (
    <ResponsivePagination
      total={totalPages}
      current={currentPage}
      onPageChange={page => handlePageChange(page)}
${makeTwExampleCode(classProps, '      ')}
    />
  );
}
`;
