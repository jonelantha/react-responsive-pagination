---
title: "Live demo and examples | react-responsive-pagination"
description: "Resize the browser to see react-responsive-pagination re-fit its page links, with a copy-paste React example using the classic theme."
index: "https://react-responsive-pagination.elantha.com/index.md"
---

# Live Demo

## Code Example

The example below uses the built-in **Classic** theme

See [Included Themes](/themes.md) for more themes - alternatively, use with [Tailwind](/tailwind-pagination.md), [Bootstrap](/bootstrap-pagination.md) or [Custom CSS](/custom-styled-pagination.md)

```jsx
import React, { useState } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic-light-dark.css';
// ^ include theme css file, this is the classic theme (see themes documentation for other options)

function MyApp() {
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
