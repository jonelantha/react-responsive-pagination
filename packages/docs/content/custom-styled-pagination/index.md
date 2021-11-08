---
title: 'Custom Styles Guide'
description: 'Responsive pagination component with custom styling'
---

import OverrideSSR from "../../src/components/OverrideSSR"
import CustomPaginationContainer from "../../src/components/CustomPaginationContainer"
import { customStyles1, customStyles2, customStyles3, minimumBootstrap4Styles, exampleAppCode } from './customPaginationStyles';
import BootstrapLiveDemoClass from "../../src/components/BootstrapLiveDemoClass"
import Bootstrap4PaginationStyles from '../../src/components/Bootstrap4PaginationStyles';
import BootstrapSSR from "../../src/components/BootstrapSSR"
import { PropsTable, PropDef } from "../../src/components/PropsTable"

# Styled Responsive Pagination

**react-responsive-pagination** is an easy to use responsive pagination component:

- Truly responsive - always outputs the right number of pagination elements for the width available, no guesswork needed
- Easy to style, just include the necessary css in your project (see examples below)

<OverrideSSR>
{isSSR => (
  <CustomPaginationContainer customStyles={customStyles1}>
    {isSSR ? <BootstrapSSR /> : <BootstrapLiveDemoClass />}
  </CustomPaginationContainer>
)}
</OverrideSSR>

## Installation

Install **react-responsive-pagination** from npm:

```bash
npm install react-responsive-pagination
```

## Compatibility

- React 16.8 or later
- Modern browsers only - not suitable for IE 11

## Quick Start - Functional Components / Hooks

_(for a class component example see [here](./bootstrap-pagination#quick-start---class-components))_

<CodeBlock code={exampleAppCode} language='jsx' title='MyApp.js'/>

_(see below for **pagination.css** examples, for more information on Props, see [Props Reference](#props-reference))_

## Custom Styling

To create custom styles for **react-responsive-pagination** simply include some custom css - the four examples below should provide a good starting point. For a full list of suggested css selectors to target, see [Selector Reference](#selector-reference)

Using Bootstrap 4.x? No problem, see the [Bootstrap Pagination](./bootstrap-pagination) guide.

## Example 1 - Basic Pagination

<OverrideSSR>
{isSSR => (
  <CustomPaginationContainer customStyles={customStyles1}>
    {isSSR ? <BootstrapSSR /> : <BootstrapLiveDemoClass />}
  </CustomPaginationContainer>
)}
</OverrideSSR>

<CodeBlock code={customStyles1} language='css' previewSize={6} title='pagination.css'/>

_For a full list of suggested css selectors to target, see [Selector Reference](#selector-reference)_

## Example 2 - Classic Pagination

<OverrideSSR>
{isSSR => (
  <CustomPaginationContainer customStyles={customStyles2}>
    {isSSR ? <BootstrapSSR /> : <BootstrapLiveDemoClass />}
  </CustomPaginationContainer>
)}
</OverrideSSR>

<CodeBlock code={customStyles2} language='css' previewSize={6} title='pagination.css'/>

_For a full list of suggested css selectors to target, see [Selector Reference](#selector-reference)_

## Example 3 - Advanced Pagination

<OverrideSSR>
{isSSR => (
  <CustomPaginationContainer customStyles={customStyles3}>
    {isSSR ? <BootstrapSSR /> : <BootstrapLiveDemoClass />}
  </CustomPaginationContainer>
)}
</OverrideSSR>

<CodeBlock code={customStyles3} language='css' previewSize={6} title='pagination.css'/>

_For a full list of suggested css selectors to target, see [Selector Reference](#selector-reference)_

## Example 4 - Standalone Bootstrap 4 Styles

<OverrideSSR>
{isSSR => (
  <CustomPaginationContainer customStyles={minimumBootstrap4Styles}>
    {isSSR ? <BootstrapSSR /> : <BootstrapLiveDemoClass />}
  </CustomPaginationContainer>
)}
</OverrideSSR>

**Pagination css:**

<CodeBlock code={minimumBootstrap4Styles} language='css' previewSize={7} title='pagination.css' />

_For a full list of suggested css selectors to target, see the next section_

## Selector Reference

| Selector                         | Notes                                                                                                                                                                                                                         |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.pagination`                    | **Pagination container** _(<ul\> tag)_<br />The recommended style is a horizontal flexbox (see examples below)                                                                                                                |
| `.page-item`                     | **Item containers** _(<li\> tags)_<br />Styles may not be needed for this selector, see selector below                                                                                                                        |
| `.page-item .page-link`          | **Item elements** _(<a\> or <span\> tags)_<br />Includes links and static labels. Style as a block element with appropriate font, margin and border (see examples below)                                                      |
| `.page-item a.page-link`         | **Clickable item elements** _(<a\> tags)_<br />Page links or the next/previous buttons (if they are clickable)                                                                                                                |
| `.page-item.active .page-link`   | **Active page link** _(<a\> tags)_<br />CSS should highlight this element (see examples below)                                                                                                                                |
| `.page-item.disabled .page-link` | **Disabled items** _(<span\> tags)_<br />Includes '...' or disabled nav buttons. CSS should show grey out these elements (see examples below)                                                                                 |
| `.sr-only`                       | **Screen reader only elements** _(<span\> tags)_<br />Required for accessibility. These elements not be visible, use CSS to visually hide these elements in a way screen readers can still read the text (see examples below) |

## Other Options

### Previous and Next Labels

Change the default labels for the previous and next buttons by setting the `previousLabel` and `nextLabel` props:

**Example - Text labels**

<Bootstrap4PaginationStyles>
<OverrideSSR>
{isSSR => isSSR ? <BootstrapSSR /> : <BootstrapLiveDemoClass previousLabel="Previous" nextLabel="Next" />}
</OverrideSSR>
</Bootstrap4PaginationStyles>

```jsx
<Pagination ... previousLabel="Previous" nextLabel="Next" />
```

## Props Reference

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
</PropsTable>

## Further Details

For further details, see the [react-responsive-pagination README](https://www.npmjs.com/package/react-responsive-pagination)
