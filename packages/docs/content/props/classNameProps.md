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
  <PropDef name='navClassName' type='string' defaultValue='undefined'>
    Appended to **\<li>** class name for nav items (`«` / `»` buttons)

    Setting to 'my-nav' would give html similar to:

    `<li class='page-item my-nav'><span class='page-link'>«</span></li>`

    By default will not be output

  </PropDef>
  <PropDef name='previousClassName' type='string' defaultValue='undefined'>
    Appended to **\<li>** class name for the previous button (`«`)

    Setting to 'my-previous-button' would give html similar to:

    `<li class='page-item my-previous-button'><span class='page-link'>«</span></li>`

    Overrides `navClassName` and by default will not be output

  </PropDef>
  <PropDef name='nextClassName' type='string' defaultValue='undefined'>
    Appended to **\<li>** class name for the next button (`»`)

    Setting to 'my-next-button' would give html similar to:

    `<li class='page-item my-next-button'><span class='page-link'>»</span></li>`

    Overrides `navClassName` and by default will not be output

  </PropDef>
</Fragment>
