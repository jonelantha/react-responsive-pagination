---
title: 'react-responsive-pagination live demo and examples'
description: 'react-responsive-pagination live demo and examples'
---

import OverrideSSR from "../../src/components/OverrideSSR"
import Bootstrap4PaginationStyles from '../../src/components/Bootstrap4PaginationStyles';
import BootstrapLiveDemoClass from "../../src/components/BootstrapLiveDemoClass"
import BootstrapSSR from "../../src/components/BootstrapSSR"
import ResizeContainer from "../../src/components/ResizeContainer"

# [react-responsive-pagination](https://www.npmjs.com/package/react-responsive-pagination)

**Live Demo** - try resizing your browser to see the component automatically adjust to the available width.

<Bootstrap4PaginationStyles>
<OverrideSSR>
{isSSR => (
  <ResizeContainer visibilityHidden={isSSR}>
    {isSSR ? <BootstrapSSR /> : <BootstrapLiveDemoClass />}
  </ResizeContainer>
)}
</OverrideSSR>
</Bootstrap4PaginationStyles>

NOTE: the striped region illustrates the component's container, it's not part of the component 🙂

## Example: Functional Component (using hooks)

```jsx
import React, { useState } from 'react';
import Pagination from 'react-responsive-pagination';
import 'bootstrap/dist/css/bootstrap.css'; // this example uses Bootstrap 4.x styles

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

## Example: Class Component

```jsx
import React from 'react';
import Pagination from 'react-responsive-pagination';
import 'bootstrap/dist/css/bootstrap.css'; // this example uses Bootstrap 4.x styles

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

## Further Details

For further details, see the [react-responsive-pagination README](https://www.npmjs.com/package/react-responsive-pagination)
