const chroma = require('chroma-js')

module.exports = function rule2 ({ book, r, w, h }) {
  var minPageCount = 10
  var maxPageCount = 500

  var borderScale = 1 + Math.random()
  var hue = Math.random() * 360
  var numX = r.map(book.pageCount, minPageCount, maxPageCount, 2, 17, true)
  var radius = (0.2 + 0.5 * Math.random())
  var radius2 = (0.1 + 0.4 * Math.random())
  var counterLines = (Math.random() > 0.5) ? 0.1 : 0

  const niceBlue = '#27D1E7'
  const colorHSL = chroma.hex(niceBlue).hsl()
  const color = chroma.hsl(hue, 0.7, colorHSL[2] * 1.1).hex()
  const lightColor = chroma.hsl(hue, 0.3, colorHSL[2] * 1.8).hex()

  const group = r.group()

  // bg
  r.rect(0, 0, w, h)
    .stroke(false).fill(color)
    .addTo(group)

  const stepX = w / (numX + 1)
  const stepY = stepX
  const r1 = stepX * radius
  const r2 = stepX * radius2 * 0.25

  for (let x = 0; x <= w + stepX / 2; x += stepX) {
    for (let y = 0; y <= h + stepY / 2; y += stepY) {
      const leftOrRight = Math.floor(Math.random() * 2)
      const g = r.group(x, y).addTo(group)
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
      }
      g.scale(borderScale)
    }
  }

  return group
}
