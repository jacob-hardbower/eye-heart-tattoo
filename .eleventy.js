const yaml = require("js-yaml")
const { DateTime } = require("luxon")
const htmlmin = require("html-minifier")
const MarkdownIt = require("markdown-it")
const mdRender = new MarkdownIt()

module.exports = function (eleventyConfig) {
  // Disable automatic use of your .gitignore
  eleventyConfig.setUseGitIgnore(false)

  eleventyConfig.addFilter("markdownIt", function(rawString) {
    return mdRender.render(rawString)
  })

  // Merge data instead of overriding
  eleventyConfig.setDataDeepMerge(true)

  eleventyConfig.addShortcode("thisYear", function() {
    return DateTime.fromJSDate(new Date(), { zone: "utc" }).toFormat(
      "yyyy"
    )
  })

  // To Support .yaml Extension in _data
  // You may remove this if you can use JSON
  eleventyConfig.addDataExtension("yaml", (contents) =>
    yaml.safeLoad(contents)
  )

  // Copy Static Files to /_Site
  eleventyConfig.addPassthroughCopy({
    "./src/admin/config.yml": "./admin/config.yml"
  })

  eleventyConfig.addFilter("sortedArtists", function(artists) {
    return artists.sort((a,b) => {
      return a.data.order - b.data.order
    })
  });

  // Copy Image Folder to /_site
  eleventyConfig.addPassthroughCopy("./src/static/img")
  eleventyConfig.addPassthroughCopy("./src/static/js")
  eleventyConfig.addPassthroughCopy("./src/static/fonts")
  eleventyConfig.addPassthroughCopy("./src/static/css/flickity.css")

  // Copy favicon to route of /_site
  eleventyConfig.addPassthroughCopy("./src/favicon.ico")

  // Minify HTML
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if (outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      })
      return minified
    }

    return content
  })

  // Let Eleventy transform HTML files as nunjucks
  // So that we can use .html instead of .njk
  return {
    dir: {
      input: "src",
    },
    htmlTemplateEngine: "njk",
  }
}
