MarcinTilesControlA = function (area, startx, starty, width, height, min_tile, max_tile, style) {
  var margins = 0
  var borderScale = 1 + Math.random()
  var hue = Math.random() * 360
  var numX = 2 + Math.floor(Math.random() * 10)
  var radius = (0.2 + 0.5 * Math.random())
  var radius2 = (0.1 + 0.4 * Math.random())
  var shape = Math.floor(Math.random() * 2)

  var niceBlue = '#27D1E7'
  var paleYellow = 'rgb(255, 255, 255)'
  var colorHSL = chroma.hex(niceBlue).hsl()
  var color = chroma.hsl(hue, 0.8, colorHSL[2]).hex()
  var lightColor = chroma.hsl(hue, 0.8, colorHSL[2] * 1.5).hex()

  area.fill(color).rect(startx, starty, width, height)

  // minimal 32, maximal 128 - for semi-opaque layout
  // minimal 24, maximal 64 for cornered layout

  var stepX = min_tile + Math.round(Math.random() * (max_tile - min_tile))
  var stepY = stepX // stepX
  var r = stepX * radius
  var r2 = stepX * radius2

  r2 *= 0.25 // square
  // if (shape == 1) r2 *= 0.25 //ellipse

  area.fill(lightColor).stroke(false)

  for (var x = 0; x <= area.canvas.width + stepX / 2; x += stepX) {
    for (var y = 0; y <= area.canvas.height + stepY / 2; y += stepY) {
      area.save()
      area.translate(x, y)
      area.rotate(-45)
      area.scale(borderScale, borderScale)
      area.rect(-r, -r2, r * 2, r2 * 2)
      // if (shape == 1) area.ellipse(-r, -r2, r*2, r2*2)
      area.rotate(90)
      area.rect(-r, -r2, r * 2, r2 * 2)
      // if (shape == 1) area.ellipse(-r, -r2, r*2, r2*2)
      area.restore()
    }

    style.mainColor = chroma.hsl(hue, 0.5, 0.25).hex()
    style.fillColor = color
  }

  area.fill(color).stroke(false)

  for (var x = 0; x <= area.canvas.width + stepX / 2; x += stepX) {
    for (var y = 0; y <= area.canvas.height + stepY / 2; y += stepY) {
      area.save()
      area.translate(x, y)
      area.rotate(-45)
      // area.rect(-r, -r2, r*2, r2*2)
      area.ellipse(-r, -r2, r * 2, r2 * 2)
      area.rotate(90)
      // area.rect(-r, -r2, r*2, r2*2)
      area.ellipse(-r, -r2, r * 2, r2 * 2)
      area.restore()
    }
  }

  area.context.fillStyle = '#fbfaf4'
  area.context.globalAlpha = 0.9
  area.context.beginPath()
  area.context.moveTo(0, 0)
  area.context.lineTo(600, 0)
  area.context.lineTo(600, 200)
  area.context.lineTo(200, 200)
  area.context.lineTo(200, 600)
  area.context.lineTo(600, 600)
  area.context.lineTo(600, 800)
  area.context.lineTo(0, 800)
  area.context.lineTo(0, 0)
  area.context.closePath()
  area.context.fill()
  area.context.globalAlpha = 1
}
