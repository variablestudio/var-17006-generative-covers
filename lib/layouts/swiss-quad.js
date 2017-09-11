const typo = require('../typo')
const Rune = require('rune.js')
const random = require('pex-random')
const patterns = require('../patterns')

function paperAging (year) {
  // 1950 - 230/200/150
  // 25/55/95

  var currentTime = new Date()
  var currentYear = currentTime.getFullYear()

  var range = currentYear - 1950
  var timepos = currentYear - year

  var r = 235 - Math.round(timepos / range * 5)
  var g = 245 - Math.round(timepos / range * 15)
  var b = 250 - Math.round(timepos / range * 10)

  return [r, g, b]
}

function makeSwissQuadCover ({book, fonts, w, h}) {
  const r = new Rune({
    width: w,
    height: h
  })

  const leakBgColor = false // optional

  const paperColor = paperAging(book.year)

  const pattern = random.element(patterns.all)

  const patternGroup = r.group(w / 3, (h - w / 3 * 2) / 2)
  const patternBg = pattern({ book, r, w: w / 3 * 2, h: w / 3 * 2 })
    .addTo(patternGroup)

  let bgColor = new Rune.Color(paperColor[0], paperColor[1], paperColor[2])
  let textColor = '#333333'

  if (leakBgColor) {
    bgColor = patternBg.children[0].state.fill
    textColor = '#FFFFFF'
  }

  // there is no way to clip paths in rune.js so let's crop pattern with 3 quads
  r.rect(0, 0, w / 3, h)
    .stroke(false).fill(bgColor)

  r.rect(w / 3, 0, w / 3 * 2, (h - w / 3 * 2) / 2)
    .stroke(false).fill(bgColor)

  r.rect(w / 3, (h - w / 3 * 2) / 2 + w / 3 * 2, w / 3 * 2, (h - w / 3 * 2) / 2)
    .stroke(false).fill(bgColor)

  const squareSize = w / 3 * 2
  const verticalGap = (h - squareSize) / 2

  const authorFontSize = h * 0.035
  const author = typo.formatAuthorName(book.author)
  const authorBounds = [
    0,
    0,
    w - squareSize,
    verticalGap
  ]

  typo.drawTextInRect({
    r,
    font,
    text: [author.name, author.surname],
    bounds: authorBounds,
    // debug: true,
    fontSize: authorFontSize,
    lineHeight: 1,
    padding: [0.75, 0, 1, 2],
    textAlign: 'right',
    verticalAlign: 'middle',
    textColor: textColor
  })

  const titleFontSize = h * 0.06
  const title = book.title.toUpperCase()
  const titleBounds = [
    w / 3,
    verticalGap + squareSize + h * 0.02,
    squareSize,
    verticalGap
  ]

  typo.drawTextInRect({
    r,
    font,
    text: title,
    bounds: titleBounds,
    // debug: true,
    fontSize: titleFontSize,
    lineHeight: 1,
    padding: [0, 2, 2, 0]
  })

  r.draw()
  return r.el
}

module.exports = makeSwissQuadCover
