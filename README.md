# React Responsive Pagination

A React pagination component which intelligently renders to a given pixel width. Styled for Bootstrap 4

![Example pagination](./pagination.png?raw=true 'React Responsive Pagination')

## How do I use it?

- Make sure your project is using the [Bootstrap 4 CSS styles](https://getbootstrap.com/docs/4.3/getting-started/download/)

- Include the pagination component in your React project with `npm install react-responsive-pagination`

- Import the component with `import Pagination from 'react-responsive-pagination'`

- Use the component with `<Pagination current={currentPage} total={totalPages} onPageChange={pageChangeHandler} maxWidth={maxWidth}/>` (see below for a more detailed example)

## More details...

### Requirements / Compatibility

- React 16.8 (the one with hooks)

- [Bootstrap 4 CSS styles](https://getbootstrap.com/docs/4.3/getting-started/download/) used in your project

- Modern browsers only (IE 11 is untested and unlikely to work)

### Usage Example

- The example below includes a simple `useWindowWidth` hook which supplies the pagination component with the browser's window width.

- The [Bootstrap 4 CSS styles](https://getbootstrap.com/docs/4.3/getting-started/download/) needs to be included in the project for this example to work

```jsx
import React, { useLayoutEffect, useState } from 'react';
import Pagination from 'react-responsive-pagination';

function MyApp() {
  const windowWidth = useWindowWidth();

  const [currentPage, setCurrentPage] = useState(4);

  const totalPages = 17;

  return (
    <Pagination
      current={currentPage}
      total={totalPages}
      onPageChange={setCurrentPage}
      maxWidth={windowWidth}
    />
  );
}

function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resizeHandler = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return windowWidth;
}
```

### Props

| Prop name    | Type                      | Description                                                                                                                                                                                                                                 |
| ------------ | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| current      | number                    | The current active page. Indexed from 1                                                                                                                                                                                                     |
| total        | number                    | The total number of pages                                                                                                                                                                                                                   |
| onPageChange | (newPage: number) => void | A callback handler which is called when the user clicks a new page, note that the active page will not change unless the `current` prop is updated to reflect the new page (as in the example above). The `newPage` value is indexed from 1 |
| maxWidth     | number                    | The maximum width (in pixels) of the pagination component. Note this width may be exceeded in the case where it's not possible to output a small enough component                                                                           |
