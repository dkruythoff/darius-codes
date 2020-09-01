const pluginRss = require("@11ty/eleventy-plugin-rss")
const sass = require('sass')
const path = require('path')

const dirRoot = path.join(__dirname, 'src')

module.exports = function (eleventyConfig) {

  eleventyConfig.addTransform('sass', async (content, outputPath) => {
    if (outputPath.endsWith('.css')) {
      return await new Promise((resolve, reject) => {
        sass.render(
          { data: content, includePaths: [dirRoot] },
          (error, result) => error ? reject(error) : resolve(result.css)
        )
      })
    }
    return content
  })
  eleventyConfig.addWatchTarget(path.join(dirRoot, '_scss'))


  eleventyConfig.addPassthroughCopy({ "static/fonts": "fonts" })
  eleventyConfig.addPlugin(pluginRss)
  eleventyConfig.setDataDeepMerge(true)

  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes'
    }
  }
}
