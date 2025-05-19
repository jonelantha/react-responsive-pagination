# React Responsive Pagination

![npm version](https://img.shields.io/npm/v/react-responsive-pagination.svg?style=flat)
![minzipped size](https://img.shields.io/bundlephobia/minzip/react-responsive-pagination)
![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)
[![Test](https://github.com/jonelantha/react-responsive-pagination/actions/workflows/test.yml/badge.svg)](https://github.com/jonelantha/react-responsive-pagination/actions/workflows/test.yml)
[![Release](https://github.com/jonelantha/react-responsive-pagination/actions/workflows/release.yml/badge.svg)](https://github.com/jonelantha/react-responsive-pagination/actions/workflows/release.yml)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

An accessible responsive React pagination component which intelligently renders to the available width - for React 19, 18, 17 & 16

✅ Fully accessible with aria tags for screen readers  
✅ Ready styled themes (or bring your own css)  
✅ Bootstrap 4 & 5 support built-in  
✅ Built for tree-shaking = minimum impact on the bundle

<a href="https://react-responsive-pagination.elantha.com"><picture><source media="(prefers-color-scheme: dark)" srcset="./react-responsive-pagination-dark.gif?raw=true" width="978"><img alt="react-responsive-pagination example" src="./react-responsive-pagination.gif?raw=true" width="978"></picture></a>

**⚡️ [LIVE DEMO - try it out for yourself!](https://react-responsive-pagination.elantha.com/live-demo) ⚡️**

**⭐️ What's new:** Dark Mode & React 19 support

**📕 Visit [https://react-responsive-pagination.elantha.com](https://react-responsive-pagination.elantha.com) to get started 🚀**

## ⏳ Quick Start

```bash
npm install react-responsive-pagination
```

```jsx
import React, { useState } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic-light-dark.css';
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

1. 🖼️ **[Ready-to-go themes](https://react-responsive-pagination.elantha.com/themes)**

   Just import one of the css themes into your project (as shown in the quickstart example above)

   ```
   import 'react-responsive-pagination/themes/classic-light-dark.css';
   ```

   | Theme                                                    | Example                                                                                                                                                                                                                                                                                                                                 |
   | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | classic-light-dark.css                                   | <a href="https://react-responsive-pagination.elantha.com/themes#1-classic-theme"><picture><source media="(prefers-color-scheme: dark)" srcset="./theme-previews/classic-dark.png?raw=true" width="292"><img src="./theme-previews/classic.png?raw=true" width="292" alt="classic pagination" /></picture></a>                           |
   | bootstrap-light-dark.css<br />_(Bootstrap not required)_ | <a href="https://react-responsive-pagination.elantha.com/themes#2-bootstrap-theme-without-bootstrap"><picture><source media="(prefers-color-scheme: dark)" srcset="./theme-previews/bootstrap-dark.png?raw=true" width="250"><img src="./theme-previews/bootstrap.png?raw=true" width="250" alt="bootstrap pagination" /></picture></a> |
   | minimal-light-dark.css                                   | <a href="https://react-responsive-pagination.elantha.com/themes#3-minimal-theme"><picture><source media="(prefers-color-scheme: dark)" srcset="./theme-previews/minimal-dark.png?raw=true" width="169"><img src="./theme-previews/minimal.png?raw=true" width="169" alt="minimal pagination" /></picture></a>                           |

   Themes also available as light only, please see the [Themes guide](https://react-responsive-pagination.elantha.com/themes) for more details (including overridable theme attributes)

2. 🎨 **[Custom CSS styling](https://react-responsive-pagination.elantha.com/custom-styled-pagination)**

   Custom CSS styles? No problem - see the [Custom Styles Guide](https://react-responsive-pagination.elantha.com/custom-styled-pagination)

3. 🥾 **[Bootstrap 4 and 5](https://react-responsive-pagination.elantha.com/bootstrap-pagination)**

   Using Bootstrap in your project? **react-responsive-pagination** just works with Bootstrap (no need for any additional styles). See the [Bootstrap Getting Started Guide](https://react-responsive-pagination.elantha.com/bootstrap-pagination)

## ✔︎ Requirements / Compatibility

- React 19, 18, 17 and 16.8 upwards
- Modern browsers only - not suitable for IE 11

## 🔧 Props

### Common Props

| Prop                                                                                   | Description                                                                                                                                                                                                                                 |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **current**<br />`number`<br />(required)                                              | The current active page. Indexed from 1                                                                                                                                                                                                     |
| **total**<br />`number`<br />(required)                                                | The total number of pages                                                                                                                                                                                                                   |
| **onPageChange**<br />`(newPage: number) => void`<br />(required)                      | A callback handler which is called when the user clicks a new page, note that the active page will not change unless the `current` prop is updated to reflect the new page (as in the example above). The `newPage` value is indexed from 1 |
| _**[... many more props ...](https://react-responsive-pagination.elantha.com/props)**_ | **See [Props Reference](https://react-responsive-pagination.elantha.com/props) for the full list**                                                                                                                                          |
