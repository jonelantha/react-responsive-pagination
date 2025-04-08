# Minimal theme [auto light/dark]

See [theme overview](https://react-responsive-pagination.elantha.com/themes#3-minimal-theme)

To use this theme, import this css in your project:

```js
import 'react-responsive-pagination/themes/minimal-light-dark.css';
```

Overridable CSS variables listed below, to override a variable just add a block like this to a global CSS file:

```css
:root {
  --pagination-color-light: #ff0000;
  /*... any other variables you want to override */
}
```

| Overridable CSS Theme Variables         | **Description**                   | **Default**                       |
| --------------------------------------- | --------------------------------- | --------------------------------- |
| **MAIN THEME COLORS:**                  |                                   |                                   |
| `--pagination-color-light`              | Text color (light)                | #0d6efd                           |
| `--pagination-color-dark`               | Text color (dark)                 | #6ea8fe                           |
| `--pagination-active-bg-light`          | Active page background (light)    | #0d6efd                           |
| `--pagination-active-bg-dark`           | Active page background (dark)     | #0d6efd                           |
| <br />**ADDITIONAL THEME COLORS:**      |                                   |
| `--pagination-bg-light`                 | Background (light)                | transparent                       |
| `--pagination-bg-dark`                  | Background (dark)                 | transparent                       |
| `--pagination-active-color-light`       | Active text color (light)         | #ffffff                           |
| `--pagination-active-color-dark`        | Active text color (dark)          | #ffffff                           |
| `--pagination-disabled-color-light`     | Disabled text color (light)       | #6c757d                           |
| `--pagination-disabled-color-dark`      | Disabled text color (dark)        | rgba(222, 226, 230, 0.75)         |
| (also see Advanced colors below)        |                                   |                                   |
| <br />**FONT VARIABLES:**               |                                   |                                   |
| `--pagination-font-family`              | Font family                       | (see font-family in css)          |
| `--pagination-font-size`                | Font size                         | 1rem                              |
| `--pagination-line-height`              | Line height                       | 1.5                               |
| `--pagination-font-weight-light`        | Font weight (light)               | inherit                           |
| `--pagination-font-weight-dark`         | Font weight (dark)                | inherit                           |
| `--pagination-active-font-weight-light` | Active font weight (light)        | `--pagination-font-weight-light`  |
| `--pagination-active-font-weight-dark`  | Active font weight (dark)         | `--pagination-font-weight-dark`   |
| `--pagination-hover-text-decoration`    | Hover text decoration             | none                              |
| <br />**SPACING / ALIGNMENT:**          |                                   |                                   |
| `--pagination-padding-y`                | Padding y                         | 0.25rem                           |
| `--pagination-padding-x`                | Padding x                         | 0.5rem                            |
| `--pagination-margin-top`               | Margin top                        | 0                                 |
| `--pagination-margin-bottom`            | Margin bottom                     | 0                                 |
| `--pagination-item-margin-x`            | Item margin x                     | 0                                 |
| `--pagination-justify-content`          | Justify content                   | `--pagination-justify-content-fb` |
| <br />**BORDER VARIABLES:**             |                                   |                                   |
| `--pagination-border-radius`            | Border radius                     | 0.2rem                            |
| <br />**ADVANCED COLORS:**              |                                   |                                   |
| `--pagination-hover-color-light`        | Hover text color (light)          | `--pagination-active-color-light` |
| `--pagination-hover-color-dark`         | Hover text color (dark)           | `--pagination-active-color-dark`  |
| `--pagination-hover-bg-light`           | Hover background (light)          | `--pagination-color-light`        |
| `--pagination-hover-bg-dark`            | Hover background (dark)           | `--pagination-color-dark`         |
| `--pagination-disabled-bg-light`        | Disabled background color (light) | `--pagination-bg-light`           |
| `--pagination-disabled-bg-dark`         | Disabled background color (dark)  | `--pagination-bg-dark`            |
