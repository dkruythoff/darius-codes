module.exports = {
  tags: 'posts',
  eleventyComputed: {
    eleventyTags: {
      arr: data => data.tags.filter(t => t !== 'posts')
    }
  }
}
