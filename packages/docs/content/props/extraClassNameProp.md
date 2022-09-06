import { Fragment } from 'react';
import { PropsTable, PropDef } from "../../src/components/PropsTable"

<Fragment>
  <PropDef name='extraClassName' type='string' defaultValue='justify-content-center'>
    Useful when using Bootstrap styles, extra classNames to be added to the top level **\<ul>** container. Use this prop to override the default justify value - for example to align elements to the start of the page use: `justify-content-start`

    Defaults to `justify-content-center`, not applicable if **className** prop is set

  </PropDef>
</Fragment>
