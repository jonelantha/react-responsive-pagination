---
title: 'Custom Styles Guide'
description: 'react-responsive-pagination guide for custom styling'
---

import OverrideSSR from "../../src/components/OverrideSSR"
import CustomPaginationContainer from "../../src/components/CustomPaginationContainer"
import { customStyles1, customStyles2, customStyles3, minimumBootstrap4Styles } from './customPaginationStyles';
import BootstrapLiveDemoClass from "../../src/components/BootstrapLiveDemoClass"
import BootstrapSSR from "../../src/components/BootstrapSSR"
import ResizeContainer from "../../src/components/ResizeContainer"

# Custom Styles Guide

The css examples below show how custom styles can be created for [react-responsive-pagination](https://www.npmjs.com/package/react-responsive-pagination) - these examples should make a good starting point for custom styles.

For a full list of suggested css selectors to target, see [Selector Reference](#selector-reference)

## Example 1 - Basic Pagination

<OverrideSSR>
{isSSR => (
  <CustomPaginationContainer customStyles={customStyles1}>
    {isSSR ? <BootstrapSSR /> : <BootstrapLiveDemoClass />}
  </CustomPaginationContainer>
)}
</OverrideSSR>

**Pagination css:**

<CodeBlock code={customStyles1} language='css' />

_(also see [App Code Example](#app-code-example))_

## Example 2 - Classic Pagination

<OverrideSSR>
{isSSR => (
  <CustomPaginationContainer customStyles={customStyles2}>
    {isSSR ? <BootstrapSSR /> : <BootstrapLiveDemoClass />}
  </CustomPaginationContainer>
)}
</OverrideSSR>

**Pagination css:**

<CodeBlock code={customStyles2} language='css' />

_(also see [App Code Example](#app-code-example))_

## Example 3 - Advanced Pagination

<OverrideSSR>
{isSSR => (
  <CustomPaginationContainer customStyles={customStyles3}>
    {isSSR ? <BootstrapSSR /> : <BootstrapLiveDemoClass />}
  </CustomPaginationContainer>
)}
</OverrideSSR>

**Pagination css:**

<CodeBlock code={customStyles3} language='css' />

_(also see [App Code Example](#app-code-example))_

## Example 4 - Standalone Bootstrap 4 Styles

<OverrideSSR>
{isSSR => (
  <CustomPaginationContainer customStyles={minimumBootstrap4Styles}>
    {isSSR ? <BootstrapSSR /> : <BootstrapLiveDemoClass />}
  </CustomPaginationContainer>
)}
</OverrideSSR>

**Pagination css:**

<CodeBlock code={minimumBootstrap4Styles} language='css' />

_(for an example of the App code, see below)_

## App Code Example

```jsx title=index.js
import React, { useState } from 'react';
import Pagination from 'react-responsive-pagination';
import './pagination-styles.css';

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

## Selector Reference

| Selector                         | Notes                                                                                                                                                                                                                         |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.pagination`                    | **Pagination container** _(<ul\> tag)_<br />The recommended style is a horizontal flexbox (see examples below)                                                                                                                |
| `.page-item`                     | **Item containers** _(<li\> tags)_<br />Styles may not be needed for this selector, see selector below                                                                                                                        |
| `.page-item .page-link`          | **Item elements** _(<a\> or <span\> tags)_<br />Includes links and static labels. Style as a block element with appropriate font, margin and border (see examples below)                                                      |
| `.page-item a.page-link`         | **Clickable item elements** _(<a\> tags)_<br />Page links or the next/previous buttons (if they are clickable)                                                                                                                |
| `.page-item.active .page-link`   | **Active page link** _(<a\> tags)_<br />CSS should highlight this element (see examples below)                                                                                                                                |
| `.page-item.disabled .page-link` | **Disabled items** _(<span\> tags)_<br />Includes '...' or disabled nav buttons. CSS should show grey out these elements (see examples below)                                                                                 |
| `.sr-only`                       | **Screen reader only elements** _(<span\> tags)_<br />Required for accessibility. These elements not be visible, use CSS to visually hide these elements in a way screen readers can still read the text (see examples below) |

## Further Details

For further details, see the [react-responsive-pagination README](https://www.npmjs.com/package/react-responsive-pagination)
