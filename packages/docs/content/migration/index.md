---
title: 'Migration from v1'
description: 'Migration from react-responsive-pagination v1'
navTitle: 'Migration from v1'
sideNavOrder: 7
addOverview: true
---

# Migration from v1

**TL;DR:** most v1 users won't need to do anything. Any `.sr-only` stylesheet rules can be removed and also the `bootstrap5PaginationPreset` can be removed (see first two points below)

## Removing '.sr-only' css styles

**`.sr-only` is no longer required and can be removed from stylesheets**

v1 used the `.sr-only` css class for screen reader visually hidden content. v2 uses aria attributes and no longer outputs visually hidden span tags - therefore the `.sr-only` css styles are now redundant and can be removed from stylesheets.

If the old visually hidden span behaviour is preferred this can be re-enabled using `srOnlySpanLabel` for the new `labelBehaviour` prop:

```js
import ResponsivePagination from 'react-responsive-pagination';
import { srOnlySpanLabel } from 'react-responsive-pagination/labelBehaviour';

...

<ResponsivePagination ... labelBehaviour={srOnlySpanLabel()} />
```

## Removing Bootstrap 5 preset

**`bootstrap5PaginationPreset` no longer required**

The current version outputs html compatible with both Bootstrap 4 and 5, so the `bootstrap5PaginationPreset` has no affect (and can be removed).

Bootstrap 5 (and 4) in v2:

```js
import ResponsivePagination from 'react-responsive-pagination';

...

<ResponsivePagination ... />

// previously:
//
// import ResponsivePagination, { bootstrap5PaginationPreset } from 'react-responsive-pagination';
// ...
// <ResponsivePagination {...bootstrap5PaginationPreset} ... />
```

## 'srOnlyClassName' & 'a11yActiveLabel' migration

**`srOnlyClassName`, `a11yActiveLabel` moved to the `srOnlySpanLabel` labelBehaviour**

`srOnlyClassName`, `a11yActiveLabel` were used to configure the screen reader visually hidden spans in v1. The current version no longer uses visually hidden spans so these two props no longer have any affect. If the old v1 behaviour is re-enabled using the `srOnlySpanLabel` label behaviour (as outlined in the first section above) then these props can be used to configure the `srOnlySpanLabel` label behaviour:

```js
import ResponsivePagination from 'react-responsive-pagination';
import { srOnlySpanLabel } from 'react-responsive-pagination/labelBehaviour';

...

<ResponsivePagination ...
  labelBehaviour={srOnlySpanLabel({
    srOnlyClassName: 'my-sr-only',    // include either or both
    a11yActiveLabel: 'active-label',
  })}
/>
```

## 'narrowStrategy' migration

**`narrowStrategy` prop replaced with `narrowBehavior` prop**

The v1 `narrowStrategy` has been replaced with a new `narrowBehavior` prop which uses predefined narrowBehaviours exported from the react-responsive-pagination package. This change is to improve tree-shaking opportunities (which should lead to reduced bundle size).

Example for replacing v1 `narrowStrategy='dropEllipsis'`:

```js
import ResponsivePagination from 'react-responsive-pagination';
import { dropEllipsis } from 'react-responsive-pagination/narrowBehaviour';

...

<ResponsivePagination
  ...
  narrowBehaviour={dropEllipsis}
/>
```

Below shows the v1 narrowStrategy values and their v2 narrowBehaviour replacements

| v1 narrowStrategy             | replacement narrowBehaviour |
| ----------------------------- | --------------------------- |
| `'dropEllipsis'`              | `dropEllipsis`              |
| `'dropNav'`                   | `dropNav`                   |
| `['dropEllipsis', 'dropNav']` | `dropEllipsisThenNav`       |
| `['dropNav', 'dropEllipsis']` | `dropNavThenEllipsis`       |

_(NOTE - narrowBehaviour values above are not strings, they are imported from **'react-responsive-pagination/narrowBehaviour'**, see code example above)_

## ResizeObserver no longer polyfilled

**If support for older browsers is still required, a ResizeObserver polyfill may need to be added to the project**

In 2019 (when v1 was initially released), browser support for ResizeObserver was poor, so v1 included the [resize-observer-polyfill](https://www.npmjs.com/package/resize-observer-polyfill). Today browser support for ResizeObserver is much better so it's no longer necessary to include this polyfill with v2 (reducing bundle size for the majority of users where it's not needed)

If support for older browsers is still required then [resize-observer-polyfill](https://www.npmjs.com/package/resize-observer-polyfill) should be installed in the project, see the [resize-observer-polyfill readme](https://www.npmjs.com/package/resize-observer-polyfill) for details.
