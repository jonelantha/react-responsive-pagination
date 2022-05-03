import styled from 'styled-components';
import { borderRadius, boxShadow, boxBorder } from './GlobalStyles';

const TickList = styled.div`
  ul {
    border: ${boxBorder};
    border-radius: ${borderRadius};
    padding: 1rem;
    list-style-type: '✅';
    padding-left: 2.25rem;

    li {
      padding-left: 0.75rem;
    }
  }
`;

export default TickList;
