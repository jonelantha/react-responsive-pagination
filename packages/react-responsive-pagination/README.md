# React Responsive Pagination

![npm version](https://img.shields.io/npm/v/react-responsive-pagination.svg?style=flat)
![minzipped size](https://img.shields.io/bundlephobia/minzip/react-responsive-pagination)
![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)
[![Test](https://github.com/jonelantha/react-responsive-pagination/actions/workflows/test.yml/badge.svg)](https://github.com/jonelantha/react-responsive-pagination/actions/workflows/test.yml)
[![Release](https://github.com/jonelantha/react-responsive-pagination/actions/workflows/release.yml/badge.svg)](https://github.com/jonelantha/react-responsive-pagination/actions/workflows/release.yml)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

A responsive React pagination component which intelligently renders to the available width

🌟 Just updated for React 18 🌟

<a href="https://react-responsive-pagination.elantha.com/"><img src="./react-responsive-pagination.gif?raw=true" width="985" alt="react-responsive-pagination example" /></a>

### ⚡️ [LIVE DEMO - try it out for yourself!](https://react-responsive-pagination.elantha.com/live-demo/) ⚡️

### 📕 Visit [https://react-responsive-pagination.elantha.com](https://react-responsive-pagination.elantha.com) to get started 🚀

## 🥾 Works out of the box with Bootstrap 4.x

Using Bootstrap? See the [Bootstrap 4 Getting Started Guide](https://react-responsive-pagination.elantha.com/bootstrap-pagination/)

## 🎨 Supports custom styling

Custom styles? No problem - see the [Custom Styles Guide](https://react-responsive-pagination.elantha.com/custom-styled-pagination/)

## ⏳ Quick Start

```bash
npm install react-responsive-pagination
```

```jsx
// ... make sure appropriate css is in the project (see guides above)
import React, { useState } from 'react';
import Pagination from 'react-responsive-pagination';

function MyApp() {
  const [currentPage, setCurrentPage] = useState(4);

  const totalPages = 17;

  return (
    <Pagination
      current={currentPage}
      total={totalPages}
      onPageChange={setCurrentPage}
    />
  );
}
```

## ✔︎ Requirements / Compatibility

- React 18, 17 and 16.8 upwards
- Modern browsers only - not suitable for IE 11

## 🔧 Props

| Prop name                | Type                      | Description                                                                                                                                                                                                                                 |
| ------------------------ | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| current                  | number                    | The current active page. Indexed from 1                                                                                                                                                                                                     |
| total                    | number                    | The total number of pages                                                                                                                                                                                                                   |
| onPageChange             | (newPage: number) => void | A callback handler which is called when the user clicks a new page, note that the active page will not change unless the `current` prop is updated to reflect the new page (as in the example above). The `newPage` value is indexed from 1 |
| maxWidth (optional)      | number                    | (optional) The maximum width (in pixels) of the pagination component. Specify a value if you want to override the automatic sizing. Note this width may be exceeded in the case where it's not possible to output a small enough component  |
| previousLabel (optional) | string                    | (optional) The label for the previous button, default value is `«`                                                                                                                                                                          |
| nextLabel (optional)     | string                    | (optional) The label for the next button, default value is `»`                                                                                                                                                                              |

See [Props Reference](https://react-responsive-pagination.elantha.com/props) for the full list

## ℹ About Auto Sizing

More info in the [FAQ](https://react-responsive-pagination.elantha.com/faq/#about-auto-sizing)
