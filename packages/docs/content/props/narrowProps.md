import { Fragment } from 'react';
import { PropsTable, PropDef } from "../../src/components/PropsTable"

<Fragment>
  <PropDef name='narrowBehaviour' type="NarrowBehaviour" defaultValue='undefined'>
    Specify that nav buttons (**«**/**»**) and/or the ellipsis (**…**) can be dropped for very narrow widths (useful if the component is used in narrow widths with high page numbers)

    Valid behaviours should be imported from `react-responsive-pagination/narrowBehaviour`, example:

    ```jsx
    import ResponsivePagination from 'react-responsive-pagination';
    import { dropEllipsis } from 'react-responsive-pagination/narrowBehaviour';

    <ResponsivePagination ... narrowBehaviour={dropEllipsis} />
    ```

    Valid NarrowBehaviours:

    `dropEllipsis` - drop the ellipsis (**…**) for narrow widths<br />
    `dropNav` - drop the nav (**«**/**»**) for narrow widths<br />
    `dropFirstAndLast` - drop the first and last pages for narrow widths<br />

    The default behaviour is to not drop any elements (this may change in a future major release)

    **Using Multiple NarrowBehaviours**

    Multiple NarrowBehaviours can be combined using the `combine` helper (also imported from `react-responsive-pagination/narrowBehaviour`), example:

    ```jsx
    import ResponsivePagination from 'react-responsive-pagination';
    import { dropEllipsis, dropNav, combine } from 'react-responsive-pagination/narrowBehaviour';

    <ResponsivePagination
      ...
      narrowBehaviour={combine(dropNav, dropEllipsis)}
    />
    ```

    The behaviours will be applied in order so in this example, `combine(dropNav, dropEllipsis)` will drop the nav (**«**/**»**) initially and then further drop the ellipsis (**…**) if required<br />

  </PropDef>
</Fragment>
