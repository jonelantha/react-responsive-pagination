import React from 'react';

const Container = React.forwardRef<HTMLElement, Props>(({ children }, ref) => (
  <ul
    className="pagination justify-content-center"
    ref={ref as React.Ref<HTMLUListElement>}
  >
    {children}
  </ul>
));

type Props = { children?: React.ReactNode };

export default Container;
