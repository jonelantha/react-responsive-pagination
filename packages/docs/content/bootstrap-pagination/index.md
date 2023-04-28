---
title: 'Responsive Bootstrap Pagination Component'
description: 'React npm responsive Bootstrap pagination component'
navTitle: 'Bootstrap Usage'
topNavOrder: 3
sideNavOrder: 4
footerNavOrder: 5
addOverview: true
---

import ResponsivePagination from 'react-responsive-pagination';
import { BootstrapLightStyleContainer } from '../themes/themes';
import { PropsTable, PropDef } from "../../src/components/PropsTable"
import CommonProps from "../props/commonProps.md"
import ExtraClassNameProp from "../props/extraClassNameProp.md"
import LabelProps from "../props/labelProps.md"
import RenderNavProps from "../props/renderNavProps.md"
import NarrowProps from "../props/narrowProps.md"

# Bootstrap Usage

**react-responsive-pagination** is an easy to use React responsive pagination component which always outputs the right number of pagination elements for the width available, no guesswork needed

Ready to go with Bootstrap styles - see examples below

<BootstrapLightStyleContainer hasBorder>
  {(props) => <ResponsivePagination {...props} />}
</BootstrapLightStyleContainer>

Not using Bootstrap? No problem, see the available ready-to-go [themes](/themes) including a standalone Bootstrap theme

Want to customise the appearance? See the [Custom Styles](/custom-styled-pagination) guide

## Installation

Install **react-responsive-pagination** from npm:

```bash
npm install react-responsive-pagination
```

To install Bootstrap styles, see the [Bootstrap 5.x Download Guide](https://getbootstrap.com/docs/5.2/getting-started/download/)

## Bootstrap example

```jsx
// Bootstrap 5.x or 4.x styles included somewhere in the project
import React, { useState } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import 'bootstrap/dist/css/bootstrap.css';

function MyBootstrapApp() {
  const totalPages = 120;

  const [currentPage, setCurrentPage] = useState(1);

  function handlePageChange(page) {
    setCurrentPage(page);
    // ... do something with `page`
  }

  return (
    <ResponsivePagination
      total={totalPages}
      current={currentPage}
      onPageChange={page => handlePageChange(page)}
    />
  );
}
```

## Options

### Previous and Next Labels

Change the default labels for the previous and next buttons by setting the `previousLabel` and `nextLabel` props, see examples below

If needed, the ARIA labels can also be changed by setting the `ariaPreviousLabel` and `ariaNextLabel` props, please see [Props Reference](#props-reference) below

**Example - Text labels**

<BootstrapLightStyleContainer hasBorder>
  {(props) => <ResponsivePagination {...props} previousLabel="Previous" nextLabel="Next" />}
</BootstrapLightStyleContainer>
  
```jsx
<ResponsivePagination ... previousLabel="Previous" nextLabel="Next" />
```

**Example - Single arrow labels**

<BootstrapLightStyleContainer hasBorder>
  {(props) => <ResponsivePagination {...props} previousLabel="‹" nextLabel="›" />}
</BootstrapLightStyleContainer>

```jsx
<ResponsivePagination ... previousLabel="‹" nextLabel="›" />
```

### No navigation buttons

Don't include the navigation buttons by setting `renderNav` to **false**:

**Example - No navigation buttons**

<BootstrapLightStyleContainer hasBorder>
  {(props) => <ResponsivePagination {...props} renderNav={false} />}
</BootstrapLightStyleContainer>

```jsx
<ResponsivePagination ... renderNav={false} />
```

### Alignment / Justify

Change how the pagination is positioned by setting the `extraClassName` prop to one of the [Bootstrap justify content options](https://getbootstrap.com/docs/4.6/utilities/flex/#justify-content). Here are some suitable values:

| Value                    | Alignment          |
| ------------------------ | ------------------ |
| `justify-content-start`  | Left               |
| `justify-content-end`    | Right              |
| `justify-content-center` | Center _(default)_ |

**Example - align pagination left:**

<BootstrapLightStyleContainer>
  {(props) => <ResponsivePagination {...props} extraClassName="justify-content-start" />}
</BootstrapLightStyleContainer>

```jsx
<ResponsivePagination ... extraClassName="justify-content-start" />
```

## Props Reference

A selection of props which may be helpful when using Bootstrap styles - for the full list of props see [Props Reference](/props)

<PropsTable>
  <CommonProps />
  <LabelProps />
  <ExtraClassNameProp />
  <RenderNavProps />
  <NarrowProps />
</PropsTable>
