# React Responsive Pagination

![npm version](https://img.shields.io/npm/v/react-responsive-pagination.svg?style=flat)
![minzipped size](https://img.shields.io/bundlephobia/minzip/react-responsive-pagination)
![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)
![test](https://github.com/jonelantha/react-responsive-pagination/workflows/Test/badge.svg)
![release](https://github.com/jonelantha/react-responsive-pagination/workflows/Release/badge.svg)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

A React pagination component which intelligently renders to the available width.  
Styled for Bootstrap 4.

<img src="./react-responsive-pagination.gif?raw=true" width="985" alt="react-responsive-pagination example" />

## How do I use it?

- Make sure your project is either using the [Bootstrap 4 CSS styles](https://getbootstrap.com/docs/4.6/getting-started/download/) or alternatively you can provide your own styles, see [Requirements](#requirements--compatibility) below

- Include the pagination component in your React project with `npm install react-responsive-pagination`

- Import the component with `import Pagination from 'react-responsive-pagination'`

- Use the component with `<Pagination current={currentPage} total={totalPages} onPageChange={pageChangeHandler} />` (see [Usage Example](#usage-example) for a more detailed example)

- See the [About Auto Sizing](#about-auto-sizing) section below for info on some limitations of the auto sizing algorithm.

## More details...

### Requirements / Compatibility

- React 16.8 (the one with hooks)

- Provide the correct styles in your project:

  - Either [Bootstrap 4 CSS styles](https://getbootstrap.com/docs/4.6/getting-started/download/)
  - Or alternatively you can use your own styles, here are some examples:
    - [Minimal styles](./css/min.css)
    - [Bootstrap pagination styles](./css/minBootstrap.css)

- Modern browsers only - not suitable for IE 11

### Usage Example

- The [Bootstrap 4 CSS styles](https://getbootstrap.com/docs/4.3/getting-started/download/) needs to be included in the project for this example to work

```jsx
import React, { useState } from 'react';
import Pagination from 'react-responsive-pagination';

function MyApp() {
  const [currentPage, setCurrentPage] = useState(4);

  const totalPages = 17;

  return (
    <Pagination
      current={currentPage}
      total={totalPages}
      onPageChange={setCurrentPage}
    />
  );
}
```

### About Auto Sizing

Auto sizing uses the width of the immediate parent element. For best results make sure the parent element isn't intrinsically sized; that means the width of the parent element shouldn't depend on its contents. If your layout is intrinsic then the pagination component should still fill the space correctly but you may occasionally see inconsistant results or additional renders.

You can choose to override the auto sizing by specifying the `maxWidth` prop (see [Props](#props) section below).

The final thing to note is that for very narrow widths the component may exceed the available space - this is to ensure that there's always a usable pagination component.

### Props

| Prop name           | Type                      | Description                                                                                                                                                                                                                                 |
| ------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| current             | number                    | The current active page. Indexed from 1                                                                                                                                                                                                     |
| total               | number                    | The total number of pages                                                                                                                                                                                                                   |
| onPageChange        | (newPage: number) => void | A callback handler which is called when the user clicks a new page, note that the active page will not change unless the `current` prop is updated to reflect the new page (as in the example above). The `newPage` value is indexed from 1 |
| maxWidth (optional) | number                    | (optional) The maximum width (in pixels) of the pagination component. Specify a value if you want to override the automatic sizing. Note this width may be exceeded in the case where it's not possible to output a small enough component  |
