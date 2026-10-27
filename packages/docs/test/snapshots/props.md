---
title: "Props Reference | react-responsive-pagination"
description: "Every react-responsive-pagination prop: current, total and onPageChange, class names, labels, ARIA labels, nav options, narrow behaviours and linkHref."
index: "https://react-responsive-pagination.elantha.com/index.md"
---

# Props Reference

## Common Props

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

## ClassName Props

See [Overriding default classNames](/custom-styled-pagination.md#overriding-default-classnames) for more information

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

## Label Props

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

## Misc Props

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

### `linkHref`

Type: `'hash' | 'omit' | (page: number) => string` · optional · default `'hash'`

Set `linkHref` to `omit` to omit `href='#'` from the page item **\<a>** tags

Set `linkHref` to a callback to set each item's href to a url. The callback takes the item's page as a parameter, this allows the generated url to include the page number, example:

```jsx
<ResponsivePagination
  //...
  linkHref={page => `/results/${page}`}
/>
```

The default behaviour is to include `href='#'` in **\<a>** tags

### `labelBehaviour`

Type: `LabelBehaviour` · optional

_for v1 compatibility_

V1 of react-reponsive-pagination used visually hidden span tags for screen reader labels (the current version uses only aria attributes). This prop can be used to re-enable the V1 behaviour (if preferred):

```jsx
import ResponsivePagination from 'react-responsive-pagination';
import { srOnlySpanLabel } from 'react-responsive-pagination/labelBehaviour';
//...
<ResponsivePagination
  //...
  labelBehaviour={srOnlySpanLabel()}
/>;
```

Only `srOnlySpanLabel` (imported from `react-responsive-pagination/labelBehaviour`) is supported. Custom label behaviours are not supported and may stop working in a future major release (label behaviours are opaque values, their internals are not part of the public API)

By default 'sr-only' is used as the class for the visually hidden spans. To override this, pass `srOnlyClassName`:

```jsx
<ResponsivePagination
  //...
  labelBehaviour={srOnlySpanLabel({ srOnlyClassName: 'my-sr-only' })}
/>
```

The accessibility label for the active page defaults to `(current)`, to override this pass `a11yActiveLabel`:

```jsx
<ResponsivePagination
  //...
  labelBehaviour={srOnlySpanLabel({ a11yActiveLabel: '(active)' })}
/>
```

_(the active label can be turned off by passing a value of '')_

For reference, here's an example of a visually hidden css style:

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

[CSS-TRICKS - Inclusively Hidden](https://css-tricks.com/inclusively-hidden/)
