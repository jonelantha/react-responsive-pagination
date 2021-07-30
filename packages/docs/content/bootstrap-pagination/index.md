---
title: 'Responsive Bootstrap Pagination Component'
description: 'Responsive Bootstrap React Pagination Component'
---

import OverrideSSR from "../../src/components/OverrideSSR"
import Bootstrap4PaginationStyles from '../../src/components/Bootstrap4PaginationStyles';
import BootstrapLiveDemoClass from "../../src/components/BootstrapLiveDemoClass"
import BootstrapSSR from "../../src/components/BootstrapSSR"

import { PropsTable, PropDef } from "../../src/components/PropsTable"

# Responsive Bootstrap Pagination

**react-responsive-pagination** is an easy to use responsive pagination component:

- Truly responsive - always outputs the right number of pagination elements for the width available, no guesswork needed
- Ready to go with Bootstrap 4.x styles, just include the component in your Bootstrap 4.x project

<Bootstrap4PaginationStyles>
<OverrideSSR>
{isSSR => isSSR ? <BootstrapSSR /> : <BootstrapLiveDemoClass />}
</OverrideSSR>
</Bootstrap4PaginationStyles>

## Installation

You can install **react-responsive-pagination** from npm:

```bash
npm install react-responsive-pagination
```

## Compatibility

- React 16.8 or later
- Modern browsers only - not suitable for IE 11

## Bootstrap 4.x Styles

**react-responsive-pagination** is styled for [Bootstrap 4.x](https://getbootstrap.com/docs/4.6/). If you don't already have Bootstrap styles see the [Bootstrap 4.x Download Guide](https://getbootstrap.com/docs/4.6/getting-started/download/)

Don't want to use Bootstrap? No problem, see the [Custom Style Guide](./custom-styled-pagination)

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

```jsx
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

## Props Reference

<PropsTable>
<PropDef name='current' type='number'>
The current active page. Indexed from 1
</PropDef>
<PropDef name='total' type='number' >
The total number of pages
</PropDef>
<PropDef name='onPageChange' type='(newPage: number) => void' >

A callback handler which is called when the user clicks a new page. The `newPage` parameter is indexed from 1

Note that the active page will not change unless the `current` prop is updated to reflect the new page (as in the example above)

</PropDef>
<PropDef name='maxWidth' type='number' defaultValue='undefined'>
The maximum width (in pixels) of the pagination component. Use this prop if you want to override the automatic sizing. Note the width may be exceeded if it's not possible a component to the specified width
</PropDef>
</PropsTable>

## Further Details

For further details, see the [react-responsive-pagination README](https://www.npmjs.com/package/react-responsive-pagination)