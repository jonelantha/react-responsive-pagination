---
title: 'Responsive Bootstrap Pagination Component'
description: 'React npm responsive Bootstrap pagination component'
navTitle: 'Bootstrap Usage'
topNavOrder: 2
sideNavOrder: 3
footerNavOrder: 4
addOverview: true
---

import OverrideSSR from "../../src/components/OverrideSSR"
import Bootstrap4PaginationContainer from '../../src/components/Bootstrap4PaginationContainer';
import BootstrapLiveDemo from "../../src/components/BootstrapLiveDemo"
import BootstrapSSR from "../../src/components/BootstrapSSR"

import { PropsTable, PropDef } from "../../src/components/PropsTable"
import CommonProps from "../props/commonProps.md"
import ExtraClassNameProp from "../props/extraClassNameProp.md"
import LabelProps from "../props/labelProps.md"

# Bootstrap Usage

**react-responsive-pagination** is an easy to use React responsive pagination component which always outputs the right number of pagination elements for the width available, no guesswork needed

Ready to go with [Bootstrap 4.x](https://getbootstrap.com/docs/4.6/) styles - just include the component in your Bootstrap 4.x project

<Bootstrap4PaginationContainer>
<OverrideSSR>
{isSSR => isSSR ? <BootstrapSSR /> : <BootstrapLiveDemo />}
</OverrideSSR>
</Bootstrap4PaginationContainer>

Don't want to use Bootstrap? No problem, see the [Custom Styled Pagination](/custom-styled-pagination) guide

## Installation

Install **react-responsive-pagination** from npm:

```bash
npm install react-responsive-pagination
```

To install Bootstrap styles, see the [Bootstrap 4.x Download Guide](https://getbootstrap.com/docs/4.6/getting-started/download/)

## Quick Start - Functional Components / Hooks

```jsx
import React, { useState } from 'react';
import Pagination from 'react-responsive-pagination';
// Bootstrap 4.x styles included somewhere in the project
import 'bootstrap/dist/css/bootstrap.css';

function MyApp() {
  const totalPages = 120;

  const [currentPage, setCurrentPage] = useState(1);

  function handlePageChange(page) {
    setCurrentPage(page);
    // ... do something with `page`
  }

  return (
    <Pagination
      total={totalPages}
      current={currentPage}
      onPageChange={page => handlePageChange(page)}
    />
  );
}
```

## Quick Start - Class Components

```jsx previewSize=10
import React from 'react';
import Pagination from 'react-responsive-pagination';
// Bootstrap 4.x styles included somewhere in the project
import 'bootstrap/dist/css/bootstrap.css';

export default class MyApp extends React.Component {
  state = {
    totalPages: 120,
    currentPage: 1,
  };

  handlePageChange(page) {
    this.setState({ currentPage: page });
    // ... do something with `page`
  }

  render() {
    return (
      <Pagination
        total={this.state.totalPages}
        current={this.state.currentPage}
        onPageChange={page => this.handlePageChange(page)}
      />
    );
  }
}
```

## Options

### Previous and Next Labels

Change the default labels for the previous and next buttons by setting the `previousLabel` and `nextLabel` props:

**Example - Text labels**

<Bootstrap4PaginationContainer>
<OverrideSSR>
{isSSR => isSSR ? <BootstrapSSR /> : <BootstrapLiveDemo previousLabel="Previous" nextLabel="Next" />}
</OverrideSSR>
</Bootstrap4PaginationContainer>

```jsx
<Pagination ... previousLabel="Previous" nextLabel="Next" />
```

**Example - Single arrow labels**

<Bootstrap4PaginationContainer>
<OverrideSSR>
{isSSR => isSSR ? <BootstrapSSR /> : <BootstrapLiveDemo previousLabel="‹" nextLabel="›" />}
</OverrideSSR>
</Bootstrap4PaginationContainer>

```jsx
<Pagination ... previousLabel="‹" nextLabel="›" />
```

### Alignment / Justify

Change how the pagination is positioned by setting the `extraClassName` prop to one of the [Bootstrap justify content options](https://getbootstrap.com/docs/4.6/utilities/flex/#justify-content). Here are some suitable values:

| Value                    | Alignment          |
| ------------------------ | ------------------ |
| `justify-content-start`  | Left               |
| `justify-content-end`    | Right              |
| `justify-content-center` | Center _(default)_ |

**Example - align pagination left:**

<Bootstrap4PaginationContainer noBorder>
<OverrideSSR>
{isSSR => isSSR ? <BootstrapSSR /> : <BootstrapLiveDemo extraClassName="justify-content-start" />}
</OverrideSSR>
</Bootstrap4PaginationContainer>

```jsx
<Pagination ... extraClassName="justify-content-start" />
```

## Props Reference

A selection of props which may be helpful when using Bootstrap styles - for the full list of props see [Props Reference](/props)

<PropsTable>
<CommonProps />
<LabelProps />
<ExtraClassNameProp />
</PropsTable>
