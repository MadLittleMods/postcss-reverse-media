# PostCSS Reverse Media

Reverse media query parameters. Equivalent to a `not` if the native syntax allowed. Useful to avoid media query overlap.

## Wait I thought media queries had `not` and logic?

Unfortunately the `not all` trick doesn't work when you want to `and` chain another parameter.

This works to reverse/invert/not the media query parameter: `@media not all and (max-width: 250px)`
When you want to chain, this doesn't work: `@media (max-width: 500px) and not all and (max-width: 250px)`

So I created this plugin so that this kind of thing is easy to do. I prefer to to use `reverse` keyword but feel free to [change it to `not` in the options](#options)

With `postcss-reverse-media`: `@media (max-width: 500px) and reverse (max-width: 250px)`

More info about media query logic in this article, [*Logic in Media Queries* on CSS-Tricks](https://css-tricks.com/logic-in-media-queries/)


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

## Great for chaining parameters with logic

```css
@media (max-width: 300px) and reverse (max-width: 150px) { /*...*/ }

@media (min-width: 50px) and reverse (min-width: 150px) { /*...*/ }
```

```css
@media (max-width: 300px) and (min-width: 150.001px) { /*...*/ }

@media (min-width: 50px) and (max-width: 149.999px) { /*...*/ }
```




# Options

 - `keyword`: string - The media query param reversal operator keyword.
 	 - Default: `'reverse'`
 - `increment`: number - The ammount we increment/decrement by to avoid parameter overlap
 	 - Default: `0.001`



# Testing

`npm test`
