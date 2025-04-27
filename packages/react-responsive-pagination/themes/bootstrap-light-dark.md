# Bootstrap theme [auto light/dark]

See [theme overview](https://react-responsive-pagination.elantha.com/themes#2-bootstrap-theme-without-bootstrap)

See also [additional Bootstrap options](https://react-responsive-pagination.elantha.com/bootstrap-pagination#options)

To use this theme, import this css in your project:

```js
import 'react-responsive-pagination/themes/bootstrap-light-dark.css';
```

Overridable CSS variables listed below, to override a variable just add a block like this to a global CSS file:

```css
:root {
  --pagination-color-light: #ff0000;
  /*... any other variables you want to override */
}
```

| Overridable CSS Theme Variables            | **Description**                | **Default**                       |
| ------------------------------------------ | ------------------------------ | --------------------------------- |
| **MAIN THEME COLORS:**                     |                                |                                   |
| `--pagination-color-light`                 | Text color (light)             | #0d6efd                           |
| `--pagination-color-dark`                  | Text color (dark)              | #6ea8fe                           |
| `--pagination-active-bg-light`             | Active page background (light) | #0d6efd                           |
| `--pagination-active-bg-dark`              | Active page background (dark)  | #0d6efd                           |
| <br />**ADDITIONAL THEME COLORS:**         |                                |
| `--pagination-bg-light`                    | Background color (light)       | #ffffff                           |
| `--pagination-bg-dark`                     | Background color (dark)        | #212529                           |
| `--pagination-active-color-light`          | Active text color (light)      | #ffffff                           |
| `--pagination-active-color-dark`           | Active text color (dark)       | #ffffff                           |
| `--pagination-hover-bg-light`              | Hover background (light)       | #e9ecef                           |
| `--pagination-hover-bg-dark`               | Hover background (dark)        | #343a40                           |
| `--pagination-disabled-color-light`        | Disabled text color (light)    | #6c757d                           |
| `--pagination-disabled-color-dark`         | Disabled text color (dark)     | rgba(222, 226, 230, 0.75)         |
| `--pagination-border-color-light`          | Border color (light)           | #dee2e6                           |
| `--pagination-border-color-dark`           | Border color (dark)            | #495057                           |
| (also see Advanced colors below)           |                                |                                   |
| <br />**FONT VARIABLES:**                  |                                |                                   |
| `--pagination-font-family`                 | Font family                    | (see font-family in css)          |
| `--pagination-font-size`                   | Font size                      | 1rem                              |
| `--pagination-line-height`                 | Line height                    | 1.5                               |
| `--pagination-font-weight-light`           | Font weight (light)            | 400                               |
| `--pagination-font-weight-dark`            | Font weight (dark)             | 400                               |
| `--pagination-active-font-weight-light`    | Active font weight (light)     | `--pagination-font-weight-light`  |
| `--pagination-active-font-weight-dark`     | Active font weight (dark)      | `--pagination-font-weight-dark`   |
| <br />**SPACING / ALIGNMENT:**             |                                |                                   |
| `--pagination-padding-y`                   | Padding y                      | 0.375rem                          |
| `--pagination-padding-x`                   | Padding x                      | 0.75rem                           |
| `--pagination-margin-top`                  | Margin top                     | 0                                 |
| `--pagination-margin-bottom`               | Margin bottom                  | 0                                 |
| `--pagination-justify-content`             | Justify content                | `--pagination-justify-content-fb` |
| <br />**BORDER VARIABLES:**                |                                |                                   |
| `--pagination-border-width`                | Border width                   | 1px                               |
| `--pagination-border-radius`               | Border radius                  | 0.375rem                          |
| <br />**ADVANCED COLORS:**                 |                                |                                   |
| `--pagination-hover-color-light`           | Hover text color (light)       | `--pagination-color-light`        |
| `--pagination-hover-color-dark`            | Hover text color (dark)        | `--pagination-color-dark`         |
| `--pagination-hover-border-color-light`    | Hover border color (light)     | `--pagination-border-color-light` |
| `--pagination-hover-border-color-dark`     | Hover border color (dark)      | `--pagination-border-color-dark`  |
| `--pagination-focus-color-light`           | Focus text color (light)       | `--pagination-hover-color-light`  |
| `--pagination-focus-color-dark`            | Focus text color (dark)        | `--pagination-hover-color-dark`   |
| `--pagination-focus-bg-light`              | Focus background (light)       | `--pagination-hover-bg-light`     |
| `--pagination-focus-bg-dark`               | Focus background (dark)        | `--pagination-hover-bg-dark`      |
| `--pagination-active-border-color-light`   | Active border color (dark)     | `--pagination-active-bg-light`    |
| `--pagination-active-border-color-dark`    | Active border color (light)    | `--pagination-active-bg-dark`     |
| `--pagination-disabled-bg-light`           | Disabled background (light)    | `--pagination-bg-light`           |
| `--pagination-disabled-bg-dark`            | Disabled background (dark)     | `--pagination-bg-dark`            |
| `--pagination-disabled-border-color-light` | Disabled border color (light)  | `--pagination-border-color-light` |
| `--pagination-disabled-border-color-dark`  | Disabled border color (dark)   | `--pagination-border-color-dark`  |
