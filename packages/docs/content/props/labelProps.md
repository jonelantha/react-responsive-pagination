import { Fragment } from 'react';
import { PropsTable, PropDef } from "../../src/components/PropsTable"

<Fragment>
  <PropDef name='previousLabel' type='string' defaultValue='«'>
    The label for the previous button, defaults to `«`
  </PropDef>
  <PropDef name='nextLabel' type='string' defaultValue='»'>
    The label for the next button, defaults to `»`
  </PropDef>
  <PropDef name='ariaPreviousLabel' type='string' defaultValue='Previous'>
    The accessibility ARIA label for the previous button, defaults to `Previous`
  </PropDef>
  <PropDef name='ariaNextLabel' type='string' defaultValue='Next'>
    The accessibility ARIA label for the next button, defaults to `Next`
  </PropDef>
  <PropDef name='ariaCurrentAttr' type='boolean' defaultValue='true'>
    Set to false to prevent output of `aria-current='page'` for the active page **\<li>**

    See [MDN's article on aria-current](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current) for further details

  </PropDef>
</Fragment>
