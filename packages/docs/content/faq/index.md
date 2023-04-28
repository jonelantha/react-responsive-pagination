---
title: 'Frequently asked questions'
description: 'react-responsive-pagination frequently asked questions'
navTitle: 'FAQ'
topNavOrder: 5
sideNavOrder: 7
footerNavOrder: 8
---

# FAQ

## About Auto Sizing

Auto sizing uses the width of the immediate parent element. For best results make sure the parent element isn't intrinsically sized; that means the width of the parent element shouldn't depend on its contents. If your layout is intrinsic then the pagination component should still fill the space correctly but you may occasionally see inconsistant results or additional renders.

You can choose to override the auto sizing by specifying the `maxWidth` prop (see [Props](/props) section).

## Very Narrow Widths

For very narrow widths the component may exceed the available space - this is to ensure that there's always a usable pagination component.

The `narrowBehaviour` prop can be used to specify that either the nav buttons (**«**/**»**) and/or the ellipsis (**…**) can be dropped for narrow widths - see the [narrowBehaviour prop](/props#misc-props) for more details.

## Server Side Rendering

`Warning: useLayoutEffect does nothing on the server ...`

First class support for SSR is planned in a future release. Until then, Option 2 at [https://reactjs.org/link/uselayouteffect-ssr](https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85#option-2-lazily-show-component-with-uselayouteffect) can be used:

```jsx
import ResponsivePagination, {
  ResponsivePaginationProps,
} from 'react-responsive-pagination';

function ResponsivePaginationSSR(props: ResponsivePaginationProps) {
  const [showPagination, setShowPagination] = useState(false);

  useEffect(() => {
    setShowPagination(true);
  }, []);

  if (!showPagination) {
    return null;
  }

  return <ResponsivePagination {...props} />;
}

...

function MyApp() {
    ...
    return <ResponsivePaginationSSR current={current} ... />;
}

```

_(a similar workaround is used on this documentation site)_

## ESM only

Like many modern npm packages, react-responsive-pagination only has ESM exports - it's compatible with up-to-date versions of all popular bundlers and frameworks.

When using with [Remix](https://remix.run) the following will need to be added to **remix.config.js**:

```js
serverDependenciesToBundle: [
    "react-responsive-pagination",
    "react-responsive-pagination/labelBehaviour",   // if required
    "react-responsive-pagination/narrowBehaviour",  // if required
    "react-responsive-pagination/presets",          // if required
],
```

See [Remix Gotchas](https://remix.run/docs/en/main/pages/gotchas#md-importing-esm-packages) for further details.
