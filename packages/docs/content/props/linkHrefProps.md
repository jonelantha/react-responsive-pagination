import { Fragment } from 'react';
import { PropsTable, PropDef } from "../../src/components/PropsTable"

<Fragment>
  <PropDef name='linkHref' type="'hash' | 'omit' | (page: number) => string" defaultValue='undefined'>
    Set `linkHref` to `omit` to omit `href='#'` from the page item **\<a>** tags

    Set `linkHref` to a callback to set each item's href to a url. The callback takes the item's page as a parameter, this allows the generated url to include the page number, example:

    ```jsx
    <ResponsivePagination
      ...
      href={page => `/results/${page}`}
    />
    ```

    <br />
    The default behaviour is to include `href='#'` in **\<a>** tags

  </PropDef>
</Fragment>
