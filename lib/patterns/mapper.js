const Color = require('rune.js').Color

function clamp (x, min, max) {
  return Math.max(min, Math.min(x, max))
}

module.exports = function mapper (rune, w, h, book) {
  const r = rune
  const group = r.group()

  const year = book.year
  const pages = book.pageCount
  const sections = book.sectionCount

  const x1 = clamp(rune.map(parseInt(('' + year).substring(0, 2)), 18, 21, 0, w), 0, w)
  const y1 = clamp(rune.map(parseInt(('' + year).substring(2)), 0, 99, 10, h - 10), 10, h - 10)

  const x2 = clamp(rune.map(sections, 0, 30, 0, w), 0, w)
  const y2 = clamp(rune.map(pages, 0, 1000, 10, h - 10), 10, h - 10)

  // center triangles
  r.path()
    .moveTo(0, 0)
    .lineTo(x1, y1)
    .lineTo(x2, y2)
    .lineTo(0, 0)
    .fill(new Color().hsl(Math.random() * 360, 60, 60))
    .stroke(false)
    .addTo(group)

  r.path()
    .moveTo(w, h)
    .lineTo(x1, y1)
    .lineTo(x2, y2)
    .lineTo(w, h)
    .fill(new Color().hsl(Math.random() * 360, 60, 60))
    .stroke(false)
    .addTo(group)

  // bulding from 0,0 to closest
  if (x1 < x2) {
    if (y1 > y2) {
      r.path()
        .moveTo(0, 0)
        .lineTo(x1, y1)
        .lineTo(0, h)
        .lineTo(0, 0)
        .fill(new Color().hsl(Math.random() * 360, 60, 60))
        .stroke(false)
        .addTo(group)

      r.path()
        .moveTo(0, h)
        .lineTo(x1, y1)
        .lineTo(w, h)
        .lineTo(0, h)
        .fill(new Color().hsl(Math.random() * 360, 60, 60))
        .stroke(false)
        .addTo(group)

      r.path()
        .moveTo(w, 0)
        .lineTo(x2, y2)
        .lineTo(0, 0)
        .lineTo(w, 0)
        .fill(new Color().hsl(Math.random() * 360, 60, 60))
        .stroke(false)
        .addTo(group)

      r.path()
        .moveTo(w, 0)
        .lineTo(x2, y2)
        .lineTo(w, h)
        .lineTo(w, 0)
        .fill(new Color().hsl(Math.random() * 360, 60, 60))
        .stroke(false)
        .addTo(group)
    } else {
      r.path()
        .moveTo(0, 0)
        .lineTo(x1, y1)
        .lineTo(w, 0)
        .lineTo(0, 0)
        .fill(new Color().hsl(Math.random() * 360, 60, 60))
        .stroke(false)
        .addTo(group)

      r.path()
        .moveTo(0, h)
        .lineTo(x1, y1)
        .lineTo(w, h)
        .lineTo(0, h)
        .fill(new Color().hsl(Math.random() * 360, 60, 60))
        .stroke(false)
        .addTo(group)

      r.path()
        .moveTo(w, 0)
        .lineTo(x2, y2)
        .lineTo(0, 0)
        .lineTo(w, 0)
        .fill(new Color().hsl(Math.random() * 360, 60, 60))
        .stroke(false)
        .addTo(group)

      r.path()
        .moveTo(w, 0)
        .lineTo(x2, y2)
        .lineTo(w, h)
        .lineTo(w, 0)
        .fill(new Color().hsl(Math.random() * 360, 60, 60))
        .stroke(false)
        .addTo(group)
    }
  } else {
    if (y1 > y2) {
      r.path()
        .moveTo(0, 0)
        .lineTo(x1, y1)
        .lineTo(0, h)
        .lineTo(0, 0)
        .fill(new Color().hsl(Math.random() * 360, 60, 60))
        .stroke(false)
        .addTo(group)

      r.path()
        .moveTo(0, h)
        .lineTo(x1, y1)
        .lineTo(w, h)
        .lineTo(0, h)
        .fill(new Color().hsl(Math.random() * 360, 60, 60))
        .stroke(false)
        .addTo(group)

      r.path()
        .moveTo(w, 0)
        .lineTo(x2, y2)
        .lineTo(0, 0)
        .lineTo(w, 0)
        .fill(new Color().hsl(Math.random() * 360, 60, 60))
        .stroke(false)
        .addTo(group)

      r.path()
        .moveTo(w, 0)
        .lineTo(x2, y2)
        .lineTo(w, h)
        .lineTo(w, 0)
        .fill(new Color().hsl(Math.random() * 360, 60, 60))
        .stroke(false)
        .addTo(group)
    } else {
      r.path()
        .moveTo(0, 0)
        .lineTo(x1, y1)
        .lineTo(w, 0)
        .lineTo(0, 0)
        .fill(new Color().hsl(Math.random() * 360, 60, 60))
        .stroke(false)
        .addTo(group)

      r.path()
        .moveTo(0, h)
        .lineTo(x1, y1)
        .lineTo(w, h)
        .lineTo(0, h)
        .fill(new Color().hsl(Math.random() * 360, 60, 60))
        .stroke(false)
        .addTo(group)

      r.path()
        .moveTo(w, 0)
        .lineTo(x2, y2)
        .lineTo(0, 0)
        .lineTo(w, 0)
        .fill(new Color().hsl(Math.random() * 360, 60, 60))
        .stroke(false)
        .addTo(group)

      r.path()
        .moveTo(w, 0)
        .lineTo(x2, y2)
        .lineTo(w, h)
        .lineTo(w, 0)
        .fill(new Color().hsl(Math.random() * 360, 60, 60))
        .stroke(false)
        .addTo(group)
    }
  }

  return group
}
