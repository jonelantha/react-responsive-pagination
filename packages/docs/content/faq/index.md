---
title: 'Frequently asked questions'
description: 'react-responsive-pagination frequently asked questions'
---

# Frequently Asked Questions

## About Auto Sizing

Auto sizing uses the width of the immediate parent element. For best results make sure the parent element isn't intrinsically sized; that means the width of the parent element shouldn't depend on its contents. If your layout is intrinsic then the pagination component should still fill the space correctly but you may occasionally see inconsistant results or additional renders.

You can choose to override the auto sizing by specifying the `maxWidth` prop (see [Props](https://www.npmjs.com/package/react-responsive-pagination#props) section).

## Very Narrow Widths

For very narrow widths the component may exceed the available space - this is to ensure that there's always a usable pagination component.
