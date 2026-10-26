---
title: "Custom Styles Guide | react-responsive-pagination"
description: "Style react-responsive-pagination with your own CSS: a starter template, the generated HTML and class names, and the props that override them."
index: "https://react-responsive-pagination.elantha.com/index.md"
---

# Custom Styles

**react-responsive-pagination** is easy to completely customise, just add custom css to your project using this guide

Don't want to create custom css? See the [included themes](/themes.md) or
alternatively see the [Tailwind Guide](/tailwind-pagination.md) or the [Bootstrap
Guide](/bootstrap-pagination.md)

## Quick Start

```bash
npm install react-responsive-pagination
```

```jsx title='MyApp.js'
import React, { useState } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import './pagination.css'; // see pagination.css example below

export default function MyApp() {
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

See below for a **pagination.css** example

_(for more information on Props, see [Props Reference](/props.md))_

## Custom Styling

To create custom styles for **react-responsive-pagination** simply include some custom css - the example below and the [theme css source files](https://github.com/jonelantha/react-responsive-pagination/tree/main/packages/react-responsive-pagination/themes) should provide a good starting point. For a full list of suggested css selectors to target, see [Selector Reference](#selector-reference)

## Example

```css title="pagination.css"
.pagination {
  justify-content: center;
  display: flex;
  padding-left: 0;
  list-style: none;
  margin: 0;
}

.page-item .page-link {
  position: relative;
  display: block;
  margin: 0 2px;
  min-height: 40px;
  min-width: 40px;
  border-radius: 20px;
  text-align: center;
  line-height: 40px;
  color: #007bff;
  text-decoration: none;
}

.page-item .page-link:hover {
  background-color: #cccccc;
}

.page-item.active .page-link {
  font-weight: 700;
  color: #ffffff;
  background-color: #007bff;
}

.page-item.disabled .page-link {
  color: #6c757d;
  pointer-events: none;
  cursor: auto;
}

@media (prefers-color-scheme: dark) {
  .page-item .page-link {
    color: #ffffff;
  }

  .page-item .page-link:hover {
    background-color: #343a40;
  }

  .page-item.active .page-link {
    background-color: #007bff;
  }

  .page-item.disabled .page-link {
    color: #6c757d;
  }
}
```

_For a full list of suggested css selectors to target, see [Selector Reference](#selector-reference)_

**Further examples**:  
Please see the theme css files at: [https://github.com/jonelantha/react-responsive-pagination/tree/main/packages/react-responsive-pagination/themes](https://github.com/jonelantha/react-responsive-pagination/tree/main/packages/react-responsive-pagination/themes) - these are also a good starting point for custom css files

## Selector Reference

| Selector                         | Notes                                                                                                                                                                   |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.pagination`                    | **Pagination container** _(\<ul> tag)_<br />The recommended style is a horizontal flexbox (see example above)                                                           |
| `.page-item`                     | **Item containers** _(\<li> tags)_<br />Styles may not be needed for this selector, see selector below                                                                  |
| `.page-item .page-link`          | **Item elements** _(\<a> or \<span> tags)_<br />Includes links and static labels. Style as a block element with appropriate font, margin and border (see example above) |
| `.page-item a.page-link`         | **Clickable item elements** _(\<a> tags)_<br />Page links or the next/previous buttons (if they are clickable)                                                          |
| `.page-item.active .page-link`   | **Active page link** _(\<a> tags)_<br />CSS should highlight this element (see example above)                                                                           |
| `.page-item.disabled .page-link` | **Disabled items** _(\<span> tags)_<br />Includes '...' or disabled nav buttons. CSS should show grey out these elements (see example above)                            |

## Overriding default classNames

If needed, you can easily override the default class names by adding the following props:

| className Prop          | Description                                                                                               |
| ----------------------- | --------------------------------------------------------------------------------------------------------- |
| `className`             | Class name for the top level **\<ul>** container                                                          |
| `pageItemClassName`     | Class name for all the **\<li>** elements                                                                 |
| `pageLinkClassName`     | Class name for **\<a>** or **\<span>** child elements within an **\<li>** element                         |
| `activeItemClassName`   | Appended to **\<li>** class name for the active element                                                   |
| `inactiveItemClassName` | Appended to **\<li>** class name for the inactive element (defaults to `""`)                              |
| `disabledItemClassName` | Appended to **\<li>** class name for non-clickable elements (disabled nav buttons and the break/ellipsis) |
| `navClassName`          | Appended to **\<li>** class name for both nav buttons                                                     |
| `previousClassName`     | Appended to **\<li>** class name for previous nav button (overrides `navClassName`)                       |
| `nextClassName`         | Appended to **\<li>** class name for next nav button (overrides `navClassName`)                           |

