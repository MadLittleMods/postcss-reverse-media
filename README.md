[![npm version](https://badge.fury.io/js/postcss-reverse-media.svg)](http://badge.fury.io/js/postcss-reverse-media) [![Build Status](https://travis-ci.org/MadLittleMods/postcss-reverse-media.svg)](https://travis-ci.org/MadLittleMods/postcss-reverse-media)

# PostCSS Reverse Media

[PostCSS](https://github.com/postcss/postcss) plugin to reverse media query parameters. Equivalent to a `not` if the native syntax allowed. Useful to avoid media query overlap.

## Wait, I thought media queries had `not` and logic already?

Unfortunately the `not all` trick doesn't work when you want to chain(`and`) another parameter.

 - This works to reverse/invert/not the media query parameter:
 	 - `@media not all and (max-width: 250px)`
 - When you want to chain, this doesn't work:
 	 - `@media (max-width: 500px) and not all and (max-width: 250px)`

I created this plugin so that this kind of thing is easy to do. I prefer to to use the `reverse` keyword(to avoid confusion and collision in the future) but feel free to [change it to `not` in the options](#options).

 - With `postcss-reverse-media`:
 	 -`@media (max-width: 500px) and reverse (max-width: 250px)`

More info about media query logic in this article, [*Logic in Media Queries* on CSS-Tricks](https://css-tricks.com/logic-in-media-queries/)


## Latest Version: v0.1.2

### [Changelog](https://github.com/MadLittleMods/postcss-reverse-media/blob/master/CHANGELOG.md)

### Install

`npm install postcss-reverse-media --save-dev`

# Usage

## Basic Example

```js
var postcss = require('postcss');
var reverseMedia = require('postcss-reverse-media');

var fs = require('fs');

var mycss = fs.readFileSync('input.css', 'utf8');

// Process your CSS with postcss-reverse-media
var output = postcss([
        reverseMedia(/*options*/)
    ])
    .process(mycss)
    .css;

console.log(output);
```

Input:
```css
@media reverse (max-width: 150px) { /*...*/ }

@media reverse (min-width: 150px) { /*...*/ }
```

Output:
```css
@media (min-width: 150.001px) { /*...*/ }

@media (max-width: 149.999px) { /*...*/ }
```

## Chaining parameters with logic

Input:
```css
@media (max-width: 300px) and reverse (max-width: 150px) { /*...*/ }

@media (min-width: 50px) and reverse (min-width: 150px) { /*...*/ }
```

Output:
```css
@media (max-width: 300px) and (min-width: 150.001px) { /*...*/ }

@media (min-width: 50px) and (max-width: 149.999px) { /*...*/ }
```

## Use with other plugins that modify `@media`

Put `postcss-reverse-media` after other plugins that modify `@media` rules. This is to have all of the substitutions and transformations complete before we look for the `reverse` qualifier keyword and do our transformations.

```js
var customMedia = require('postcss-custom-media');
var minmax = require('postcss-media-minmax');
var reverseMedia = require('postcss-reverse-media');

var pluginStack = [
	customMedia(),
	minmax(),
	reverseMedia()
];
```

```css
@custom-media --small-viewport (max-width: 150px);

@media reverse (--small-viewport) { /*...*/ }
```




# Options

 - `keyword`: string - The media query param reversal operator keyword.
 	 - Default: `'reverse'`
 - `increment`: number - The ammount we increment/decrement by to avoid parameter overlap
 	 - Default: `0.001`



# Testing

`npm test`
