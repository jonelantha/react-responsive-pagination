import styled from 'styled-components';
import { borderRadius, leading, boxShadow, boxBorder } from './GlobalStyles';

export const ChoiceBlocksContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(19rem, 1fr));
  width: min(50em, 100%);
  gap: ${leading};
`;

export const ChoiceBlock = styled.section`
  overflow: hidden;
  border-radius: ${borderRadius};
  border: ${boxBorder};
  box-shadow: ${boxShadow};
  padding: 1rem;
`;

export const ChoiceBlockCTA = styled.div`
  display: flex;
  justify-content: end;
`;
