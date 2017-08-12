const Rune = require('rune.js')
const opentype = require('opentype.js')
const fonts = require('./fonts.js')
const random = require('pex-random')
const books = require('./data/books.json')

const rule2 = require('./lib/patterns/rule2')
const waveCircles = require('./lib/patterns/wave-circles')
const grids = require('./lib/patterns/grids')

random.seed(0)

const canvasContainer = document.createElement('div')
canvasContainer.id = 'canvasContainer'
document.body.appendChild(canvasContainer)

const coversContainer = document.createElement('div')
coversContainer.id = 'covers'
document.body.appendChild(coversContainer)

const typo = require('./lib/typography')

const W = 600
const H = 800

function measureText (font, str, opts) {
  if (Object.prototype.toString.call(str) === '[object Array]') {
    return measureTextLines(font, str, opts)
  }

  return {
    x: 0,
    y: -font.ascender / font.unitsPerEm * opts.fontSize,
    width: font.getAdvanceWidth(str, opts.fontSize, opts),
    height: (font.ascender + -font.descender) / font.unitsPerEm * opts.fontSize
  }
}

function measureTextLines (font, str, opts) {
  var lines = str

  var maxWidth = 0
  lines.forEach(function (line) {
    var lineWidth = measureText(font, line, opts).width
    maxWidth = Math.max(maxWidth, lineWidth)
  })

  var height = lines.length * (font.ascender + -font.descender) / font.unitsPerEm * opts.fontSize

  return {
    x: 0,
    y: -font.ascender / font.unitsPerEm * opts.fontSize,
    width: maxWidth,
    height: height
  }
}

function breakLines (font, str, maxWidth, opts) {
  var words = str.split(' ')
  var lines = []
  var currentLine = ''
  while (words.length > 0) {
    var word = words.shift()
    var newLine = currentLine
    if (newLine.length > 0) newLine += ' '
    newLine += word
    var measurements = measureText(font, newLine, opts)
    if (measurements.width > maxWidth && currentLine.length > 0) {
      lines.push(currentLine)
      currentLine = word
    } else {
      currentLine = newLine
    }
  }
  lines.push(currentLine)
  return lines
}

