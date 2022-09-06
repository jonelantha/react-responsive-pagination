import { Fragment } from 'react';
import { PropsTable, PropDef } from "../../src/components/PropsTable"

<Fragment>
  <PropDef name='previousLabel' type='string' defaultValue='«'>
    The label for the previous button, defaults to `«`
  </PropDef>
  <PropDef name='nextLabel' type='string' defaultValue='»'>
    The label for the next button, defaults to `»`
  </PropDef>
  <PropDef name='a11yActiveLabel' type='string' defaultValue='(current)'>
    The accessibility label for the active page link, defaults to `(current)`

    Set this prop to `''` to turn off the active label

  </PropDef>
  <PropDef name='ariaCurrentAttr' type='boolean' defaultValue='undefined'>
    Set to true to output `aria-current='page'` for the active page **\<li>**, defaults to false (aria-current will not be output)

    See [MDN's article on aria-current](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current) for further details

  </PropDef>
</Fragment>
