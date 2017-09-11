const typo = require('../typo')
const Rune = require('rune.js')
const random = require('pex-random')
const patterns = require('../patterns')

function makeRightLabelCover ({book, fonts, w, h}) {
  const r = new Rune({
    width: w,
    height: h
  })

  const pattern = random.element(patterns.all)

  const patternGroup = r.group(0, 0)
  pattern({ book, r, w, h })
    .addTo(patternGroup)

  let bgColor = '#f5f4ea'
  let textColor = '#333333'

  // there is no way to clip paths in rune.js so let's crop pattern with 3 quads
  r.rect(w * 0.6, 0, w * 0.4, h)
    .stroke(false).fill(bgColor)

  const titleFontSize = h * 0.06
  const title = book.title
  const titleBounds = [
    w * 0.65,
    w * 0.1,
    w * 0.35,
    w * 0.55
  ]

  const titleTextInfo = typo.drawTextInRect({
    r,
    font,
    text: title,
    bounds: titleBounds,
    // debug: true,
    fontSize: titleFontSize,
    lineHeight: 1,
    padding: [0, 1, 1, 0]
  })

  const authorFontSize = Math.min(h * 0.03, titleTextInfo.fontSize * 0.8)
  const author = typo.formatAuthorName(book.author)
  const authorBounds = [
    w * 0.65,
    titleTextInfo.textBounds[1] + titleTextInfo.textBounds[3],
    w * 0.35,
    w * 0.4
  ]

  typo.drawTextInRect({
    r,
    font,
    text: [author.name, author.surname],
    bounds: authorBounds,
    // debug: true,
    fontSize: authorFontSize,
    lineHeight: 1,
    padding: [1.5, 1, 1, 0],
    textColor: textColor
  })

  r.draw()
  return r.el
}

module.exports = makeRightLabelCover