function makeCover (book, font) {
  console.log('makeCover')
  const r = new Rune({
    width: W,
    height: H
  })

  var margins = 0
  var paleYellow = '#FFFFFF'

  // rule2(r, W, H, book)
  // waveCircles(r, W, H, book)
  grids(r, W, H, book)

  /*
  var minPageCount = 10
  var maxPageCount = 500

  var borderScale = 1 + Math.random()
  var hue = Math.random() * 360
    // var numX = 2 + Math.floor(Math.random() * 10);
  var numX = utils.remap(book.pageCount, minPageCount, maxPageCount, 2, 17, true)
  // numX = 5
  var radius = (0.2 + 0.5 * Math.random())
  // radius = 1
  var radius2 = (0.1 + 0.4 * Math.random())
  // radius2 = 0.5
  var counterLines = (Math.random() > 0.5) ? 0.1 : 0

  var niceBlue = '#27D1E7'
  var colorHSL = chroma.hex(niceBlue).hsl()
  var color = chroma.hsl(hue, 0.7, colorHSL[2] * 1.1).hex()
  var lightColor = chroma.hsl(hue, 0.3, colorHSL[2] * 1.8).hex()

  // bg
  r.rect(0, 0, W, H).stroke(false).fill(color)

  var stepX = r.width / (numX + 1)
  var stepY = stepX
  var r1 = stepX * radius
  var r2 = stepX * radius2 * 0.25

  console.log(stepX, r1, r2)
  // crayon.fill(lightColor).stroke(false)

  for (var x = 0; x <= r.width + stepX / 2; x += stepX) {
    for (var y = 0; y <= r.height + stepY / 2; y += stepY) {
      // break
      var leftOrRight = Math.floor(Math.random() * 2)
      // crayon.save()
      // crayon.translate(x, y)
      // crayon.scale(borderScale, borderScale)
      let g = r.group(x, y)
      if (leftOrRight) {
        r.rect(-r1, -r2, r1 * 2, r2 * 2)
          .rotate(-45)
          .stroke(false)
          .fill(lightColor)
          .addTo(g)
        r.rect(-r1, -r2 * counterLines, r1 * 2, r2 * 2 * counterLines)
          .rotate(45)
          .stroke(false)
          .fill(lightColor)
          .addTo(g)
      }
      if (!leftOrRight) {
        r.rect(-r1, -r2 * counterLines, r1 * 2, r2 * 2 * counterLines)
          .rotate(-45)
          .stroke(false)
          .fill(lightColor)
          .addTo(g)
        r.rect(-r1, -r2, r1 * 2, r2 * 2)
          .rotate(45)
          .stroke(false)
          .fill(lightColor)
          .addTo(g)
        // crayon.rect(-r, -r2 * counterLines, r * 2, r2 * 2 * counterLines)
        // .rotate(90).rect(-r, -r2, r * 2, r2 * 2)
      }
      g.scale(borderScale)
      // crayon.restore()
    }
  }
  */

  var author = typo.formatAuthorName(book.author)

  var authorFontSize = r.height * 0.03
  var titleFontSize = r.height * 0.05

  var shiftY = r.height * 1 / 3 // 50

  var titleX = r.width * 0.08
  var titleY = r.width * 0.08
  var titleWidth = r.width * 0.8

  // crayon.style('title').font('Arial', titleFontSize, 'bold').paragraph('left', 0.25).fill('#333333')

  var titleLines = breakLines(font, book.title, titleWidth, { fontSize: titleFontSize })
  var titleMeasurements = measureText(font, titleLines, { fontSize: titleFontSize })
  var titleAscent = -titleMeasurements.y
  console.log('titleMeasurements', titleMeasurements)

  titleY += titleAscent

  titleY += shiftY

  // crayon.style('author').font('Gill Sans', authorFontSize).fill('#333333')
  var authorMeasurements = measureText(font, author.name + ' ' + author.surname, { fontSize: authorFontSize })

  var gapHeight = 40
  r.rect(margins, margins + shiftY, r.width - 2 * margins, titleY + titleMeasurements.height + authorMeasurements.height + titleAscent / 2 - shiftY + gapHeight)
    .fill(paleYellow)
    .stroke(false)
  r.rect(margins + titleX, titleY + titleMeasurements.height - 10, r.width - 2 * margins - titleX - titleX, 2)
    .fill('#333333')
    .stroke(false)

  // r.rect(titleX, titleY - titleAscent, titleWidth, titleMeasurements.height)
    // .fill(false)
    // .stroke('#FF0000')

  // crayon.style('title').text(titleLines, titleX, titleY)
  const lineHeight = titleFontSize * (font.ascender + -font.descender) / font.unitsPerEm
  titleLines.forEach((line, i) => {
    r.text(line, titleX, titleY + lineHeight * i)
      .fill('#000000')
      .fontSize(titleFontSize)
      .fontFamily('PTSans')
  })

  r.text(author.name + ' ' + author.surname, titleX, titleY + titleMeasurements.height + gapHeight)
    .fill('#333333')
    .fontSize(authorFontSize)
    .fontFamily('PTSans')
  r.draw()
  return r.el
}

var shortestTitle = books.sort((a, b) => {
  return a.title.length - b.title.length
})[0]

var longestTitle = books.sort((a, b) => {
  return -(a.title.length - b.title.length)
})[0]

var shortestAuthor = books.sort((a, b) => {
  return a.author.length - b.author.length
})[0]

var longestAuthor = books.sort((a, b) => {
  return -(a.author.length - b.author.length)
})[0]

var fewestPages = books.sort((a, b) => {
  return a.pageCount - b.pageCount
})[0]

var mostPages = books.sort((a, b) => {
  return -(a.pageCount - b.pageCount)
})[0]

var selectedBooks = [
  shortestTitle, longestTitle,
  shortestAuthor, longestAuthor,
  fewestPages, mostPages
].concat(books.reverse())

fonts.load(() => {
  opentype.load('fonts/ptsans/pt_sans-web-regular-webfont.ttf', function (err, font) {
    if (err) console.log(err)
    for (let i = 0; i < 26; i++) {
      const book = selectedBooks[i % selectedBooks.length]
      const cover = makeCover(book, font)
      cover.setAttribute('viewBox', `0 0 ${W} ${H}`)
      coversContainer.appendChild(cover)
    }
  })
})
