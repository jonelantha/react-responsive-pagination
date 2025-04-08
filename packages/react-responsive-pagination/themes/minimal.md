# Minimal theme [light]

See [theme overview](https://react-responsive-pagination.elantha.com/themes#3-minimal-theme)

To use this theme, import this css in your project:

```js
import 'react-responsive-pagination/themes/minimal.css';
```

Overridable CSS variables listed below, to override a variable just add a block like this to a global CSS file:

```css
:root {
  --pagination-color: #ff0000;
  /*... any other variables you want to override */
}
```

| Overridable CSS Theme Variables      | **Description**                        | **Default**                       |
| ------------------------------------ | -------------------------------------- | --------------------------------- |
| **MAIN THEME COLORS:**               |                                        |                                   |
| `--pagination-color`                 | Text color and active background color | #0d6efd                           |
| <br />**ADDITIONAL THEME COLORS:**   |                                        |
| `--pagination-bg`                    | Background color                       | #fff                              |
| `--pagination-disabled-color`        | Disabled text color                    | #6c757d                           |
| (also see Advanced colors below)     |                                        |                                   |
| <br />**FONT VARIABLES:**            |                                        |                                   |
| `--pagination-font-family`           | Font family                            | (see font-family in css)          |
| `--pagination-font-size`             | Font size                              | 1rem                              |
| `--pagination-font-weight`           | Font weight                            | inherit                           |
| `--pagination-line-height`           | Line height                            | 1.5                               |
| `--pagination-active-font-weight`    | Active font weight                     | `--pagination-font-weight`        |
| `--pagination-hover-text-decoration` | Hover text decoration                  | none                              |
| <br />**SPACING / ALIGNMENT:**       |                                        |                                   |
| `--pagination-padding-y`             | Padding y                              | 0.25rem                           |
| `--pagination-padding-x`             | Padding x                              | 0.5rem                            |
| `--pagination-margin-top`            | Margin top                             | 0                                 |
| `--pagination-margin-bottom`         | Margin bottom                          | 0                                 |
| `--pagination-item-margin-x`         | Item margin x                          | 0                                 |
| `--pagination-justify-content`       | Justify content                        | `--pagination-justify-content-fb` |
| <br />**BORDER VARIABLES:**          |                                        |                                   |
| `--pagination-border-radius`         | Border radius                          | 0.2rem                            |
| <br />**ADVANCED COLORS:**           |                                        |                                   |
| `--pagination-active-color`          | Active text color                      | `--pagination-bg`                 |
| `--pagination-active-bg`             | Active background color                | `--pagination-color`              |
| `--pagination-hover-color`           | Hover text color                       | `--pagination-bg`                 |
| `--pagination-hover-bg`              | Hover background color                 | `--pagination-color`              |
| `--pagination-disabled-bg`           | Disabled background color              | `--pagination-bg`                 |
