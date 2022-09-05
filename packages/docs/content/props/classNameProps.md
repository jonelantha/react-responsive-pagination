import { Fragment } from 'react';
import { PropsTable, PropDef } from '../../src/components/PropsTable';
import ExtraClassNameProp from './extraClassNameProp.md';

<Fragment>
  <PropDef name='className' type='string' defaultValue='pagination'>
    Class name for the top level **\<ul>** container

    Defaults to `pagination`, overrides **extraClassName** prop (below)

  </PropDef>
  <ExtraClassNameProp />
  <PropDef name='pageItemClassName' type='string' defaultValue='page-item'>
    Class name for all the **\<li>** elements

    Defaults to `page-item`

  </PropDef>
  <PropDef name='pageLinkClassName' type='string' defaultValue='page-link'>
    Class name for **\<a>** or **\<span>** child elements within an **\<li>** element:

    `<li ...><a class='page-link'>1</a></li>`

    Defaults to `page-link`

  </PropDef>
  <PropDef name='activeItemClassName' type='string' defaultValue='active'>
    Appended to **\<li>** class name for the active element:

    `<li class='page-item active'><a class='page-link'>1</a></li>`

    Defaults to `active`

  </PropDef>
  <PropDef name='disabledItemClassName' type='string' defaultValue='disabled'>
    Appended to **\<li>** class name for non-clickable elements (disabled nav buttons and the break/ellipsis):

    `<li class='page-item disabled'><span class='page-link'>...</span></li>`

    Defaults to `disabled`

  </PropDef>
  <PropDef name='srOnlyClassName' type='string' defaultValue='sr-only'>
    Class for screen reader only content (which should be visually hidden) - see [an example of typical css](/custom-styled-pagination/#screen-reader-only-sr-only-styles) for this purpose

    Setting this prop to `''` will turn off all the **\<span>** based screen reader labels (this should be fine in most cases as screen readers will still be able to read the `aria-label` attributes)

    Defaults to `sr-only`

  </PropDef>
</Fragment>
