jquery-maxlengthcountdown
=========================

Gives users a visual warning about `maxlength`s on form input elements. As seen on [LunchTable](https://www.lunch-table.com/).

## Download

[Production (minified)](https://raw.github.com/LunchTable/jquery-maxlengthcountdown/master/jquery.maxlengthCountdown.min.js)
[Development](https://raw.github.com/LunchTable/jquery-maxlengthcountdown/master/jquery.maxlengthCountdown.js)

## Options

Property           | Type    | Default         | Description
---                | ---     | ---             | ----
countsClass        | String  | "count-me-down" | Class name of the dynamically created counter, for CSS and stuff.
suffixText         | String  | (empty)         | Default text to display after number remaining, optionally in plural form. E.g. 'left' or 'characters left'
suffixTextSingular | String  | (empty)         | Singular form of `suffixText`, if any. E.g. 'character left'
before             | Boolean | true            | Indicates if counter will be placed before input element in the DOM.
visible            | Boolean | true            | Indicates if counter is always visible, starting from plugin initialization.
alwaysOn           | Boolean | true            | If `visible` is _false_, this boolean indicates if counter remains visible after unfocusing from input element.
showThres          | Integer | 0               | If `visible` is _false_, this indicates the number of **characters remaining** at which to show the counter. If `alwaysOn` is true, the counter will stay visible once the threshold is passed.
