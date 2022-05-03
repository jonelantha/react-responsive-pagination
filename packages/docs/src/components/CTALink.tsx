import styled from 'styled-components';
import { Link } from 'gatsby';
import { borderRadius, colorLink, boxShadow } from './GlobalStyles';
import { chevron } from './icons';

const CTALink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 1rem;
  background: ${colorLink};
  padding: 0.5rem 0.75rem;
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
  }
`;

export default CTALink;
