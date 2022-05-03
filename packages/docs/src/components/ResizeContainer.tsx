import styled from 'styled-components';
import { borderRadius, leading, boxBorder, boxShadow } from './GlobalStyles';

const ResizeContainer = styled.div<{ visibilityHidden: boolean }>`
  border: ${boxBorder};
  border-radius: ${borderRadius};
  padding-top: 1rem; // balances bootstrap bottom-margin
  margin-bottom: ${leading};
  background: repeating-linear-gradient(
    135deg,
    #eeeeee,
    #eeeeee 10px,
    #ffffff 10px,
    #ffffff 20px
  );
  box-shadow: ${boxShadow};
  ${({ visibilityHidden }) => visibilityHidden && 'visibility: hidden'}
`;

export default ResizeContainer;
