# React Responsive Pagination

![npm version](https://img.shields.io/npm/v/react-responsive-pagination.svg?style=flat)
![minzipped size](https://img.shields.io/bundlephobia/minzip/react-responsive-pagination)
![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)
[![Test](https://github.com/jonelantha/react-responsive-pagination/actions/workflows/test.yml/badge.svg)](https://github.com/jonelantha/react-responsive-pagination/actions/workflows/test.yml)
[![Release](https://github.com/jonelantha/react-responsive-pagination/actions/workflows/release.yml/badge.svg)](https://github.com/jonelantha/react-responsive-pagination/actions/workflows/release.yml)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

An accessible responsive React pagination component which intelligently renders to the available width - for React 16, 17 or 18

✅ Fully accessible with aria tags for screen readers  
✅ Ready styled themes (or bring your own css)  
✅ Bootstrap 4 & 5 support built-in  
✅ Built for tree-shaking = minimum impact on the bundle

<a href="https://react-responsive-pagination.elantha.com/"><img src="./react-responsive-pagination.gif?raw=true" width="985" alt="react-responsive-pagination example" /></a>

### ⚡️ [LIVE DEMO - try it out for yourself!](https://react-responsive-pagination.elantha.com/live-demo/) ⚡️

**📕 Visit [https://react-responsive-pagination.elantha.com](https://react-responsive-pagination.elantha.com) to get started 🚀**

v1 user? See the [v1 migration guide](https://react-responsive-pagination.elantha.com/migration) to start using v2

## ⏳ Quick Start

```bash
npm install react-responsive-pagination
```

```jsx
import React, { useState } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
// 👆 classic theme, see below for other theme / css options

function MyApp() {
  const [currentPage, setCurrentPage] = useState(8);
  const totalPages = 20;

  return (
    <ResponsivePagination
      current={currentPage}
      total={totalPages}
      onPageChange={setCurrentPage}
    />
  );
}
```

## Three ways to style:

1. 🎨 **Custom styling**

   Custom styles? No problem - see the [Custom Styles Guide](https://react-responsive-pagination.elantha.com/custom-styled-pagination/)

2. 🖼️ **Ready-to-go themes (NEW!)**

   Just import one of the css themes into your project (as shown in the quickstart example above)

   ```
   import 'react-responsive-pagination/themes/classic.css';
   ```

   | Theme         | Example                                                                                                                                                                                                                                                                             |
   | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | classic.css   | <img src="./theme-previews/classic.png?raw=true" width="292" alt="classic pagination" />                                                                                                                                                                                            |
   | bootstrap.css | <img src="./theme-previews/bootstrap.png?raw=true" width="250" alt="classic pagination" /><br />Bootstrap 5 styled pagination (without installing Bootstrap)<br />See [additional bootstrap options](https://react-responsive-pagination.elantha.com/bootstrap-pagination/#options) |
   | minimal.css   | <img src="./theme-previews/minimal.png?raw=true" width="169" alt="classic pagination" />                                                                                                                                                                                            |

   Please see the [Themes guide](https://react-responsive-pagination.elantha.com/themes/) for more details (including overridable theme attributes)

   Want to create your own? See the [Custom Styles Guide](https://react-responsive-pagination.elantha.com/custom-styled-pagination/)

3. 🥾 **Bootstrap 4 and 5**

   Using Bootstrap in your project? **react-responsive-pagination** just works with Bootstrap (no need for any additional styles). See the [Bootstrap Getting Started Guide](https://react-responsive-pagination.elantha.com/bootstrap-pagination/)

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
| **navClassName**<br />`string`<br />(optional)          | Appended to **\<li>** class name for nav items (`«` / `»` buttons):<br />`<li class='page-item my-nav'><span class='page-link'>«</span></li>`<br />By defaults is not output                                                                                                                                                                    |
| **previousClassName**<br />`string`<br />(optional)     | Appended to **\<li>** class name for the nav previous button (`«`):<br />`<li class='page-item my-previous-button'><span class='page-link'>«</span></li>`<br />By defaults is not output                                                                                                                                                        |
| **nextClassName**<br />`string`<br />(optional)         | Appended to **\<li>** class name for the nav next button (`»`):<br />`<li class='page-item my-next-button'><span class='page-link'>»</span></li>`<br />By defaults is not output                                                                                                                                                                |

### Label Props

| Prop                                                         | Description                                                                                                                                                                                                                         |
| ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **previousLabel**<br />`string \| ReactNode`<br />(optional) | The label for the previous button, defaults to `«`<br /><br />See the [FAQ](https://react-responsive-pagination.elantha.com/faq/#using-react-components-for-labels) for further information on using React components for this prop |
| **nextLabel**<br />`string \| ReactNode`<br />(optional)     | The label for the next button, defaults to `»` <br /><br />See the [FAQ](https://react-responsive-pagination.elantha.com/faq/#using-react-components-for-labels) for further information on using React components for this prop    |
| **ariaPreviousLabel**<br />`string`<br />(optional)          | The accessibility ARIA label for the previous button, defaults to `Previous`                                                                                                                                                        |
| **ariaNextLabel**<br />`string`<br />(optional)              | The accessibility ARIA label for the next button, defaults to `Next`                                                                                                                                                                |

### Misc Props

| Prop                                                       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **renderNav**<br />`boolean`<br />(optional)               | When set to `false` the nav buttons (**«**/**»**) will not be rendered. Defaults to `true`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| **narrowBehaviour**<br />`NarrowBehaviour`<br />(optional) | Specify that nav buttons (**«**/**»**) and/or the ellipsis (**…**) can be dropped for very narrow widths (useful if the component is used in narrow widths with high page numbers)<br />Valid behaviours should be imported from `react-responsive-pagination/narrowBehaviour`, [see example](https://react-responsive-pagination.elantha.com/props/#misc-props)<br /><br />`dropEllipsis` - drop the ellipsis (**…**) for narrow widths<br />`dropNav` - drop the nav (**«**/**»**) for narrow widths<br />`dropFirstAndLast` - drop the first and last pages for narrow widths<br /><br />Use the `combine` helper to combine narrowBehaviours, example:<br />`narrowBehaviour={combine(dropNav, dropEllipsis)}` - drop the nav initially and then further drop the ellipsis if required<br />`combine` should also be imported from `react-responsive-pagination/narrowBehaviour` [see examples](https://react-responsive-pagination.elantha.com/props/#misc-props) |

See [Props Reference](https://react-responsive-pagination.elantha.com/props) for the full list

## ℹ About Auto Sizing

More info in the [FAQ](https://react-responsive-pagination.elantha.com/faq/#about-auto-sizing)
