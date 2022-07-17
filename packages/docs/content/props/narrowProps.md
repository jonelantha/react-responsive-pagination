import { PropsTable, PropDef } from "../../src/components/PropsTable"

<PropDef name='narrowStrategy' type="'dropEllipsis' | 'dropNav' | ('dropEllipsis' | 'dropNav')[]" defaultValue='undefined'>

Specify that nav buttons (**«**/**»**) and/or the ellipsis (**…**) can be dropped for very narrow widths (useful if the component is used in narrow widths with high page numbers)

`'dropEllipsis'` - drop the ellipsis (**…**) for narrow widths<br />
`'dropNav'` - drop the nav (**«**/**»**) for narrow widths<br />
`['dropNav', 'dropEllipsis']` - drop the nav initially and then further drop the ellipsis if required<br />
`['dropEllipsis', 'dropNav']` - drop the ellipsis initially and then further drop the nav if required

The default behaviour is to not drop these elements (this may change in a future major release)

</PropDef>
