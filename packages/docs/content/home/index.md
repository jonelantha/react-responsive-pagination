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

import OverrideSSR from "../../src/components/OverrideSSR"
import Bootstrap4PaginationContainer from '../../src/components/Bootstrap4PaginationContainer';
import BootstrapLiveDemo from "../../src/components/BootstrapLiveDemo"
import BootstrapSSR from "../../src/components/BootstrapSSR"

import { CustomStyleContainer3 } from '../custom-styled-pagination/customPaginationStyles';
import { ChoiceBlocksContainer, ChoiceBlock, ChoiceBlockCTA } from '../../src/components/ChoiceBlocks';

# react-responsive-pagination

### _Take the guess work out of pagination_

An npm React component for truly responsive pagination

Pagination which always fits:

<Bootstrap4PaginationContainer noBorder>
  <OverrideSSR>
    {isSSR => isSSR ? <BootstrapSSR /> : <BootstrapLiveDemo />}
  </OverrideSSR>
</Bootstrap4PaginationContainer>

_Try it for yourself, resize the window (or change the orientation of your device)_

<TickList>
  - Truly responsive, always outputs the right number of pagination elements for the width available
  - Supports Bootstrap 4.x
  - Supports custom styles
  - High performance, no unnecessary renders
  - Built for tree-shaking = minimum impact on the bundle
  - Modern hook based architecture with TypeScript
  - Backed by a comprehensive automated browser based test suite
</TickList>

## Getting Started

```bash
npm install react-responsive-pagination
```

<ChoiceBlocksContainer>
  <ChoiceBlock>
    ### Want to use Bootstrap styles?
    <Bootstrap4PaginationContainer noBorder>
      <OverrideSSR>
        {isSSR => isSSR ? <BootstrapSSR /> : <BootstrapLiveDemo totalPages={4} />}
      </OverrideSSR>
    </Bootstrap4PaginationContainer>
    <ChoiceBlockCTA>
      <CTALink to="/bootstrap-pagination">Bootstrap Pagination</CTALink>
    </ChoiceBlockCTA>
  </ChoiceBlock>
  <ChoiceBlock>
    ### Want to use custom styles?
    <CustomStyleContainer3 noBorder>
      <OverrideSSR>
        {isSSR => isSSR ? <BootstrapSSR /> : <BootstrapLiveDemo totalPages={4} />}
      </OverrideSSR>
    </CustomStyleContainer3>
    <ChoiceBlockCTA>
      <CTALink to="/custom-styled-pagination">Custom Styled Pagination</CTALink>
    </ChoiceBlockCTA>
  </ChoiceBlock>
</ChoiceBlocksContainer>
