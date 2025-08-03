import { useState } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import type { ResponsivePaginationProps } from 'react-responsive-pagination';

export default function PaginationRenderer(
  props: Partial<ResponsivePaginationProps> & { initialPage?: number },
) {
  const [currentPage, setCurrentPage] = useState(props.initialPage ?? 1);

  return (
    <div>
      <ResponsivePagination
        current={currentPage}
        onPageChange={setCurrentPage}
        total={20}
        {...props}
      />
    </div>
  );
}
