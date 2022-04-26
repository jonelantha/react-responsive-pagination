---
title: 'Props Reference'
description: 'React npm responsive pagination props'
navTitle: 'Props Reference'
sideNavOrder: 5
footerNavOrder: 6
addOverview: true
---

import { PropsTable, PropDef } from "../../src/components/PropsTable"

# Props Reference

<PropsTable>
<PropDef name='current' type='number'>
The current active page. Indexed from 1
</PropDef>
<PropDef name='total' type='number' >
The total number of pages
</PropDef>
<PropDef name='onPageChange' type='(newPage: number) => void' >

A callback handler which is called when the user clicks a new page. The `newPage` parameter is indexed from 1

Note that the active page will not change unless the `current` prop is updated to reflect the new page (as in the example above)

</PropDef>
<PropDef name='maxWidth' type='number' defaultValue='undefined'>
The maximum width (in pixels) of the pagination component. Use this prop if you want to override the automatic sizing. Note the width may be exceeded if it's not possible a component to the specified width
</PropDef>
<PropDef name='previousLabel' type='string' defaultValue='«'>

The label for the previous button, default value is `«`

</PropDef>
<PropDef name='nextLabel' type='string' defaultValue='»'>

The label for the next button, default value is `»`

</PropDef>
<PropDef name='extraClassName' type='string' defaultValue='justify-content-center'>

Extra classes to be added to the top level `<ul>` element, defaults to `justify-content-center`

Use this prop to override the default justify value - for example to align elements to the start of the page use: `justify-content-start`

</PropDef>

</PropsTable>
