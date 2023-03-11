import { Fragment } from 'react';
import { PropsTable, PropDef } from "../../src/components/PropsTable"

<Fragment>
  <PropDef name='srOnlyClassName' type='string' defaultValue='undefined'>
    _Legacy prop for v1 compatibility_

    V1 of this component used visually hidden spans for screen reader labels (instead of aria attributes). This prop can be used to re-enable the visually hidden spans (using the prop value as a class name for the spans)

    For reference, here's an example of a visually hidden css style:

    ```css
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
    ```

    [CSS-TRICKS - Inclusively Hidden](https://css-tricks.com/inclusively-hidden/)

</PropDef>
</Fragment>
