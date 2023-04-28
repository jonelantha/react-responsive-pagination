---
title: 'Ready styled pagination'
description: 'react-responsive-pagination theme styles'
navTitle: 'Themes'
topNavOrder: 2
sideNavOrder: 3
footerNavOrder: 4
addOverview: true
---

import { exampleAppCode, BootstrapLightStyleContainer, ClassicLightStyleContainer, MinimalLightStyleContainer, ThemeAttributes } from './themes';
import ResponsivePagination from 'react-responsive-pagination';

# Themes

**react-responsive-pagination** is an easy to use React responsive pagination component which always outputs the right number of pagination elements for the width available, no guesswork needed

**react-responsive-pagination** comes with a number of ready-to-go pre-styled themes, each theme is a pre-built configurable css stylesheet, ready to be included in a front-end project - see below for the list of available themes. All themes support overridable attributes, see [Configuring a theme](#configuring-a-theme-optional) for more details

**See below for available themes**

## Installation

Install **react-responsive-pagination** from npm:

```bash
npm install react-responsive-pagination
```

## Theme quick start

Using a theme is simple, just include the theme css file somewhere in your project (usually a root page or maybe the file where the global css file is being included).

For example, using the **Classic** theme:

<CodeBlock code={exampleAppCode} language='jsx' title='MyApp.js'/>

_(see [Configuring a theme](#configuring-a-theme-optional) for details on overriding theme attributes, also please see [Props Reference](/props) for more information on Props)_

## 1. Classic theme

<ClassicLightStyleContainer hasBorder>
  {(props) => <ResponsivePagination {...props} />}
</ClassicLightStyleContainer>

<ThemeAttributes>
**Theme import:**  
`import 'react-responsive-pagination/themes/minimal-light.css';`

**Overiddable variables:**  
See [common overridable variables](#common-overridable-variables) below or see the [theme css source](https://raw.githubusercontent.com/jonelantha/react-responsive-pagination/main/packages/react-responsive-pagination/themes/classic-light.css) for the full list (with default values)
</ThemeAttributes>

## 2. Bootstrap theme (without Bootstrap)

Bootstrap 5 styled pagination. Standalone styles, no need to install the full Bootstrap library

<BootstrapLightStyleContainer hasBorder>
  {(props) => <ResponsivePagination {...props} />}
</BootstrapLightStyleContainer>

<ThemeAttributes>
**Theme import:**  
`import 'react-responsive-pagination/themes/bootstrap-light.css';`

**Notes:**  
See [additional Bootstrap options](https://react-responsive-pagination.elantha.com/bootstrap-pagination/#options)

**Overiddable variables:**  
See [common overridable variables](#common-overridable-variables) below or see the [theme css source](https://raw.githubusercontent.com/jonelantha/react-responsive-pagination/main/packages/react-responsive-pagination/themes/bootstrap-light.css) for the full list (with default values)
</ThemeAttributes>

## 3. Minimal theme

<MinimalLightStyleContainer hasBorder>
  {(props) => <ResponsivePagination {...props} />}
</MinimalLightStyleContainer>

<ThemeAttributes>
**Theme import:**  
`import 'react-responsive-pagination/themes/minimal-light.css';`

**Overiddable variables:**  
See [common overridable variables](#common-overridable-variables) below or see the [theme css source](https://raw.githubusercontent.com/jonelantha/react-responsive-pagination/main/packages/react-responsive-pagination/themes/minimal-light.css) for the full list (with default values)
</ThemeAttributes>

## Configuring a theme (optional)

All themes are ready-to-go but various attributes can be overridden (if required)

**To override an attribute:** add a root selector to the project's global stylesheet (create a global stylesheet if necessary) and then define one or more css variables in the root selector:

```css
:root {
  --pagination-color: #0d6efd;
  --pagination-hover-color: #0a58ca;
  /* etc */
}
```

See [Common overridable variables](#common-overridable-variables) below and also see the respective theme source files (linked above) for a full list of supported variables

## Common overridable variables

_(see the [Configuring a theme](#configuring-a-theme-optional) section above for details on overriding theme attributes)_

| Variable                    | Description                                                                                                       |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| --pagination-font-family    | Main font                                                                                                         |
| --pagination-font-weight    | Main font weight, see [mdn font-weight](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight) for options |
| --pagination-font-size      | Font size                                                                                                         |
| --pagination-color          | Text colour                                                                                                       |
| --pagination-bg             | Background colour                                                                                                 |
| --pagination-hover-color    | Text colour when hovering                                                                                         |
| --pagination-hover-bg       | Background colour when hovering                                                                                   |
| --pagination-active-color   | Text colour of active item                                                                                        |
| --pagination-active-bg      | Background colour of active item                                                                                  |
| --pagination-disabled-color | Text colour of disabled items                                                                                     |
| --pagination-disabled-bg    | Background colour of disabled items                                                                               |
| --pagination-margin-top     | Top margin of pagination component                                                                                |
| --pagination-margin-bottom  | Bottom margin of pagination component                                                                             |

Also please see each theme source files for a full list of variables supported by that theme (linked above in the respective theme section)

## Need custom css?

Users looking to fully customise the component's appearance can create a new set of styles within their project (optionally using these themes as a starting point).

For inspiration, please see the theme files at: [https://github.com/jonelantha/react-responsive-pagination/tree/main/packages/react-responsive-pagination/themes](https://github.com/jonelantha/react-responsive-pagination/tree/main/packages/react-responsive-pagination/themes) and please also see the [custom styles guide](/custom-styled-pagination)
