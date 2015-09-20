# PostCSS Reverse Media

Reverse media query parameters. Equivalent to a `not` if the native syntax allowed. Useful to avoid media query overlap.

## Latest Version: v0.1.0

### [Changelog](https://github.com/MadLittleMods/postcss-reverse-media/blob/master/CHANGELOG.md)

### Install

`npm install postcss-reverse-media --save-dev`

# Usage

## Basic Example

```js
var postcss = require('postcss');
var mediaReverse = require('postcss-reverse-media');

var fs = require('fs');

var mycss = fs.readFileSync('input.css', 'utf8');

// Process your CSS with postcss-reverse-media
var output = postcss([
        mediaReverse(/*options*/)
    ])
    .process(mycss)
    .css;

console.log(output);
```


# Options

 - `keyword`: string - The media query param reversal operator keyword.
 	 - Default: `'reverse'`
 - `increment`: number - The ammount we increment/decrement by to avoid parameter overlap
 	 - Default: `0.001`



# Testing

`npm test`
