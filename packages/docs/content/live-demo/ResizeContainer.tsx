import styled from 'styled-components';
import { borderRadius, leading } from '../../src/components/GlobalStyles';

const ResizeContainer = styled.div`
  border: 1px solid #eeeeee;
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
  ${(props: any) => props.visibilityHidden && 'visibility: hidden'}
`;

export default ResizeContainer;
