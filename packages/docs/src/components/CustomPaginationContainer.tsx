import styled, { css } from 'styled-components';
import { leading, borderRadius, boxBorder } from './GlobalStyles';

export const CustomPaginationContainer = styled.div<{ noBorder: boolean }>`
  ${({ noBorder }) =>
    !noBorder &&
    css`
      border: ${boxBorder};
      border-radius: ${borderRadius};
      margin-bottom: ${leading};
    `}
`;
