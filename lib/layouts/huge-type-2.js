const typo = require('../typo')
const Rune = require('rune.js')
const svgPathBoundingBox = require('svg-path-bounding-box')

function makeHugeType2Cover ({book, font, boldFont, w, h}) {
  const r = new Rune({
    width: w,
    height: h
  })

  let bgColor = '#b6d6f4'
  // bgColor = '#F5F3E7'
  let textColor = '#333333'

  const debug = false

  // there is no way to clip paths in rune.js so let's crop pattern with 3 quads
  r.rect(0, 0, w, h)
    .stroke(false).fill(bgColor)

  const titleFontSize = h * 0.03
  const title = book.title
  const titleBounds = [
    w * 0.08,
    w * 0.18 + titleFontSize,
    w * 0.32,
    w * 0.4
  ]

  typo.drawTextInRect({
    r,
    font,
    text: title,
    bounds: titleBounds,
    // debug: true,
    fontSize: titleFontSize,
    lineHeight: 1,
    padding: [0, 1, 1, 0]
  })

  const authorFontSize = h * 0.02
  const author = typo.formatAuthorName(book.author)
  const authorBounds = [
    w * 0.08,
    h - w * 0.08 - w * 0.2,
    w * 0.2,
    w * 0.2
  ]

  typo.drawTextInRect({
    r,
    font,
    text: [author.name, author.surname],
    bounds: authorBounds,
    // debug: true,
    fontSize: authorFontSize,
    lineHeight: 1,
    padding: [0, 0, 0, 0],
    textColor: textColor,
    verticalAlign: 'bottom'
  })

  const initials = []
  initials[0] = author.name.charAt(0)
  initials[1] = author.surname.charAt(0)

  const hugeWidth = w * 1.33
  const hugeHeight = h * 1.33
  r.rect(0, 0, hugeWidth, hugeHeight)
    .fill(false)
    .stroke(255, 0, 0)

  const hugeFontSize = hugeHeight * 1.4
  const shift = 0.25 * w

  var goldenWidth = Math.round(w / 1.61803398875)
  var secondLetter = r.group(w * 0.0833, h * 0.67)
  var secondLetterBBox = boldFont.getPath(initials[1], 0, 0, hugeFontSize).getBoundingBox()
  r.text(initials[1], -secondLetterBBox.x1 + shift, -secondLetterBBox.y1)
    .fontFamily('OpenSansExtraBold')
    // .fontFamily('CousineBold')
    .fontSize(hugeFontSize)
    .stroke(false)
    .fill('#F41099')
    .rotate(-60)
    .addTo(secondLetter)

  if (debug) {
    r.rect(
      shift,
      0,
      secondLetterBBox.x2 - secondLetterBBox.x1,
      secondLetterBBox.y2 - secondLetterBBox.y1
    ).fill(false).stroke(0)
      .rotate(-45)
      .addTo(secondLetter)
  }

  var firstLetter = r.group(w * 0.0833, h * 0.67)
  var firstLetterBBox = boldFont.getPath(initials[0], 0, 0, hugeFontSize).getBoundingBox()
  // r.text(initials[0], -(firstLetterBBox.x2 - firstLetterBBox.x1) / 2 + shift, -firstLetterBBox.y1)
  r.text(initials[0], -firstLetterBBox.x1 + shift, -firstLetterBBox.y1)
    .fontFamily('OpenSansExtraBold')
    // .fontFamily('CousineBold')
    .fontSize(hugeFontSize)
    .stroke(false)
    .fill('#319dff')
    .rotate(-45)
    .addTo(firstLetter)

  if (debug) {
    r.rect(
      shift,
      0,
      firstLetterBBox.x2 - firstLetterBBox.x1,
      firstLetterBBox.y2 - firstLetterBBox.y1
    ).fill(false).stroke(0)
      .rotate(-45)
      .addTo(firstLetter)
  }


  r.draw()

  // const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter')
  // const blend = document.createElementNS('http://www.w3.org/2000/svg', 'feBlend')
  // filter.appendChild(blend)
  // blend.setAttribute('mode', 'multiply')
  // blend.setAttribute('in', 'BackgroundImage')
  // blend.setAttribute('in2', 'SourceGraphic')
  // filter.setAttribute('id', 'blend')
  // r.el.childNodes[r.el.childNodes.length - 1].childNodes[0].setAttribute('filter', 'url(#blend)')
  // r.el.childNodes[r.el.childNodes.length - 1].childNodes[0].setAttribute('mix-blend-mode', 'multiply')
  // r.el.childNodes[r.el.childNodes.length - 1].setAttribute('mix-blend-mode', 'multiply')
  r.el.childNodes[r.el.childNodes.length - 1].style.mixBlendMode = 'multiply'
  // r.el.appendChild(filter)

  return r.el
}

module.exports = makeHugeType2Cover
