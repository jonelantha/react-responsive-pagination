# React Responsive Pagination

![npm version](https://img.shields.io/npm/v/react-responsive-pagination.svg?style=flat)
![minzipped size](https://img.shields.io/bundlephobia/minzip/react-responsive-pagination)
![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)
[![Test](https://github.com/jonelantha/react-responsive-pagination/actions/workflows/test.yml/badge.svg)](https://github.com/jonelantha/react-responsive-pagination/actions/workflows/test.yml)
[![Release](https://github.com/jonelantha/react-responsive-pagination/actions/workflows/release.yml/badge.svg)](https://github.com/jonelantha/react-responsive-pagination/actions/workflows/release.yml)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

A responsive React pagination component which intelligently renders to the available width - for React 16, 17 or 18

### ⚡️ [LIVE DEMO - try it out for yourself!](https://react-responsive-pagination.elantha.com/live-demo/) ⚡️

<a href="https://react-responsive-pagination.elantha.com/"><img src="./react-responsive-pagination.gif?raw=true" width="985" alt="react-responsive-pagination example" /></a>

## 📕 Visit [https://react-responsive-pagination.elantha.com](https://react-responsive-pagination.elantha.com) to get started 🚀

## ⭐️ v1 user? See the [v1 migration guide](https://react-responsive-pagination.elantha.com/migration) to get started with v2 ⭐️

## 🎨 Supports custom styling and also works out of the box with Bootstrap 4 or 5 🥾

Custom styles? No problem - see the [Custom Styles Guide](https://react-responsive-pagination.elantha.com/custom-styled-pagination/)

Using Bootstrap? See the [Bootstrap Getting Started Guide](https://react-responsive-pagination.elantha.com/bootstrap-pagination/)

## ⏳ Quick Start

```bash
npm install react-responsive-pagination
```

```jsx
import React, { useState } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
// make sure appropriate css is included in the project:
// see css sample below (or import Bootstrap styles)

function MyApp() {
  const [currentPage, setCurrentPage] = useState(4);
  const totalPages = 17;

  return (
    <ResponsivePagination
      current={currentPage}
      total={totalPages}
      onPageChange={setCurrentPage}
    />
  );
}
```

Basic css example, see [Custom Styles Guide](https://react-responsive-pagination.elantha.com/custom-styled-pagination/) for more examples or [use Bootstrap styles](https://react-responsive-pagination.elantha.com/)

```css
.pagination {
  justify-content: center;
  display: flex;
  padding-left: 0;
  list-style: none;
}

.page-item .page-link {
  position: relative;
  display: block;
  margin: 0 10px;
  color: #007bff;
  text-decoration: none;
}

.page-item.active .page-link {
  font-weight: bold;
}

.page-item.disabled .page-link {
  color: #6c757d;
  pointer-events: none;
  cursor: auto;
}
```

## ✔︎ Requirements / Compatibility

- React 18, 17 and 16.8 upwards
- Modern browsers only - not suitable for IE 11

## 🔧 Props

### Common Props

| Prop                                                              | Description                                                                                                                                                                                                                                 |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **current**<br />`number`<br />(required)                         | The current active page. Indexed from 1                                                                                                                                                                                                     |
| **total**<br />`number`<br />(required)                           | The total number of pages                                                                                                                                                                                                                   |
| **onPageChange**<br />`(newPage: number) => void`<br />(required) | A callback handler which is called when the user clicks a new page, note that the active page will not change unless the `current` prop is updated to reflect the new page (as in the example above). The `newPage` value is indexed from 1 |
| **maxWidth**<br />`number`<br />(optional)                        | The maximum width (in pixels) of the pagination component. Specify a value if you want to override the automatic sizing. Note this width may be exceeded in the case where it's not possible to output a small enough component             |

### ClassName Props

See [Overriding default classNames](https://react-responsive-pagination.elantha.com/custom-styled-pagination/#overriding-default-classnames) for more information

| Prop                                                    | Description                                                                                                                                                                                                                                                                                                                                     |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **className**<br />`string`<br />(optional)             | Class name for the top level **<ul\>** container<br />Defaults to `pagination`, overrides **extraClassName** prop (below)                                                                                                                                                                                                                       |
| **extraClassName**<br />`string`<br />(optional)        | Useful when using Bootstrap styles, extra classNames to be added to the top level **<ul\>** container. Use this prop to override the default justify value - for example to align elements to the start of the page use: `justify-content-start`<br />Defaults to `justify-content-center`, not applicable if **className** prop (above) is set |
| **pageItemClassName**<br />`string`<br />(optional)     | Class name for all the **<li\>** elements<br />Defaults to `page-item`                                                                                                                                                                                                                                                                          |
| **pageLinkClassName**<br />`string`<br />(optional)     | Class name for **<a\>** or **<span\>** child elements within an **<li\>** element: <br />`<li ...><a class='page-link'>1</a></li>`<br />Defaults to `page-link`                                                                                                                                                                                 |
| **activeItemClassName**<br />`string`<br />(optional)   | Appended to **<li\>** class name for the active element:<br />`<li class='page-item active'><a class='page-link'>1</a></li>`<br />Defaults to `active`                                                                                                                                                                                          |
| **disabledItemClassName**<br />`string`<br />(optional) | Appended to **<li\>** class name for non-clickable elements (disabled nav buttons and the break/ellipsis):<br />`<li class='page-item disabled'><span class='page-link'>...</span></li>`<br />Defaults to `disabled`                                                                                                                            |

### Label Props

| Prop                                                | Description                                                                  |
| --------------------------------------------------- | ---------------------------------------------------------------------------- |
| **previousLabel**<br />`string`<br />(optional)     | The label for the previous button, defaults to `«`                           |
| **nextLabel**<br />`string`<br />(optional)         | The label for the next button, defaults to `»`                               |
| **ariaPreviousLabel**<br />`string`<br />(optional) | The accessibility ARIA label for the previous button, defaults to `Previous` |
| **ariaNextLabel**<br />`string`<br />(optional)     | The accessibility ARIA label for the next button, defaults to `Next`         |

### Misc Props

| Prop                                                       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **renderNav**<br />`boolean`<br />(optional)               | When set to `false` the nav buttons (**«**/**»**) will not be rendered. Defaults to `true`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **narrowBehaviour**<br />`NarrowBehaviour`<br />(optional) | Specify that nav buttons (**«**/**»**) and/or the ellipsis (**…**) can be dropped for very narrow widths (useful if the component is used in narrow widths with high page numbers)<br />Valid behaviours should be imported from `react-responsive-pagination/narrowBehaviour`, [see example](https://react-responsive-pagination.elantha.com/props/#misc-props)<br /><br />`dropEllipsis` - drop the ellipsis (**…**) for narrow widths<br />`dropNav` - drop the nav (**«**/**»**) for narrow widths<br />`dropNavThenEllipsis` - drop the nav initially and then further drop the ellipsis if required<br />`dropEllipsisThenNav` - drop the ellipsis initially and then further drop the nav if required |

See [Props Reference](https://react-responsive-pagination.elantha.com/props) for the full list

## ℹ About Auto Sizing

More info in the [FAQ](https://react-responsive-pagination.elantha.com/faq/#about-auto-sizing)
