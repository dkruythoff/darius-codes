---
title: Added a font & set up Sass while at it
summary: Since I dedicated myself to logging how I'm setting up this blog, here's how I proceeded to pick and install a font.
tags:
  - css
  - fonts
  - this-blog
---

## Picking the font
As I tackle designing things in the browser (I love to skip any steps that don't seem convincingly essential), one big headache for me is picking a font. 
Luckily, I found the following resources to pick or test fonts:

### Fonts in use
[Fonts in use](https://fontsinuse.com) looks cool, but I want to spend little time here and this looks more like design research. Skipping this for now.

### FontPair
[FontPair](https://fontpair.co) is great for picking pairs that click together. It's divided in combinations of Serif, Sans-Serif, Display, and Monospace. They also have a Featured pairs section for easy picking.

### Fontjoy
[FontJoy](https://fontjoy.com) is a joy. It's great when you have something in mind, and want to either test how it looks, or test pairings with it. It displays a heading, a subheading, and body text, and you can set the font for each one. It also offers pairing recommendations for the chosen font, and it can toggle light or dark mode. I ended up using this one to test any font I liked.

## Applying the font
So, how do I apply the font I choose to my blog?  

### Hosting the font
Many might scream the following: 
```html
<link href="https://fonts.googleapis.com/css2?family=MyFavFont:wght@100;400;600&display=swap" rel="stylesheet"> 
```
I am, however, building this blog by hand for several reasons. One being that I don't like giving away metrics on my sites without my explicit consent. I don't know what Google measures when I embed their fonts, so there.  
Another reason is that I like things to be minimal and simple. A dependency for something as simple as a font won't help there. 
Luckily, more people feel the same about this, so I ended up using [google-webfonts-helper](https://google-webfonts-helper.herokuapp.com/fonts) to download and self-host what I need.  

A more in-depth explainer on this matter can be found here: [How to Self-Host Google Fonts on Your Own Server](https://idevie.com/tutorials/how-to-self-host-google-fonts-on-your-own-server)

### Displaying the font
So, having my font files ready, I'll need to use some CSS to apply the font to my pages. I could use plain CSS, but I like to use SCSS features to at least nest [BEM](https://en.bem.info/) classnames and package things with `@import`.  
I've found plenty of resources to build SASS in my eleventy project, but none seemed so light and lean as [Duncan's gem of a guide](https://www.belter.io/eleventy-sass-workflow/).  
I did deviate from the guide in one ascpect: I'm rendering the CSS directly into the `_site` directory, since I want to share my CSS over all pages. 

## Conclusion
So, I got me a font. It's usually the hardest thing for me to pick, so I decided to pick one up front and build the rest of the UI around it.  
You might have noticed that I decided on [Palaquin](https://fonts.google.com/specimen/Palanquin). I like how it's both serious and elegant. It doesn't come with an italig style, but luckily [browsers manage to simulate this](https://developer.mozilla.org/en-US/docs/Web/CSS/font-style).
