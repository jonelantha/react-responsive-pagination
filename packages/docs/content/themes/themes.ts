import styled from 'styled-components';
import { PaginationContainer } from '../../src/components/PaginationContainer';
import bootstrapLightCss from '!!raw-loader!react-responsive-pagination/themes/bootstrap-light.css';
import classicLightCss from '!!raw-loader!react-responsive-pagination/themes/classic-light.css';
import minimalLightCss from '!!raw-loader!react-responsive-pagination/themes/minimal-light.css';
import { boxBorder } from '../../src/components/GlobalStyles';

export const BootstrapLightStyleContainer = styled(PaginationContainer)`
  ${bootstrapLightCss}
`;

export const ClassicLightStyleContainer = styled(PaginationContainer)`
  ${classicLightCss}
`;

export const MinimalLightStyleContainer = styled(PaginationContainer)`
  ${minimalLightCss}
`;

export const exampleAppCode = `
import React, { useState } from 'react';
import ResponsivePagination from 'react-responsive-pagination';

import 'react-responsive-pagination/themes/classic-light.css';
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
