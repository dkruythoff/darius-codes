---
title: "Blog design: Handed Sass handling to 11ty"
summary: I noticed that the previous Sass setup wasn't triggering hot reload on edits. Here's how I fixed it.
date: 2020-09-07
tags:
  - css
  - sass
  - this-blog
---
As I described in [my previous post](/posts/2020-08-23-added-font/), I used a fine [guide by Duncan McDougall](https://www.belter.io/eleventy-sass-workflow/) to help me add Sass to my Eleventy blog.  
His guide, however, focused on including the CSS in documents, and I want to produce a single CSS that is used by all my pages, so I decided to have Sass render my CSS in the output (_site) directory.

Little did I realize that 11ty doesn't monitor edits they default browsersync way.

Enter [Ryan Cao's excellent TailwindCSS find](https://twitter.com/ryancaodev/status/1296242996900290560?s=21) to the rescue!  
I love TailwindCSS, but my goal here is to use plain Sass through the 11ty build system. I just had to tweak the `eleventyConfig.addTransform` to build Sass instead.
```javascript
// /eleventy.js

eleventyConfig.addTransform('sass', async (content, outputPath) => {
    if (outputPath.endsWith('.css')) {
      return await new Promise((resolve, reject) => {
        sass.render(
          { data: content, includePaths: [dirRoot], outputStyle: 'compressed' },
          (error, result) => error ? reject(error) : resolve(result.css)
        )
      })
    }
    return content
  })
```
Docs for `addTransform` can be found [here](https://www.11ty.dev/docs/config/#transforms)


Since 11ty only watches for changes on designated template files, and I put all my SCSS in one place, I could just set an `addWatchTarget` on said place: 
```javascript
// /eleventy.js

eleventyConfig.addWatchTarget(path.join(dirRoot, '_scss'))
```
Docs for `addWatchTarget` can be found [here](https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets)


Now I only need a temple to render the CSS. VS Code didn't react too well to A SCSS file with FrontMatter, so I added a `njk` file that draws in the rest of the SCSS: 
```css
/* /src/_syles.njk */

---
layout: null
permalink: /styles.css
---

@import "_scss/main";
```
There you have it. I can now mess in my `/src/_scss` and 11ty will just pick up the edits and render things. I could even dump the `npm-run-all` dependency, which warms my minimalist heart. 💙

Full commit [here](https://github.com/dkruythoff/darius-codes/commit/ee045c355855975a76c03fdc2a5f51ad903784cf)
