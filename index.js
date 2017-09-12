const opentype = require('opentype.js')
const layouts = require('./lib/layouts')
const program = require('commander')
const path = require('path')
const fs = require('fs')

const isCommandLine = (require.main === module)

const w = 600
const h = 800

function makeCover (data) {
  // TODO: load list of all fonts here
  opentype.load('fonts/ptsans/pt_sans-web-regular-webfont.ttf', function (err, font) {
    if (err) console.log(err)
    opentype.load('fonts/opensansextra/opensans-extrabold-webfont.ttf', function (err, boldFont) {
      if (err) console.log(err)
      const fonts = {
        PTSans: font,
        OpenSansExtraBold: boldFont
      }
      const book = {
        title: data.title || 'A book about generative design',
        author: data.author || 'Jan Kowalski',
        year: data.year || (new Date()).getFullYear() - ((Math.random() * 40) | 0),
        pageCount: data.pageCount || data.pages || 100,
        sectionCount: data.sectionCount || data.sections || 3
      }
      const cover = layouts.bar({ book, fonts, w, h })

      // enable correct scaling
      cover.setAttribute('viewBox', `0 0 ${w} ${h}`)

      const coverStr = cover.toString()

      if (data.outfile) {
        const outfile = path.resolve(__dirname, data.outfile)
        fs.writeFileSync(outfile, coverStr)
      } else if (isCommandLine) {
        console.log(coverStr)
      }

      return cover
    })
  })
}

// running in the console
if (isCommandLine) {
  program
  .version(require('./package.json').version)
  .option('-t, --title [title]', 'Book Title')
  .option('-a, --author [author]', 'Author name')
  .option('-p, --pages [pages]', 'Number of pages in the book')
  .option('-s, --sections [sections]', 'Number of sections in the book')
  .option('-y, --year [year]', 'Publication year')
  .option('-f, --file [file]', 'Input json file')
  .option('-o, --outfile [outfile]', 'Output svg file')
  .parse(process.argv)
  makeCover(program)
}

module.exports = makeCover
