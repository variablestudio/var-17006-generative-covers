OK.Covers.Patterns.MarcinLinesControl = function(area, startx, starty, width, height, style)
{

  var margins = 0    
  var niceBlue = '#27D1E7'
  var paleYellow = 'rgb(255, 255, 240)'

  var colorHSL = chroma.hex(niceBlue).hsl()
  var h = Math.random() * 255
  niceBlue = chroma.hsl(h, 0.68, colorHSL[2]).hex()

  area.fill(niceBlue).rect(200, 200, 400, 400)

  var step = area.canvas.width/30 + area.canvas.width/15 * Math.random()
  for(var i=0 i<2000 i+=step) {
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

  area.context.fillStyle = niceBlue
  area.context.globalAlpha = 1
  area.context.beginPath()
  area.context.moveTo(0,0)
  area.context.lineTo(600,0)
  area.context.lineTo(600,200)
  area.context.lineTo(200,200)
  area.context.lineTo(200,600)
  area.context.lineTo(600,600)
  area.context.lineTo(600,800)
  area.context.lineTo(0,800)
  area.context.lineTo(0,0)
  area.context.closePath()
  area.context.fill()
  area.context.globalAlpha = 1
}

