const typo = require('../typo')
const Rune = require('rune.js')
const random = require('pex-random')
const patterns = require('../patterns')

function makeBarCover ({book, font, w, h}) {
  const r = new Rune({
    width: w,
    height: h
  })

  var margins = 0
  var paleYellow = '#FFFFFF'

  // rule2(r, W, H, book)
  // waveCircles(r, W, H, book)
  // grids(r, W, H, book)
  // mapper(r, W, H, book)
  const pattern = random.element(patterns.all)
  pattern({ book, r, w, h })

  const author = typo.formatAuthorName(book.author)

  const authorFontSize = h * 0.03
  const titleFontSize = h * 0.05

  const shiftY = h * 1 / 3 // 50
  // if (random.float() < 0.3) shiftY = 0

  const titleX = w * 0.08
  let titleY = w * 0.08
  const titleWidth = w * 0.8
  const gapHeight = 40

  const titleOpts = { fontSize: titleFontSize }
  const titleLines = typo.breakLines(font, book.title, titleWidth, titleOpts)
  const titleMeasurements = typo.measureText(font, titleLines, titleOpts)
  const titleAscent = -titleMeasurements.y
  const authorOpts = { fontSize: authorFontSize }
  const authorMeasurements = typo.measureText(font, author.name + ' ' + author.surname, authorOpts)

  // shiftY = 0
  // shiftY = titleY + titleMeasurements.height + authorMeasurements.height + titleAscent / 2 - shiftY + gapHeight
  // shiftY = H - shiftY - gapHeight

  titleY += titleAscent

  titleY += shiftY

  r.rect(margins, margins + shiftY, w - 2 * margins, titleY + titleMeasurements.height + authorMeasurements.height + titleAscent / 2 - shiftY + gapHeight)
    .fill(paleYellow)
    .stroke(false)
  r.rect(margins + titleX, titleY + titleMeasurements.height - 10, w - 2 * margins - titleX - titleX, 2)
    .fill('#333333')
    .stroke(false)

  const lineHeight = titleFontSize * (font.ascender + -font.descender) / font.unitsPerEm
  titleLines.forEach((line, i) => {
    r.text(line, titleX, titleY + lineHeight * i)
      .fill('#333333')
      .stroke(false)
      .fontSize(titleFontSize)
      .fontFamily('PTSans')
  })

  r.text(author.name + ' ' + author.surname, titleX, titleY + titleMeasurements.height + gapHeight)
    .fill('#333333')
    .stroke(false)
    .fontSize(authorFontSize)
    .fontFamily('PTSans')

  r.draw()
  return r.el
}

module.exports = makeBarCover