### Example - overriding default class names

```jsx
<ResponsivePagination
  className="my-pagination"
  pageItemClassName="my-item"
  pageLinkClassName="my-link"
  activeItemClassName="my-active"
  disabledItemClassName="my-disabled"
  navClassName="my-nav"
  // ...other props
/>

// would create html like this

<ul class="my-pagination">
    <li class="my-item my-disabled my-nav">
        <span class="my-link" aria-label="Previous">
            <span aria-hidden="true">«</span>
        </span>
    </li>
    <li class="my-item my-active" aria-current="page">
        <a class="my-link" href="#">1</a>
    </li>
    <li class="my-item">
        <a class="my-link" href="#">2</a>
    </li>
    <!-- ... more elements -->
</ul>

```

## Other Options

### Previous and Next Labels

Change the default labels for the previous and next buttons by setting the `previousLabel` and `nextLabel` props:

**Example - Text labels**

```jsx
<ResponsivePagination /*...*/ previousLabel="Previous" nextLabel="Next" />
```

## Justifying Previous / Next Buttons

Aligning the previous and next buttons to the start and end of the row is possible using `margin: auto` and two custom css vars (see code sample below)

**Example**

```jsx
<ResponsivePagination
  //...
  previousClassName="previous-justified"
  nextClassName="next-justified"
/>
```

```css
.previous-justified {
  margin-inline-end: auto;
  --pagination-override-margin-inline-end: 0; /* <- minimum margin */
}

.next-justified {
  margin-inline-start: auto;
  --pagination-override-margin-inline-start: 0; /* <- minimum margin */
}
```

NOTE: `--pagination-override-margin-inline-start` and `--pagination-override-margin-inline-end` must be applied in css classes specific to the previous and next buttons (using `previousClassName` and `nextClassName` props). Applying via `:first-child` or `:last-child` is currently unsupported and may lead to unexpected results.

## Useful Props For Customisation

A selection of props which may be helpful when using custom styles - for the full list of props see [Props Reference](/props.md)

### `containerClassName`

Type: `string` · optional

Class name for the top level **\<ul>** container

Defaults to `pagination`

When this prop is set, **extraClassName** prop (below) will be ignored

### `className`

Type: `string` · optional

Alias for **containerClassName** see above

### `extraClassName`

Type: `string` · optional

Useful when using Bootstrap styles, extra classNames to be added to the top level **\<ul>** container. Use this prop to override the default justify value - for example to align elements to the start of the page use: `justify-content-start`

Defaults to `justify-content-center`, not applicable if **className** prop is set

### `pageItemClassName`

Type: `string` · optional

Class name for all the **\<li>** elements

Defaults to `page-item`

### `pageLinkClassName`

Type: `string` · optional

Class name for **\<a>** or **\<span>** child elements within an **\<li>** element:

`<li ...><a class='page-link'>1</a></li>`

Defaults to `page-link`

### `activeItemClassName`

Type: `string` · optional

Appended to **\<li>** class name for the active element:

`<li class='page-item active'><a class='page-link'>1</a></li>`

Defaults to `active`

### `inactiveItemClassName`

Type: `string` · optional

Appended to **\<li>** class name for all non active elements (including nav elements):

`<li class='page-item inactive'><a class='page-link'>1</a></li>`

Defaults to ''

### `disabledItemClassName`

Type: `string` · optional

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

Type: `string | ReactNode` · optional

The label for the previous button, defaults to `«`

See the [FAQ](/faq.md#using-react-components-for-labels) for further information on using React components for this prop

### `nextLabel`

Type: `string | ReactNode` · optional

The label for the next button, defaults to `»`

See the [FAQ](/faq.md#using-react-components-for-labels) for further information on using React components for this prop

### `ariaPreviousLabel`

Type: `string` · optional

The accessibility ARIA label for the previous button, defaults to `Previous`

### `ariaNextLabel`

Type: `string` · optional

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

Type: `boolean` · optional

Set to false to prevent output of `aria-current='page'` for the active page **\<li>**

See [MDN's article on aria-current](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current) for further details

### `renderNav`

Type: `boolean | 'none' | 'anchor' | 'anchor-disabled-span' | 'button'` · optional

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
