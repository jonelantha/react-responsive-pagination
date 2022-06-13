---
title: 'Custom Styles Guide'
description: 'React npm responsive pagination component with custom styling'
navTitle: 'Custom Styles'
topNavOrder: 3
sideNavOrder: 4
footerNavOrder: 5
addOverview: true
---

import OverrideSSR from "../../src/components/OverrideSSR"
import { CustomStyleContainer1, customStyles1, CustomStyleContainer2, customStyles2, CustomStyleContainer3, customStyles3, MinimumBootstrapContainer, minimumBootstrap4Styles, exampleAppCode } from './customPaginationStyles';
import BootstrapLiveDemoClass from "../../src/components/BootstrapLiveDemoClass"
import Bootstrap4PaginationContainer from '../../src/components/Bootstrap4PaginationContainer';
import BootstrapSSR from "../../src/components/BootstrapSSR"
import { PropsTable, PropDef } from "../../src/components/PropsTable"
import ClassNameProps from "../props/classNameProps.md"
import LabelProps from "../props/labelProps.md"

# Custom Styles

**react-responsive-pagination** is an easy to use React responsive pagination component which always outputs the right number of pagination elements for the width available, no guesswork needed

Easy to style, just include the necessary css in your project (see examples below)

<OverrideSSR>
{isSSR => (
  <CustomStyleContainer1>
    {isSSR ? <BootstrapSSR /> : <BootstrapLiveDemoClass />}
  </CustomStyleContainer1>
)}
</OverrideSSR>

## Installation

Install **react-responsive-pagination** from npm:

```bash
npm install react-responsive-pagination
```

## Quick Start

<CodeBlock code={exampleAppCode} language='jsx' title='MyApp.js'/>

See below for **pagination.css** examples

