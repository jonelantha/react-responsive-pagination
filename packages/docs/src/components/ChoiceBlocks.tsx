import styled from 'styled-components';
import CTALink from './CTALink';
import { borderRadius, leading, boxShadow, boxBorder } from './GlobalStyles';

export const ChoiceBlocksContainer = styled.div`
  display: grid;
  width: min(55m, 100%);
  gap: ${leading};
`;

const minWidthForTwoLineLayout = '650px';

export const ChoiceBlockWrapper = styled.section`
  border-radius: ${borderRadius};
  border: ${boxBorder};
  box-shadow: ${boxShadow};
  padding: 1rem;
  display: grid;
  row-gap: 1rem;
  column-gap: 1.5rem;

  grid-template-columns: auto;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    'title'
    'example'
    'cta';

  @media screen and (min-width: ${minWidthForTwoLineLayout}) {
    grid-template-columns: 1fr max-content;
    grid-template-rows: auto auto;
    grid-template-areas:
      'title cta'
      'example cta';
  }

  align-items: center;

  h3 {
    grid-area: title;
    margin: 0;
  }

  div {
    overflow: hidden;
    grid-area: example;
  }

  ${CTALink} {
    grid-area: cta;
    justify-self: end;
    @media screen and (min-width: ${minWidthForTwoLineLayout}) {
      width: 8.5rem;
    }
  }
`;

export function ChoiceBlock({
  title,
  ctaLabel,
  ctaLink,
  children,
}: {
  title: string;
  ctaLabel: string;
  ctaLink: string;
  children: JSX.Element;
}) {
  return (
    <ChoiceBlockWrapper>
      <h3>{title}</h3>
      {children}
      <CTALink to={ctaLink}>{ctaLabel}</CTALink>
    </ChoiceBlockWrapper>
  );
}
