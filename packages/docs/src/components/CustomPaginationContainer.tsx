import styled from 'styled-components';
import { leading, borderRadius } from './GlobalStyles';

const CustomPaginationContainer = styled.div`
  ${(props: { customStyles: string }) => props.customStyles}

  border: 1px solid #eeeeee;
  border-radius: ${borderRadius};
  margin-bottom: ${leading};
`;

export default CustomPaginationContainer;
