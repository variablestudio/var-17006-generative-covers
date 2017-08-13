const Color = require('rune.js').Color
const random = require('pex-random')

function clamp (x, min, max) {
  return Math.max(min, Math.min(x, max))
}

module.exports = function mapper ({ book, r, w, h }) {
  const group = r.group()

  const year = book.year
  const pages = book.pageCount
  const sections = book.sectionCount

  let tl = [0, 0]
  let tr = [w, 0]
  let bl = [0, h]
  let br = [w, h]

  let x1 = clamp(r.map(parseInt(('' + year).substring(0, 2)), 18, 21, 0, w), 0, w)
  let y1 = clamp(r.map(parseInt(('' + year).substring(2)), 0, 99, 10, h - 10), 10, h - 10)

  let x2 = clamp(r.map(sections, 0, 30, 0, w), 0, w)
  let y2 = clamp(r.map(pages, 0, 1000, 10, h - 10), 10, h - 10)

  const points = [
    [x1, y1],
    [x2, y1],
    [x1, y2],
    [x2, y2]
  ]

  function dist (a, b) {
    return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2))
  }

  // point closest to the bottom left or the second closest
  const p1 = points.sort((a, b) => dist(a, bl) - dist(b, bl))[random.int(0, 2)]

  // point closes to the top right or the second closest
  const p2 = points.sort((a, b) => dist(a, tr) - dist(b, tr))[random.int(0, 2)]

  const alpha = 1
  const stroke = false

  // const hue1 = Math.random() * 360
  // const hue2 = (hue1 + 60) % 360
  // const color1 = new Color().hsl(hue1, 60, 60, alpha)
  // const color2 = new Color().hsl(hue2, 60, 60, alpha)
  // const color = new Color().hsl(random.float(0, 360), 60, 60, alpha)
  function triangle (a, b, c) {
    const color = new Color().hsl(random.float(0, 360), 60, 60, alpha)
    // const color = (Math.random() < 0.5) ? color1 : color2
    // const color = new Color().hsl(hue1 + random.float(-30, 30), 60, 60, alpha)
    r.path()
      .moveTo(a[0], a[1])
      .lineTo(b[0], b[1])
      .lineTo(c[0], c[1])
      .lineTo(a[0], a[1])
      // .fill(color.copy().lighten(random.float(-0.2, 0.2)))
      // .fill(color.copy().desaturate(random.float(0.0, 0.4)).lighten(random.float(-0.3, 0.3)))
      .fill(color)
      .stroke(stroke)
      .addTo(group)
  }

  triangle(tl, p1, p2)
  triangle(p1, p2, br)
  triangle(tl, p1, bl)
  triangle(bl, p1, br)
  triangle(tl, p2, tr)
  triangle(tr, p2, br)

  return group
}