_(for more information on Props, see [Props Reference](/props), for a class component example see [here](/bootstrap-pagination#quick-start---class-components))_

## Custom Styling

To create custom styles for **react-responsive-pagination** simply include some custom css - the four examples below should provide a good starting point. For a full list of suggested css selectors to target, see [Selector Reference](#selector-reference)

Using Bootstrap 4.x? No problem, see the [Bootstrap Pagination](/bootstrap-pagination) guide.

## Example 1 - Basic Pagination

<OverrideSSR>
{isSSR => (
  <CustomStyleContainer1>
    {isSSR ? <BootstrapSSR /> : <BootstrapLiveDemoClass />}
  </CustomStyleContainer1>
)}
</OverrideSSR>

<CodeBlock code={customStyles1} language='css' previewSize={6} title='pagination.css'/>

_For a full list of suggested css selectors to target, see [Selector Reference](#selector-reference)_

## Example 2 - Classic Pagination

<OverrideSSR>
{isSSR => (
  <CustomStyleContainer2>
    {isSSR ? <BootstrapSSR /> : <BootstrapLiveDemoClass />}
  </CustomStyleContainer2>
)}
</OverrideSSR>

<CodeBlock code={customStyles2} language='css' previewSize={6} title='pagination.css'/>

_For a full list of suggested css selectors to target, see [Selector Reference](#selector-reference)_

## Example 3 - Advanced Pagination

<OverrideSSR>
{isSSR => (
  <CustomStyleContainer3>
    {isSSR ? <BootstrapSSR /> : <BootstrapLiveDemoClass />}
  </CustomStyleContainer3>
)}
</OverrideSSR>

<CodeBlock code={customStyles3} language='css' previewSize={6} title='pagination.css'/>

_For a full list of suggested css selectors to target, see [Selector Reference](#selector-reference)_

## Example 4 - Standalone Bootstrap 4 Styles

<OverrideSSR>
{isSSR => (
  <MinimumBootstrapContainer>
    {isSSR ? <BootstrapSSR /> : <BootstrapLiveDemoClass />}
  </MinimumBootstrapContainer>
)}
</OverrideSSR>

**Pagination css:**

<CodeBlock code={minimumBootstrap4Styles} language='css' previewSize={7} title='pagination.css' />

_For a full list of suggested css selectors to target, see the next section_

## Selector Reference

| Selector                         | Notes                                                                                                                                                                                                                               |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.pagination`                    | **Pagination container** _(<ul\> tag)_<br />The recommended style is a horizontal flexbox (see examples above)                                                                                                                      |
| `.page-item`                     | **Item containers** _(<li\> tags)_<br />Styles may not be needed for this selector, see selector below                                                                                                                              |
| `.page-item .page-link`          | **Item elements** _(<a\> or <span\> tags)_<br />Includes links and static labels. Style as a block element with appropriate font, margin and border (see examples above)                                                            |
| `.page-item a.page-link`         | **Clickable item elements** _(<a\> tags)_<br />Page links or the next/previous buttons (if they are clickable)                                                                                                                      |
| `.page-item.active .page-link`   | **Active page link** _(<a\> tags)_<br />CSS should highlight this element (see examples above)                                                                                                                                      |
| `.page-item.disabled .page-link` | **Disabled items** _(<span\> tags)_<br />Includes '...' or disabled nav buttons. CSS should show grey out these elements (see examples above)                                                                                       |
| `.sr-only`                       | **Screen reader only elements** _(<span\> tags)_<br />Required for accessibility. These elements not be visible, use CSS to visually hide these elements in a way screen readers can still read the text (see below for an example) |

## Screen reader only (.sr-only) styles

To enhance Accessibility, the `.sr-only` style is used to visually hide content meant only for users using screen readers. Typically css for this selector would be:

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

_(this css included in the css examples above)_

## Overriding default classNames

If needed, you can easily override the default class names by adding the following props:

| className Prop          | Description                                                                                                                                          |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `className`             | Class name for the top level **<ul\>** container                                                                                                     |
| `pageItemClassName`     | Class name for all the **<li\>** elements                                                                                                            |
| `pageLinkClassName`     | Class name for **<a\>** or **<span\>** child elements within an **<li\>** element                                                                    |
| `activeItemClassName`   | Appended to **<li\>** class name for the active element                                                                                              |
| `disabledItemClassName` | Appended to **<li\>** class name for non-clickable elements (disabled nav buttons and the break/ellipsis)                                            |
| `srOnlyClassName`       | Class for screen reader only content (which should be visually hidden). See an example of typical [.sr-only css](#screen-reader-only-sr-only-styles) |

### Example - overriding default class names

```jsx
<Pagination
  className="my-pagination"
  pageItemClassName="my-item"
  pageLinkClassName="my-link"
  activeItemClassName="my-active"
  disabledItemClassName="my-disabled"
  // ...other props
/>

// would create html like this

<ul class="my-pagination">
    <li class="my-item my-disabled">
        <span class="my-link">
            <span aria-hidden="true">«</span>
            <span class="sr-only">Previous</span>
        </span>
    </li>
    <li class="my-item my-active">
        <a class="my-link" href="#" aria-label="(current)">
            <span aria-hidden="true">1</span>
            <span class="sr-only">(current)</span>
        </a>
    </li>
    <li class="my-item">
        <a class="my-link" href="#">2</a>
    </li>
    <!-- ... more elements -->
</ul>

```

## Other Options

### Previous and Next Labels

Change the default labels for the previous and next buttons by setting the `previousLabel` and `nextLabel` props:

**Example - Text labels**

<Bootstrap4PaginationContainer>
<OverrideSSR>
{isSSR => isSSR ? <BootstrapSSR /> : <BootstrapLiveDemoClass previousLabel="Previous" nextLabel="Next" />}
</OverrideSSR>
</Bootstrap4PaginationContainer>

```jsx
<Pagination ... previousLabel="Previous" nextLabel="Next" />
```

## Useful Props For Customisation

A selection of props which may be helpful when using custom styles - for the full list of props see [Props Reference](/props)

<PropsTable>
<ClassNameProps />
<LabelProps />
</PropsTable>
