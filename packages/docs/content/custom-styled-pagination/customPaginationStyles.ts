import styled from 'styled-components';
import { PaginationContainer } from '../../src/components/PaginationContainer';

export const customStyles = `
.pagination {
  justify-content: center;
  display: flex;
  padding-left: 0;
  list-style: none;
  margin: 0;
}

.page-item .page-link {
  position: relative;
  display: block;
  margin: 0 2px;
  min-height: 40px;
  min-width: 40px;
  border-radius: 20px;
  text-align: center;
  line-height: 40px;
  color: #007bff;
  text-decoration: none;
}

.page-item a.page-link:hover {
  background-color: #cccccc;
}

.page-item.active .page-link {
  font-weight: 700;
  color: #ffffff;
  background-color: #007bff;
}

.page-item.disabled .page-link {
  color: #6c757d;
  pointer-events: none;
  cursor: auto;
}`;

export const CustomStyleContainer = styled(PaginationContainer)`
  ${customStyles}
`;

export const exampleAppCode = `
import React, { useState } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import './pagination.css'; // see pagination.css example below

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
