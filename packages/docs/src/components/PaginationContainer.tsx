import { useState } from 'react';
import styled, { css } from 'styled-components';
import { leading, borderRadius, boxBorder, boxShadow } from './GlobalStyles';

type PaginationContainerProps = {
  className: string;
  hasBorder: boolean;
  noBottomMargin: boolean;
  striped: boolean;
  shadow: boolean;
  children: ({
    current,
    onPageChange,
    total,
  }: {
    current: number;
    onPageChange: (page: number) => void;
    total: number;
  }) => JSX.Element;
};

export function PaginationContainer({
  className,
  hasBorder,
  noBottomMargin,
  striped,
  shadow,
  children: renderPagination,
}: PaginationContainerProps) {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <PaginationContainerDiv
      className={className}
      $hasBorder={hasBorder}
      $noBottomMargin={noBottomMargin}
      $striped={striped}
      $shadow={shadow}
    >
      {renderPagination({
        current: currentPage,
        onPageChange: setCurrentPage,
        total: 20,
      })}
    </PaginationContainerDiv>
  );
}

const PaginationContainerDiv = styled.div<{
  $hasBorder: boolean;
  $noBottomMargin: boolean;
  $striped: boolean;
  $shadow: boolean;
}>`
  ${({ $hasBorder }) =>
    $hasBorder &&
    css`
      border: ${boxBorder};
      border-radius: ${borderRadius};
      padding: 1rem 0;
    `}

  ${({ $noBottomMargin }) =>
    !$noBottomMargin &&
    css`
      margin-bottom: ${leading};
    `}

  ${({ $striped }) =>
    $striped &&
    css`
      background: repeating-linear-gradient(
        135deg,
        #eeeeee,
        #eeeeee 10px,
        #ffffff 10px,
        #ffffff 20px
      );
    `}

    ${({ $shadow }) =>
    $shadow &&
    css`
      box-shadow: ${boxShadow};
    `}
`;
