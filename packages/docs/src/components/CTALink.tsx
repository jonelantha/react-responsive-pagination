import styled from 'styled-components';
import { Link } from 'gatsby';
import { borderRadius } from './GlobalStyles';

const CTALink = styled(Link)`
  display: inline-block;
  font-size: 1rem;
  background: rgb(28, 100, 242);
  padding: 0.75rem 1rem;
  color: #ffffff;
  border-radius: ${borderRadius};
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);

  &:hover {
    text-decoration: none;
    color: #ffffff;
    background: rgb(28, 100, 242, 0.75);
  }

  &::after {
    content: '►';
    margin-left: 0.75rem;
  }
`;

export default CTALink;
