const typo = require('../typo')
const Rune = require('rune.js')
const svgPathBoundingBox = require('svg-path-bounding-box')

function makeHugeType2Cover ({book, font, boldFont, w, h}) {
  const r = new Rune({
    width: w,
    height: h
  })

  let bgColor = '#b6d6f4'
  let textColor = '#333333'

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

  const hugeFontSize = hugeHeight * 1.4 * 0.25
  var firstLetter = r.group(200, 500) // w * 0.0833, h * 0.67)
  var pathData = boldFont.getPath(initials[0], 0, 0, hugeFontSize).toPathData()
  var firstLetterBBox = svgPathBoundingBox(pathData)
  var firstLetterBBox2 = boldFont.getPath(initials[0], 0, 0, hugeFontSize).getBoundingBox()
  // r.text(initials[0], -firstLetterBBox.x1, -firstLetterBBox.y1)
  r.text(initials[0], 0, 0)
    // .fontFamily('OpenSansExtraBold')
    .fontFamily('OpenSansExtraBold')
    // .fontFamily('PTSerifBold')
    .fontSize(hugeFontSize)
    // .fontFamily('PTSans')
    .stroke(false)
    // .fill('#319dff')
    .fill('#F41099')
    // .rotate(-45)
    .addTo(firstLetter)

  var canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  canvas.style.width = (240) + 'px'
  canvas.style.height = (320) + 'px'
  canvas.style.float = 'left'
  var ctx = canvas.getContext('2d')
  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(0, 0, w, h)
  // boldFont.draw(ctx, initials[0], -firstLetterBBox.x1, -firstLetterBBox.y1, hugeFontSize)
  boldFont.draw(ctx, initials[0], 200, 500, hugeFontSize)
  boldFont.drawPoints(ctx, initials[0], 200, 500, hugeFontSize)
  ctx.strokeStyle = '#FF0000'
  ctx.strokeRect(
    firstLetterBBox.minX + 200,
    firstLetterBBox.minY + 500,
    firstLetterBBox.width,
    firstLetterBBox.height
    // firstLetterBBox.x1 + 200,
    // firstLetterBBox.y1 + 500,
    // firstLetterBBox.x2 - firstLetterBBox.x1,
    // // boldFont.getAdvanceWidth(initials[0], hugeFontSize),
    // firstLetterBBox.y2 - firstLetterBBox.y1
  )
  ctx.strokeStyle = '#FF7700'
  ctx.strokeRect(
    firstLetterBBox2.x1 + 200 + 5,
    firstLetterBBox2.y1 + 500 + 5,
    firstLetterBBox2.x2 - firstLetterBBox2.x1,
    firstLetterBBox2.y2 - firstLetterBBox2.y1
    // firstLetterBBox.x1 + 200,
    // firstLetterBBox.y1 + 500,
    // firstLetterBBox.x2 - firstLetterBBox.x1,
    // // boldFont.getAdvanceWidth(initials[0], hugeFontSize),
    // firstLetterBBox.y2 - firstLetterBBox.y1
  )
  document.querySelector('#covers').appendChild(canvas)
  r.rect(
    firstLetterBBox.x1,
    firstLetterBBox.y1,
    firstLetterBBox.x2 - firstLetterBBox.x1,
    firstLetterBBox.y2 - firstLetterBBox.y1
  ).fill(false).stroke(0)
  .addTo(firstLetter)

  r.draw()

  var pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  pathEl.setAttribute('d', pathData)
  pathEl.setAttribute('stroke', '#000000')
  pathEl.setAttribute('stroke-width', 5)
  pathEl.setAttribute('fill', 'transparent')
  pathEl.setAttribute('transform', 'translate(200 500)')
  r.el.appendChild(pathEl)
  return r.el
}

module.exports = makeHugeType2Cover
