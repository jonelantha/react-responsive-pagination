---
title: "Bootstrap Pagination Component | react-responsive-pagination"
description: "Use react-responsive-pagination with Bootstrap 4 or 5 styles: an example, options such as hiding the nav buttons, and the props that apply."
index: "https://react-responsive-pagination.elantha.com/index.md"
---

# Bootstrap Usage

**react-responsive-pagination** is ready to go with Bootstrap framework styles - see examples below

Not using Bootstrap framework? No problem, see the [included themes](/themes.md) featuring a standalone Bootstrap theme

Alternatively, see the [Tailwind Guide](/tailwind-pagination.md) or the [Custom Styles Guide](/custom-styled-pagination.md) guide

## Installation

First add the **react-responsive-pagination** package to your project:

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

```jsx
<ResponsivePagination /*...*/ previousLabel="Previous" nextLabel="Next" />
```

**Example - Single arrow labels**

```jsx
<ResponsivePagination /*...*/ previousLabel="‹" nextLabel="›" />
```

### No navigation buttons

Don't include the navigation buttons by setting `renderNav` to **false**:

**Example - No navigation buttons**

```jsx
<ResponsivePagination /*...*/ renderNav={false} />
```

### Alignment / Justify

Change how the pagination is positioned by setting the `extraClassName` prop to one of the [Bootstrap justify content options](https://getbootstrap.com/docs/4.6/utilities/flex/#justify-content). Here are some suitable values:

| Value                    | Alignment          |
| ------------------------ | ------------------ |
| `justify-content-start`  | Left               |
| `justify-content-end`    | Right              |
| `justify-content-center` | Center _(default)_ |

**Example - align pagination left:**

```jsx
<ResponsivePagination /*...*/ extraClassName="justify-content-start" />
```

## Props Reference

A selection of props which may be helpful when using Bootstrap styles - for the full list of props see [Props Reference](/props.md)

### `current`

Type: `number` · required

The current active page. Indexed from 1

### `total`

Type: `number` · required

The total number of pages (for example `Math.ceil(totalItems / pageSize)`). `current` is kept within `1..total` and nothing is rendered when `total` is less than 1

### `onPageChange`

Type: `(newPage: number) => void` · required

A callback handler which is called when the user clicks a new page. The `newPage`
parameter is indexed from 1

Note that the active page will not change unless the `current` prop is updated to reflect the new page (as in the example above)

### `maxWidth`

Type: `number` · optional

The maximum width (in pixels) of the pagination component. Use this prop if you
want to override the automatic sizing. Note the width may be exceeded if it's not
possible to fit the component to the specified width

### `previousLabel`

Type: `string | ReactNode` · optional · default `'«'`

The label for the previous button, defaults to `«`

See the [FAQ](/faq.md#using-react-components-for-labels) for further information on using React components for this prop

### `nextLabel`

Type: `string | ReactNode` · optional · default `'»'`

The label for the next button, defaults to `»`

See the [FAQ](/faq.md#using-react-components-for-labels) for further information on using React components for this prop

### `ariaPreviousLabel`

Type: `string` · optional · default `'Previous'`

The accessibility ARIA label for the previous button, defaults to `Previous`

### `ariaNextLabel`

Type: `string` · optional · default `'Next'`

The accessibility ARIA label for the next button, defaults to `Next`

### `ariaPageLabel`

Type: `(page: number, active: boolean) => string | undefined` · optional

The accessibility ARIA label for page links - expects a function which takes the page number and active boolean and returns the ARIA label (or undefined), example:

```jsx
<ResponsivePagination
  //...
  ariaPageLabel={(page, active) =>
    active ? `Active Page ${page}` : `Goto Page ${page}`
  }
/>
```

### `ariaCurrentAttr`

Type: `boolean` · optional · default `true`

Set to false to prevent output of `aria-current='page'` for the active page **\<li>**

See [MDN's article on aria-current](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current) for further details

### `extraClassName`

Type: `string` · optional · default `'justify-content-center'`

Useful when using Bootstrap styles, extra classNames to be added to the top level **\<ul>** container. Use this prop to override the default justify value - for example to align elements to the start of the page use: `justify-content-start`

Defaults to `justify-content-center`, not applicable if **className** prop is set

### `renderNav`

Type: `boolean | 'none' | 'anchor' | 'anchor-disabled-span' | 'button'` · optional · default `'anchor-disabled-span'`

How the nav items (**«**/**»**) are rendered (or whether nav is omitted):

`anchor` — render **\<a>** for nav items\
`anchor-disabled-span` — **\<a>** when enabled, **\<span>** when disabled\
`button` — render **\<button>** for nav items\
`none` (or `false`) — nav items not rendered

Defaults to `anchor-disabled-span`

### `narrowBehaviour`

Type: `NarrowBehaviour` · optional

Specify that nav buttons (**«**/**»**) and/or the ellipsis (**…**) can be dropped for very narrow widths (useful if the component is used in narrow widths with high page numbers)

Only the behaviours exported from `react-responsive-pagination/narrowBehaviour` (listed below), or those returned by the `combine` helper, are supported. Custom behaviours are not supported and may stop working in a future major release (behaviours are opaque values, their internals are not part of the public API)

Import them from `react-responsive-pagination/narrowBehaviour`, example:

```jsx
import ResponsivePagination from 'react-responsive-pagination';
import { dropEllipsis } from 'react-responsive-pagination/narrowBehaviour';

<ResponsivePagination /*...*/ narrowBehaviour={dropEllipsis} />;
```

Valid NarrowBehaviours:

`dropEllipsis` — drop the ellipsis (**…**) for narrow widths\
`dropNav` — drop the nav (**«**/**»**) for narrow widths\
`dropFirstAndLast` — drop the first and last pages for narrow widths

The default behaviour is to not drop any elements (this may change in a future major release)

**Using Multiple NarrowBehaviours**

Multiple NarrowBehaviours can be combined using the `combine` helper (also imported from `react-responsive-pagination/narrowBehaviour`), example:

```jsx
import ResponsivePagination from 'react-responsive-pagination';
import {
  dropEllipsis,
  dropNav,
  combine,
} from 'react-responsive-pagination/narrowBehaviour';

<ResponsivePagination
  //...
  narrowBehaviour={combine(dropNav, dropEllipsis)}
/>;
```

The behaviours will be applied in order so in this example, `combine(dropNav, dropEllipsis)` will drop the nav (**«**/**»**) initially and then further drop the ellipsis (**…**) if required

See [Props Reference](/props.md) for the full list of props
