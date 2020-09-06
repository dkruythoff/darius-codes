---
title: Blog design: Handed Sass handling to 11ty
summary: I noticed that the previous Sass setup wasn't triggering hot reload on edits. Here's how I fixed it.
tags:
  - css
  - sass
  - this-blog
---
As I described in [my previous post](https://darius.codes/posts/2020-08-23-added-font/), I used a fine [guide by Duncan McDougall](https://www.belter.io/eleventy-sass-workflow/) to help me add Sass to my Eleventy blog.  
His guide, however, focused on including the CSS in documents, and I want to produce a single CSS that is used by all my pages, so I decided to have Sass render my CSS in the output (_site) directory.

Little did I realize that 11ty doesn't monitor edits they default browsersync way.

Enter [Ryan Cao's excellent TailwindCSS find](https://twitter.com/ryancaodev/status/1296242996900290560?s=21) to the rescue!  
