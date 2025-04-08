# Bootstrap theme [light]

See [theme overview](https://react-responsive-pagination.elantha.com/themes#2-bootstrap-theme-without-bootstrap)

See also [additional Bootstrap options](https://react-responsive-pagination.elantha.com/bootstrap-pagination#options)

To use this theme, import this css in your project:

```js
import 'react-responsive-pagination/themes/bootstrap.css';
```

Overridable CSS variables listed below, to override a variable just add a block like this to a global CSS file:

```css
:root {
  --pagination-color: #ff0000;
  /*... any other variables you want to override */
}
```

| Overridable CSS Theme Variables      | **Description**           | **Default**                       |
| ------------------------------------ | ------------------------- | --------------------------------- |
| **MAIN THEME COLORS:**               |                           |                                   |
| `--pagination-color`                 | Text color                | #0d6efd                           |
| `--pagination-hover-color`           | Hover text color          | #0a58ca                           |
| <br />**ADDITIONAL THEME COLORS:**   |                           |
| `--pagination-bg`                    | Background color          | #fff                              |
| `--pagination-active-color`          | Active text color         | #fff                              |
| `--pagination-hover-bg`              | Hover background color    | #e9ecef                           |
| `--pagination-disabled-color`        | Disabled text color       | #6c757d                           |
| `--pagination-border-color`          | Border color              | #dee2e6                           |
| (also see Advanced colors below)     |                           |                                   |
| <br />**FONT VARIABLES:**            |                           |                                   |
| `--pagination-font-family`           | Font family               | (see font-family in css)          |
| `--pagination-font-size`             | Font size                 | 1rem                              |
| `--pagination-font-weight`           | Font weight               | 400                               |
| `--pagination-line-height`           | Line height               | 1.5                               |
| <br />**SPACING / ALIGNMENT:**       |                           |                                   |
| `--pagination-padding-y`             | Padding y                 | 0.375rem                          |
| `--pagination-padding-x`             | Padding x                 | 0.75rem                           |
| `--pagination-margin-top`            | Margin top                | 0                                 |
| `--pagination-margin-bottom`         | Margin bottom             | 0                                 |
| `--pagination-justify-content`       | Justify content           | `--pagination-justify-content-fb` |
| <br />**BORDER VARIABLES:**          |                           |                                   |
| `--pagination-border-width`          | Border width              | 1px                               |
| `--pagination-border-radius`         | Border radius             | 0.375rem                          |
| <br />**ADVANCED COLORS:**           |                           |                                   |
| `--pagination-hover-border-color`    | Hover border color        | `--pagination-border-color`       |
| `--pagination-focus-color`           | Focus text color          | `--pagination-hover-color`        |
| `--pagination-focus-bg`              | Focus background color    | `--pagination-hover-bg`           |
| `--pagination-active-bg`             | Active background color   | `--pagination-color`              |
| `--pagination-active-border-color`   | Active border color       | `--pagination-color`              |
| `--pagination-disabled-bg`           | Disabled background color | `--pagination-bg`                 |
| `--pagination-disabled-border-color` | Disabled border color     | `--pagination-border-color`       |
