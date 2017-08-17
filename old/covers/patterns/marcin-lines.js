var chroma = require('chroma-js')
module.exports = function MarcinLines(area, startx, starty, width, height, style)
{

  var margins = 0
  var niceBlue = '#27D1E7'
  var paleYellow = 'rgb(255, 255, 240)'

  var colorHSL = chroma.hex(niceBlue).hsl()
  var h = Math.random() * 255
  niceBlue = chroma.hsl(h, 0.68, colorHSL[2]).hex()

  area.fill(niceBlue).rect(margins, margins, area.canvas.width - 2 * margins, area.canvas.height - 2 * margins)

  var step = area.canvas.width/30 + area.canvas.width/15 * Math.random()
  for(var i=0; i<2000; i+=step) {
    var a = { x : 0, y : area.canvas.width/30 + i }
    var b = { x : area.canvas.width/30 + i, y : 0 }

    area.save()
    area.stroke('#FFFFFF').line(a.x, a.y, b.x, b.y).stroke(false)
    var k = Math.random()
    area.fill('#FFFFFF')
      .translate(a.x + (b.x - a.x) * k + 1, a.y + (b.y - a.y) * k + 1)
      .rotate(-45)
      .rect(0, 0, area.canvas.width/30 + Math.random() * 400, area.canvas.width/100)
    area.restore()
  }
  style.mainColor = chroma.hsl(h, 0.5, 0.25).hex()
  style.fillColor = niceBlue
}
