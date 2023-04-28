---
title: 'React Responsive Pagination Component'
description: 'An npm React component for truly responsive pagination'
navTitle: 'Introduction'
footerNavTitle: 'Documentation'
path: '/'
sideNavOrder: 1
footerNavOrder: 1
addOverview: true
---

import ResponsivePagination from 'react-responsive-pagination';
import { CustomStyleContainer } from '../custom-styled-pagination/customPaginationStyles';
import { BootstrapLightStyleContainer, ClassicLightStyleContainer } from '../themes/themes';
import { ChoiceBlocksContainer, ChoiceBlock } from '../../src/components/ChoiceBlocks';

# react-responsive-pagination

### _Take the guess work out of pagination_

An npm React component for truly responsive pagination

Pagination which always outputs the right number of links for the width available:

<BootstrapLightStyleContainer>
  {(props) => <ResponsivePagination {...props} />}
</BootstrapLightStyleContainer>

_Try it for yourself, resize the window (or change the orientation of your device)_

<TickList>
  - Fully accessible with aria tags for screen readers  
  - Ready styled themes (or bring your own css)
  - Bootstrap 4 & 5 support built-in
  - High performance, no unnecessary renders
  - Built for tree-shaking = minimum impact on the bundle
  - Modern hook based architecture with 100% TypeScript
  - Backed by a comprehensive automated browser based test suite
</TickList>

## Getting Started

```bash
npm install react-responsive-pagination
```

<ChoiceBlocksContainer>
  <ChoiceBlock title='Want ready-styled pagination?' ctaLabel='Themed Pagination' ctaLink="/themes">
    <ClassicLightStyleContainer noBottomMargin>
      {(props) => <ResponsivePagination {...props} />}
    </ClassicLightStyleContainer>
  </ChoiceBlock>
  <ChoiceBlock title='Already using Bootstrap?' ctaLabel='Bootstrap Pagination' ctaLink="/bootstrap-pagination">
    <BootstrapLightStyleContainer noBottomMargin>
      {(props) => <ResponsivePagination {...props} />}
    </BootstrapLightStyleContainer>
  </ChoiceBlock>
  <ChoiceBlock title='Want to use custom styles?' ctaLabel='Custom Pagination' ctaLink="/custom-styled-pagination">
    <CustomStyleContainer noBottomMargin>
       {(props) => <ResponsivePagination {...props} />}
    </CustomStyleContainer>
  </ChoiceBlock>
</ChoiceBlocksContainer>
