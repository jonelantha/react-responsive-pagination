import styled from 'styled-components';
import { Link } from 'gatsby';
import { borderRadius, colorLink, boxShadow } from './GlobalStyles';
import { chevron } from './icons';

const CTALink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.1rem;
  line-height: 1.5;
  background: ${colorLink};
  padding: 0.75rem 1rem;
  color: #ffffff;
  border-radius: ${borderRadius};
  box-shadow: ${boxShadow};
  text-decoration: none;

  &:hover {
    text-decoration: none;
    color: #ffffff;
    background: rgb(28, 100, 242, 0.75);
  }

  &::after {
    content: ${chevron('#ffffff', true)};
    display: inline-block;
    line-height: 1;
    margin-left: 0.5rem;
    height: 1rem;
    width: 1rem;
    transform: rotate(90deg);
    flex-shrink: 0;
  }
`;

export default CTALink;
