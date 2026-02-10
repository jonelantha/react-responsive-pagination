# React Responsive Pagination

![npm version](https://img.shields.io/npm/v/react-responsive-pagination.svg?style=flat)
![minzipped size](https://img.shields.io/bundlephobia/minzip/react-responsive-pagination)
![GitHub stars](https://img.shields.io/github/stars/jonelantha/react-responsive-pagination?style=flat)
![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

**An accessible responsive React pagination component which intelligently renders to the available width**

Perfect for responsive dashboards, tables and any layout that resizes

✅ Automatically adapts to container width (no CSS breakpoints needed)  
✅ Fully accessible with aria tags for screen readers  
✅ React 16+ and SSR-friendly (Next.js, Remix and similar)  
✅ Many styling options: 3 built-in themes, Tailwind, Custom CSS & Bootstrap - see [styling options](#-styling-options) below

<a href="https://react-responsive-pagination.elantha.com"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/jonelantha/react-responsive-pagination/refs/heads/main/react-responsive-pagination-dark.gif" width="978"><img alt="react-responsive-pagination example" src="https://raw.githubusercontent.com/jonelantha/react-responsive-pagination/refs/heads/main/react-responsive-pagination.gif" width="978"></picture></a>

**⚡️ [LIVE DEMO - try it out for yourself!](https://react-responsive-pagination.elantha.com/live-demo) ⚡️**

**📕 [Visit the docs](https://react-responsive-pagination.elantha.com) to explore themes, styling options & props 🚀**

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

- `current` (number): active page number
- `total` (number): total number of pages
- `onPageChange` (page: number) => void: function called with the new page number
- ... many more props - see [full props list](https://react-responsive-pagination.elantha.com/props)

See [styling options](#-styling-options) below for guides on styling

## 🎨 Styling options

|                                                                                                                                                                                                                                                                                                                                                                                          |                                                                                                                                                                                                                             |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/jonelantha/react-responsive-pagination/refs/heads/tailwind/readme-assets/themes-dark.png" width="100"><img alt="Themes Example" src="https://raw.githubusercontent.com/jonelantha/react-responsive-pagination/refs/heads/tailwind/readme-assets/themes-light.png" width="100"></picture> | **Built-in themes**<br />3 themes available, fine tune with css vars, light & dark modes<br />[Included Themes >](#-included-themes) &nbsp; &nbsp; [Themes Guide >](https://react-responsive-pagination.elantha.com/themes) |
| <img alt="Tailwind logo" src="https://raw.githubusercontent.com/jonelantha/react-responsive-pagination/refs/heads/tailwind/readme-assets/tailwind.svg" width="100" height="100" />                                                                                                                                                                                                       | **Tailwind**<br />Optimised for Tailwind including plenty of examples and documentation<br />[Tailwind Guide >](https://react-responsive-pagination.elantha.com/tailwind-pagination)                                        |
| <img alt="CSS logo" src="https://raw.githubusercontent.com/jonelantha/react-responsive-pagination/refs/heads/tailwind/readme-assets/css.svg" width="100" height="100" />                                                                                                                                                                                                                 | **Custom CSS**<br />Easily use your own CSS with starter templates and full documentation<br />[Custom CSS Guide >](https://react-responsive-pagination.elantha.com/custom-styled-pagination)                               |
| <img alt="Bootstrap logo" src="https://raw.githubusercontent.com/jonelantha/react-responsive-pagination/refs/heads/tailwind/readme-assets/bootstrap.svg" width="100" height="100" />                                                                                                                                                                                                     | **Bootstrap**<br />Seamless Bootstrap 4 & 5 support including many options<br />[Bootstrap Guide >](https://react-responsive-pagination.elantha.com/bootstrap-pagination)                                                   |

## 🔋 Included Themes

As well as the styling options mentioned above, these ready-to-go themes are available in the package - just import one of the css themes into your project as shown in the [quickstart](#-quick-start) example above

```
import 'react-responsive-pagination/themes/classic-light-dark.css';
```

| Theme                                                    | Example                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| classic-light-dark.css                                   | <a href="https://react-responsive-pagination.elantha.com/themes#1-classic-theme"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/jonelantha/react-responsive-pagination/refs/heads/main/theme-previews/classic-dark.png" width="292"><img src="https://raw.githubusercontent.com/jonelantha/react-responsive-pagination/refs/heads/main/theme-previews/classic.png" width="292" alt="classic pagination" /></picture></a>                           |
| bootstrap-light-dark.css<br />_(Bootstrap not required)_ | <a href="https://react-responsive-pagination.elantha.com/themes#2-bootstrap-theme-without-bootstrap"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/jonelantha/react-responsive-pagination/refs/heads/main/theme-previews/bootstrap-dark.png" width="250"><img src="https://raw.githubusercontent.com/jonelantha/react-responsive-pagination/refs/heads/main/theme-previews/bootstrap.png" width="250" alt="bootstrap pagination" /></picture></a> |
| minimal-light-dark.css                                   | <a href="https://react-responsive-pagination.elantha.com/themes#3-minimal-theme"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/jonelantha/react-responsive-pagination/refs/heads/main/theme-previews/minimal-dark.png" width="169"><img src="https://raw.githubusercontent.com/jonelantha/react-responsive-pagination/refs/heads/main/theme-previews/minimal.png" width="169" alt="minimal pagination" /></picture></a>                           |

Themes also available as light only, please see the [Themes guide](https://react-responsive-pagination.elantha.com/themes) for more details (including overridable theme attributes)

## ℹ️ More Info

[Visit the docs](https://react-responsive-pagination.elantha.com) to explore themes, styling options & props
