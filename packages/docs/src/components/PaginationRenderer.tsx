import { useState } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import type { ResponsivePaginationProps } from 'react-responsive-pagination';

export type PaginationRendererProps = Partial<ResponsivePaginationProps> & {
  initialPage?: number;
  className?: string;
};

export default function PaginationRenderer({
  initialPage,
  className,
  ...props
}: PaginationRendererProps) {
  const [currentPage, setCurrentPage] = useState(initialPage ?? 1);

  return (
    <div className={className}>
      <ResponsivePagination
        current={currentPage}
        onPageChange={setCurrentPage}
        total={20}
        {...props}
      />
    </div>
  );
}
