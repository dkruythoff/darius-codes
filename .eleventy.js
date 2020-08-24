const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy({ "static/fonts": "fonts" });
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.setUseGitIgnore(false);

  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes'
    }
  }
}
