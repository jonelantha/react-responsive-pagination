---
title: "Tailwind Pagination Component | react-responsive-pagination"
description: "Style react-responsive-pagination with Tailwind CSS: quick start, light and dark examples, class name props and tailwind-merge support."
index: "https://react-responsive-pagination.elantha.com/index.md"
---

# Tailwind Usage & Examples

**react-responsive-pagination** fully supports Tailwind styling - see [Quick Start](#quick-start) and [Examples](#examples) below

Not using Tailwind? See the [Bootstrap Guide](/bootstrap-pagination.md), the [Custom CSS Guide](/custom-styled-pagination.md) or the [Included themes](/themes.md)

## Installation

```bash
npm install react-responsive-pagination
```

## Quick Start

**Light mode only** - for light & dark mode, see more [examples](#examples) below

```jsx
import React, { useState } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
// project with tailwind configured

function MyTailwindApp() {
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
      containerClassName="flex justify-center gap-1"
      pageItemClassName="inline-flex items-center rounded-md border text-sm"
      activeItemClassName="border-blue-700 bg-blue-700 text-white shadow-sm"
      inactiveItemClassName="border-slate-300 text-slate-600 shadow-sm hover:bg-blue-700 hover:text-white hover:shadow-lg"
      disabledItemClassName="pointer-events-none border-slate-300 text-slate-600 opacity-50"
      pageLinkClassName="px-3 py-2"
    />
  );
}
```

**Dark mode only** - for light & dark mode, see more [examples](#examples) below

```jsx
import React, { useState } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
// project with tailwind configured

function MyTailwindApp() {
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
      containerClassName="flex justify-center gap-1"
      pageItemClassName="inline-flex items-center rounded-md border text-sm"
      activeItemClassName="border-blue-800 bg-blue-800 text-white shadow-sm"
      inactiveItemClassName="border-slate-600 text-slate-400 shadow-sm hover:bg-blue-800 hover:text-white hover:shadow-lg"
      disabledItemClassName="pointer-events-none border-slate-600 text-slate-400 opacity-50"
      pageLinkClassName="px-3 py-2"
    />
  );
}
```

## Examples

**NOTE:** All examples are for Tailwind CSS v3+

### Material Tailwind Rounded (light + dark)

Inspired by https://www.material-tailwind.com/docs/html/pagination#rounded-pagination

```jsx
containerClassName="flex justify-center space-x-1"
pageItemClassName="inline-flex items-center rounded-md border text-sm transition-colors"
activeItemClassName="border-slate-800 bg-slate-800 text-white shadow-sm hover:bg-slate-700 hover:shadow-lg focus:bg-slate-700 focus:shadow-none dark:border-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 dark:focus:bg-slate-600"
inactiveItemClassName="border-slate-300 text-slate-600 shadow-sm hover:border-transparent hover:bg-slate-800 hover:text-white hover:shadow-lg dark:border-slate-600 dark:text-slate-400 dark:hover:bg-slate-700"
disabledItemClassName="pointer-events-none border-slate-300 text-slate-600 opacity-50 shadow-none dark:border-slate-600 dark:text-slate-400"
pageLinkClassName="px-3 py-2 focus:z-20"
```

### Material Tailwind Circular (light + dark)

Inspired by https://www.material-tailwind.com/docs/html/pagination#circular-pagination

```jsx
containerClassName="flex justify-center space-x-1"
pageItemClassName="inline-flex items-center rounded-full border text-sm transition-colors"
activeItemClassName="border-slate-800 bg-slate-800 text-white shadow-sm hover:bg-slate-700 hover:shadow-lg focus:bg-slate-700 focus:shadow-none dark:border-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 dark:focus:bg-slate-600"
inactiveItemClassName="border-slate-300 text-slate-600 shadow-sm hover:border-transparent hover:bg-slate-800 hover:text-white hover:shadow-lg dark:border-slate-600 dark:text-slate-400 dark:hover:bg-slate-700"
disabledItemClassName="pointer-events-none border-slate-300 text-slate-600 opacity-50 shadow-none dark:border-slate-600 dark:text-slate-400"
pageLinkClassName="px-3.5 py-2 focus:z-20"
```

### Material Tailwind Group (light + dark)

Inspired by https://www.material-tailwind.com/docs/html/pagination#pagination-group

```jsx
containerClassName="flex justify-center"
pageItemClassName="inline-flex items-center border text-sm shadow-sm transition-colors not-last:border-r-0 first:rounded-l-md last:rounded-r-md"
activeItemClassName="border-slate-800 bg-slate-800 text-white hover:bg-slate-700 hover:shadow-lg focus:bg-slate-700 focus:shadow-none dark:border-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 dark:focus:bg-slate-600"
inactiveItemClassName="border-slate-300 text-slate-600 hover:border-transparent hover:bg-slate-800 hover:text-white hover:shadow-lg dark:border-slate-600 dark:text-slate-400 dark:hover:bg-slate-700"
disabledItemClassName="pointer-events-none border-slate-300 text-slate-600 opacity-50 shadow-none dark:border-slate-600 dark:text-slate-400"
pageLinkClassName="px-3 py-2 focus:z-20"
```

### Preline (light + dark)

Inspired by https://preline.co/docs/pagination.html#example

```jsx
containerClassName="flex justify-center gap-x-1"
pageItemClassName="inline-flex items-center rounded-lg border border-transparent text-sm text-gray-800 focus:bg-gray-100 focus:outline-hidden dark:text-white dark:focus:bg-white/10"
activeItemClassName="bg-gray-200 hover:bg-gray-100 dark:bg-neutral-600 dark:hover:bg-white/10"
inactiveItemClassName="hover:bg-gray-100 dark:hover:bg-white/10"
disabledItemClassName="pointer-events-none opacity-50"
pageLinkClassName="px-3 py-2 focus:z-20"
```

### Tailwind Plus (light + dark)

Inspired by https://tailwindcss.com/plus/ui-blocks/application-ui/navigation/pagination

```jsx
containerClassName="flex justify-center -space-x-px"
pageItemClassName="inline-flex items-center shadow-xs first:rounded-l-md last:rounded-r-md"
activeItemClassName="active z-10 bg-indigo-600 text-white"
inactiveItemClassName="text-sm font-semibold text-gray-900 inset-ring inset-ring-gray-300 hover:bg-gray-50 dark:text-gray-200 dark:inset-ring-gray-700 dark:hover:bg-white/5"
disabledItemClassName="pointer-events-none text-sm font-semibold text-gray-700 inset-ring inset-ring-gray-300 dark:text-gray-400 dark:inset-ring-gray-700"
pageLinkClassName="px-4 py-2 focus:z-20 focus:outline-offset-0 [.active_&]:focus-visible:outline-2 [.active_&]:focus-visible:outline-offset-2 [.active_&]:focus-visible:outline-indigo-600"
```

## How Tailwind Styling Works

There are six className props for styling with Tailwind classes:

```jsx
<ResponsivePagination
  containerClassName="" // class for top-level <ul> container
  pageItemClassName="" // base class for all <li> items, combined with one (and only one) of the three classes below
  activeItemClassName="" // appended to <li> for active/selected page
  inactiveItemClassName="" // appended to <li> for non-active but clickable pages (including nav elements)
  disabledItemClassName="" // appended to <li> for disabled nav elements and ellipsis
  pageLinkClassName="" // class for the <a> or <span> inside each <li>
  // ... other props
/>
```

These six props are applied like this (more details in the table below):

```html
<!-- container -->
<ul class="{containerClassName}">
  <!-- active / selected item -->
  <li class="{pageItemClassName} {activeItemClassName}">
    <a class="{pageLinkClassName}" href="#">1</a>
  </li>
  <!-- non-active clickable items -->
  <li class="{pageItemClassName} {inactiveItemClassName}">
    <a class="{pageLinkClassName}" href="#">2</a>
  </li>
  <!-- disabled items (ellipsis ... or nav) -->
  <li class="{pageItemClassName} {disabledItemClassName}">
    <span class="{pageLinkClassName}">...</span>
  </li>
  <!-- ... more pagination elements -->
</ul>
```

| ClassName Prop          | Notes                                                                                                                                                                                                                                                  |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `containerClassName`    | Classes for the top-level **\<ul>** container (use for layout/positioning)<br />Typically a flex parent with gap or margin between items                                                                                                               |
| `pageItemClassName`     | Sets the base classes for all child **\<li>** elements<br />Might include border, rounding, text size and transition styles<br />**NOTE:** these styles will always be combined with one (and only one) of the following three `*ItemClassName` styles |
| `activeItemClassName`   | Appended to `pageItemClassName` for active/selected page<br />Might include background color, text color and shadow styles                                                                                                                             |
| `inactiveItemClassName` | Appended to `pageItemClassName` for all non-active but clickable pages (including nav elements)<br /> Might include text color and hover styles for background                                                                                         |
| `disabledItemClassName` | Appended to `pageItemClassName` for disabled nav elements and ellipsis (&hellip;)<br /> Might include opacity and pointer-events-none styles                                                                                                           |
| `pageLinkClassName`     | Classes for **\<a>** or **\<span>** elements inside each **\<li>**<br /> Might include padding and focus styles                                                                                                                                        |

**Further Info:**

- See [Advanced Tailwind Usage](#advanced-tailwind-usage) below for tips on reusing styles and integrating with **tailwind-merge** or **CVA**
- See [Props Reference](#props-reference) for more props

## General Options

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

## Advanced Tailwind Usage

### Tip: Reusing style props

To reuse styles, an alternative to creating a wrapper component is to extract the className props onto an object and spread them where needed:

```jsx
// define styles once
export const paginationStyles = {
  containerClassName: 'flex justify-center gap-1',
  pageItemClassName: 'inline-flex items-center rounded-md border text-sm',
  activeItemClassName: 'border-slate-800 bg-slate-800 text-white shadow-sm ...',
  inactiveItemClassName: 'border-slate-300 text-slate-600 hover:bg-slate-800 ...',
  disabledItemClassName: 'pointer-events-none border-slate-300 text-slate-600 ...',
  pageLinkClassName: 'px-3 py-2',
};

// import and spread where needed
import { paginationStyles } from './paginationStyles';

<ResponsivePagination /*...*/ {...paginationStyles} />;
```

### tailwind-merge / twMerge

It should be possible to arrange Tailwind classes so they don't conflict but if [tailwind-merge](https://www.npmjs.com/package/tailwind-merge) is required then just add `twMerge` to the **classMerge** prop:

```jsx
import { twMerge } from 'tailwind-merge';

<ResponsivePagination /*...*/ classMerge={twMerge} />;
```

### CVA (Class Variance Authority)

[CVA (class-variance-authority)](https://cva.style/) can also be used to create item states, see example below

Note that in this case `pageItemClassName` should be `""`

```jsx
const pageItem = cva('inline-flex items-center rounded-lg text-sm text-gray-800', {
  variants: {
    type: {
      active: 'bg-gray-200 hover:bg-gray-100',
      inactive: 'hover:bg-gray-100',
      disabled: 'pointer-events-none opacity-50',
    },
  },
});

<ResponsivePagination
  containerClassName="flex justify-center gap-x-1"
  pageItemClassName=""
  activeItemClassName={pageItem({ type: 'active' })}
  inactiveItemClassName={pageItem({ type: 'inactive' })}
  disabledItemClassName={pageItem({ type: 'disabled' })}
  pageLinkClassName="px-3 py-2 focus:z-20"
  // ... other props
/>;
```

### Conditional classes for pageLinkClassName

**NOTE** This is usually not required, most styling can be achieved with the standard className props

For advanced cases where child element (**\<a>** or **\<span>**) styles need to depend on parent state, you can use Tailwind's [arbitrary variant syntax](https://tailwindcss.com/docs/hover-focus-and-other-states#using-arbitrary-variants)

**How it works:**

1. Add a marker class to `activeItemClassName` (for example `"active"`)
2. Use `[.active_&]:` prefix in `pageLinkClassName` to apply styles only when the parent **\<li>** has the `active` class

**Example - Different focus rings for active vs inactive pages:**

The [Tailwind Plus example](#tailwind-plus-light--dark) above demonstrates this pattern with a differnet focus outline for active vs inactive pages:

```jsx
<ResponsivePagination
  activeItemClassName="active z-10 bg-indigo-600 text-white"
  pageLinkClassName="px-4 py-2 focus:z-20 focus:outline-offset-0 [.active_&]:focus-visible:outline-2 [.active_&]:focus-visible:outline-offset-2 [.active_&]:focus-visible:outline-indigo-600"
  // ... other props
/>
```

**NOTE:** This requires Tailwind CSS v3+

## Props Reference

A selection of props which may be helpful when using Tailwind styles - for the full list of props see [Props Reference](/props.md)

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

### `containerClassName`

Type: `string` · optional · default `'pagination justify-content-center'`

Class name for the top level **\<ul>** container

Defaults to `pagination justify-content-center` (`pagination` followed by **extraClassName**)

When this prop is set, **extraClassName** prop (below) will be ignored

### `className`

Type: `string` · optional · default `'pagination justify-content-center'`

Alias for **containerClassName** see above

### `extraClassName`

Type: `string` · optional · default `'justify-content-center'`

Useful when using Bootstrap styles, extra classNames to be added to the top level **\<ul>** container. Use this prop to override the default justify value - for example to align elements to the start of the page use: `justify-content-start`

Defaults to `justify-content-center`, not applicable if **className** prop is set

### `pageItemClassName`

Type: `string` · optional · default `'page-item'`

Class name for all the **\<li>** elements

Defaults to `page-item`

### `pageLinkClassName`

Type: `string` · optional · default `'page-link'`

Class name for **\<a>** or **\<span>** child elements within an **\<li>** element:

`<li ...><a class='page-link'>1</a></li>`

Defaults to `page-link`

### `activeItemClassName`

Type: `string` · optional · default `'active'`

Appended to **\<li>** class name for the active element:

`<li class='page-item active'><a class='page-link'>1</a></li>`

Defaults to `active`

### `inactiveItemClassName`

Type: `string` · optional · default `''`

Appended to **\<li>** class name for all non active elements (including nav elements):

`<li class='page-item inactive'><a class='page-link'>1</a></li>`

Defaults to ''

### `disabledItemClassName`

Type: `string` · optional · default `'disabled'`

Appended to **\<li>** class name for non-clickable elements (disabled nav buttons and the break/ellipsis):

`<li class='page-item disabled'><span class='page-link'>...</span></li>`

Defaults to `disabled`

### `navClassName`

Type: `string` · optional

Appended to **\<li>** class name for nav items (`«` / `»` buttons)

Setting to 'my-nav' would give html similar to:

`<li class='page-item my-nav'><span class='page-link'>«</span></li>`

By default will not be output

### `previousClassName`

Type: `string` · optional

Appended to **\<li>** class name for the previous button (`«`)

Setting to 'my-previous-button' would give html similar to:

`<li class='page-item my-previous-button'><span class='page-link'>«</span></li>`

Overrides `navClassName` and by default will not be output

### `nextClassName`

Type: `string` · optional

Appended to **\<li>** class name for the next button (`»`)

Setting to 'my-next-button' would give html similar to:

`<li class='page-item my-next-button'><span class='page-link'>»</span></li>`

Overrides `navClassName` and by default will not be output

### `classMerge`

Type: `(classNames: string[]) => string` · optional

Function to use when merging multiple class names

Tailwind users can set this to `twMerge` from the `tailwind-merge` package to remove duplicate Tailwind classes

```jsx
import { twMerge } from 'tailwind-merge';

<ResponsivePagination
  classMerge={twMerge}
  // ...other props
/>;
```

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
