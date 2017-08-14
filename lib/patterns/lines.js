const chroma = require('chroma-js')

module.exports = function rule2 ({ book, r, w, h }) {
  const group = r.group()

  var niceBlue = '#27D1E7'
  var colorHSL = chroma.hex(niceBlue).hsl()
  var hue = Math.random() * 360
  niceBlue = chroma.hsl(hue, 0.68, colorHSL[2]).hex()

  // bg
  r.rect(0, 0, w, h)
    .stroke(false)
    .fill(niceBlue)
    .addTo(group)


  const step = w / 30 + w / 10 * Math.random()
  for (let i = 0; i < w * 3; i += step) {
    const a = { x: 0, y: w / 30 + i }
    const b = { x: w / 30 + i, y: 0 }

    r.line(a.x, a.y, b.x, b.y)
      .stroke('#FFFFFF')
      .fill(false)
      .addTo(group)

    const k = Math.random()
    const rectGroup = r.group( a.x + (b.x - a.x) * k + 1, a.y + (b.y - a.y) * k + 1)
      .addTo(group)

    r.rect(0, 0, h / 30 + Math.random() * w * 0.6, w / 100)
      .fill('#FFFFFF')
      .stroke(false)
      .rotate(-45)
      .addTo(rectGroup)

  }

  return group
}
