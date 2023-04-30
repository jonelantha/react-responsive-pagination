import styled from 'styled-components';
import { PaginationContainer } from '../../src/components/PaginationContainer';
import bootstrapCss from '!!raw-loader!react-responsive-pagination/themes/bootstrap.css';
import classicCss from '!!raw-loader!react-responsive-pagination/themes/classic.css';
import minimalCss from '!!raw-loader!react-responsive-pagination/themes/minimal.css';
import { boxBorder } from '../../src/components/GlobalStyles';

export const BootstrapThemeContainer = styled(PaginationContainer)`
  ${bootstrapCss}
`;

export const ClassicThemeContainer = styled(PaginationContainer)`
  ${classicCss}
`;

export const MinimalThemeContainer = styled(PaginationContainer)`
  ${minimalCss}
`;

export const exampleAppCode = `
import React, { useState } from 'react';
import ResponsivePagination from 'react-responsive-pagination';

import 'react-responsive-pagination/themes/classic.css';
// ^ classic theme, see below for other themes
// include this once in the project (preferrably the main index.js)

export default function MyApp() {
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
    />
  );
}
`;

export const ThemeAttributes = styled.div`
  border-left: ${boxBorder};
  padding-left: 1.5rem;
`;
