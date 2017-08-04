OK.Covers.Patterns.ChaoticCircles = function(area, startx, starty, width, height, sections, style)
{

  for (var c = 0 c < 32 c++)
  {
    var chaos_r = 25 + Math.round(Math.random()*100)
    var chaos_x = 50 + Math.round(Math.random()*500)
    var chaos_y = 50 + Math.round(Math.random()*700)

    if( c != 0 ) { area.beginPath() area.moveTo(prevX, prevY) area.lineTo(chaos_x, chaos_y) area.closePath()             area.strokeStyle = 'rgba(49,49,49,0.5)' area.stroke() prevX = chaos_x prevY = chaos_y } else { prevX = chaos_x prevY = chaos_y }
    area.beginPath()
    area.arc(chaos_x, chaos_y, chaos_r, 0, 2 * Math.PI, false)
    area.closePath()
    if(sections===undefined) { var circular = Math.round(Math.random()*360/Math.random()*12) } else { var circular = Math.round(Math.random()*360/sections) }
    area.fillStyle = 'hsla(' + circular + ', 60%, 60%, ' + Math.random() + ')'
    area.fill()

  }

  style.mainColor = '#9A3C36'
  style.fillColor = '#FBFBFB'
}

OK.Covers.Patterns.MarcinTiles = function(area, startx, starty, width, height, min_tile, max_tile, style)
{

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

  area.fill(color).rect(margins, margins, area.canvas.width - 2 * margins, area.canvas.height - 2 * margins)

  //minimal 32, maximal 128 - for semi-opaque layout
  //minimal 24, maximal 64 for cornered layout 

  var stepX = min_tile + Math.round(Math.random()*(max_tile - min_tile)) 
  var stepY = stepX //stepX
  var r = stepX * radius
  var r2 = stepX * radius2

  r2 *= 0.25 //square
  //if (shape == 1) r2 *= 0.25 //ellipse

  area.fill(lightColor).stroke(false)

  for(var x=0 x<=area.canvas.width + stepX/2 x+=stepX) {
    for(var y=0 y<=area.canvas.height + stepY/2 y+=stepY) {
      area.save()
      area.translate(x, y)
      area.rotate(-45)
      area.scale(borderScale, borderScale)
      area.rect(-r, -r2, r*2, r2*2)
      //if (shape == 1) area.ellipse(-r, -r2, r*2, r2*2)
      area.rotate(90)
      area.rect(-r, -r2, r*2, r2*2)
      //if (shape == 1) area.ellipse(-r, -r2, r*2, r2*2)
      area.restore()
    }

    style.mainColor = chroma.hsl(hue, 0.5, 0.25).hex()
    style.fillColor = color
  }

  area.fill(color).stroke(false)

  for(var x=0 x<=area.canvas.width + stepX/2 x+=stepX) {
    for(var y=0 y<=area.canvas.height + stepY/2 y+=stepY) {
      area.save()
      area.translate(x, y)
      area.rotate(-45)
      //area.rect(-r, -r2, r*2, r2*2)
      area.ellipse(-r, -r2, r*2, r2*2)
      area.rotate(90)
      //area.rect(-r, -r2, r*2, r2*2)
      area.ellipse(-r, -r2, r*2, r2*2)
      area.restore()
    }
  }    
}

OK.Covers.Patterns.MarcinTilesControl = function(area, startx, starty, width, height, min_tile, max_tile, style)
{

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

  //minimal 32, maximal 128 - for semi-opaque layout
  //minimal 24, maximal 64 for cornered layout 

  var stepX = min_tile + Math.round(Math.random()*(max_tile - min_tile)) 
  var stepY = stepX //stepX
  var r = stepX * radius
  var r2 = stepX * radius2

  r2 *= 0.25 //square
  //if (shape == 1) r2 *= 0.25 //ellipse

  area.fill(lightColor).stroke(false)

  for(var x=0 x<=area.canvas.width + stepX/2 x+=stepX) {
    for(var y=0 y<=area.canvas.height + stepY/2 y+=stepY) {
      area.save()
      area.translate(x, y)
      area.rotate(-45)
      area.scale(borderScale, borderScale)
      area.rect(-r, -r2, r*2, r2*2)
      //if (shape == 1) area.ellipse(-r, -r2, r*2, r2*2)
      area.rotate(90)
      area.rect(-r, -r2, r*2, r2*2)
      //if (shape == 1) area.ellipse(-r, -r2, r*2, r2*2)
      area.restore()
    }

    style.mainColor = chroma.hsl(hue, 0.5, 0.25).hex()
    style.fillColor = color
  }

  area.fill(color).stroke(false)

  for(var x=0 x<=area.canvas.width + stepX/2 x+=stepX) {
    for(var y=0 y<=area.canvas.height + stepY/2 y+=stepY) {
      area.save()
      area.translate(x, y)
      area.rotate(-45)
      //area.rect(-r, -r2, r*2, r2*2)
      area.ellipse(-r, -r2, r*2, r2*2)
      area.rotate(90)
      //area.rect(-r, -r2, r*2, r2*2)
      area.ellipse(-r, -r2, r*2, r2*2)
      area.restore()
    }
  }    
}

OK.Covers.Patterns.MarcinTilesControlA = function(area, startx, starty, width, height, min_tile, max_tile, style)
{

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

  //minimal 32, maximal 128 - for semi-opaque layout
  //minimal 24, maximal 64 for cornered layout 

  var stepX = min_tile + Math.round(Math.random()*(max_tile - min_tile)) 
  var stepY = stepX //stepX
  var r = stepX * radius
  var r2 = stepX * radius2

  r2 *= 0.25 //square
  //if (shape == 1) r2 *= 0.25 //ellipse

  area.fill(lightColor).stroke(false)

  for(var x=0 x<=area.canvas.width + stepX/2 x+=stepX) {
    for(var y=0 y<=area.canvas.height + stepY/2 y+=stepY) {
      area.save()
      area.translate(x, y)
      area.rotate(-45)
      area.scale(borderScale, borderScale)
      area.rect(-r, -r2, r*2, r2*2)
      //if (shape == 1) area.ellipse(-r, -r2, r*2, r2*2)
      area.rotate(90)
      area.rect(-r, -r2, r*2, r2*2)
      //if (shape == 1) area.ellipse(-r, -r2, r*2, r2*2)
      area.restore()
    }

    style.mainColor = chroma.hsl(hue, 0.5, 0.25).hex()
    style.fillColor = color
  }

  area.fill(color).stroke(false)

  for(var x=0 x<=area.canvas.width + stepX/2 x+=stepX) {
    for(var y=0 y<=area.canvas.height + stepY/2 y+=stepY) {
      area.save()
      area.translate(x, y)
      area.rotate(-45)
      //area.rect(-r, -r2, r*2, r2*2)
      area.ellipse(-r, -r2, r*2, r2*2)
      area.rotate(90)
      //area.rect(-r, -r2, r*2, r2*2)
      area.ellipse(-r, -r2, r*2, r2*2)
      area.restore()
    }
  } 

  area.context.fillStyle = '#fbfaf4'
  area.context.globalAlpha = 0.9
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

OK.Covers.Patterns.MarcinTilesControlB = function(area, startx, starty, width, height, min_tile, max_tile, style)
{

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

  //minimal 32, maximal 128 - for semi-opaque layout
  //minimal 24, maximal 64 for cornered layout 

  var stepX = min_tile + Math.round(Math.random()*(max_tile - min_tile)) 
  var stepY = stepX //stepX
  var r = stepX * radius
  var r2 = stepX * radius2

  r2 *= 0.25 //square
  //if (shape == 1) r2 *= 0.25 //ellipse

  area.fill(lightColor).stroke(false)

  for(var x=0 x<=area.canvas.width + stepX/2 x+=stepX) {
    for(var y=0 y<=area.canvas.height + stepY/2 y+=stepY) {
      area.save()
      area.translate(x, y)
      area.rotate(-45)
      area.scale(borderScale, borderScale)
      area.rect(-r, -r2, r*2, r2*2)
      //if (shape == 1) area.ellipse(-r, -r2, r*2, r2*2)
      area.rotate(90)
      area.rect(-r, -r2, r*2, r2*2)
      //if (shape == 1) area.ellipse(-r, -r2, r*2, r2*2)
      area.restore()
    }

    style.mainColor = chroma.hsl(hue, 0.5, 0.25).hex()
    style.fillColor = color
  }

  area.fill(color).stroke(false)

  for(var x=0 x<=area.canvas.width + stepX/2 x+=stepX) {
    for(var y=0 y<=area.canvas.height + stepY/2 y+=stepY) {
      area.save()
      area.translate(x, y)
      area.rotate(-45)
      //area.rect(-r, -r2, r*2, r2*2)
      area.ellipse(-r, -r2, r*2, r2*2)
      area.rotate(90)
      //area.rect(-r, -r2, r*2, r2*2)
      area.ellipse(-r, -r2, r*2, r2*2)
      area.restore()
    }
  } 

  area.context.fillStyle = '#fbfaf4'
  area.context.globalAlpha = 1
  area.context.beginPath()
  area.context.moveTo(0,0)
  area.context.lineTo(600,0)
  area.context.lineTo(600,800)
  area.context.lineTo(0,800)
  area.context.lineTo(0,750)
  area.context.lineTo(550,750)
  area.context.lineTo(550,50)
  area.context.lineTo(0,50)
  area.context.lineTo(0,0)
  area.context.closePath()
  area.context.fill()
  area.context.globalAlpha = 1

}

OK.Covers.Patterns.MarcinLines = function(area, startx, starty, width, height, style)
{

  var margins = 0    
  var niceBlue = '#27D1E7'
  var paleYellow = 'rgb(255, 255, 240)'

  var colorHSL = chroma.hex(niceBlue).hsl()
  var h = Math.random() * 255
  niceBlue = chroma.hsl(h, 0.68, colorHSL[2]).hex()

  area.fill(niceBlue).rect(margins, margins, area.canvas.width - 2 * margins, area.canvas.height - 2 * margins)

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
}

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

OK.Covers.Patterns.PixelGrid = function (area, x_pos, y_pos, cols, rows, cluster, mode, style) {

  for (x = 0 x < cols*cluster / cluster x++) {
    for (y = 0 y < rows*cluster / cluster y++) {

      var color = ~~ (Math.random() * 360)
      area.fillStyle = 'hsl(' + color + ', 60%, 60%)'

      //if(mode == 'mixed') { var randShape = Math.round((Math.random() * 5)) }
      //if(mode == 'corners') { var randShape = 4 }
      //if(mode == 'pixels') { var randShape = 0 }

      if(mode == 0) { var randShape = Math.round((Math.random() * 5)) }
      if(mode == 1) { var randShape = 4 }
      if(mode == 2) { var randShape = 0 }

      switch (randShape) {

        case 0:
          area.beginPath()
          area.rect(x_pos + x * cluster, y_pos + y * cluster, cluster, cluster)
          area.closePath()
          area.fillStyle = 'hsl(' + color + ', 60%, 60%)'
          area.fill()
          break

        case 1:
          area.beginPath()
          area.moveTo(x_pos + cluster/2 + x * cluster, y_pos + y * cluster)
          area.lineTo(x_pos + x * cluster, y_pos + cluster + y * cluster)
          area.lineTo(x_pos + cluster + x * cluster, y_pos + cluster + y * cluster)
          area.closePath()
          area.fillStyle = 'hsl(' + color + ', 60%, 60%)'
          area.fill()
          break

        case 2:
          area.beginPath()
          area.moveTo(x_pos + cluster/2 + x * cluster, y_pos + cluster/2 + y * cluster)
          area.lineTo(x_pos + x * cluster, y_pos + cluster + y * cluster)
          area.lineTo(x_pos + cluster + x * cluster, y_pos + cluster + y * cluster)
          area.closePath()
          area.fillStyle = 'hsl(' + color + ', 60%, 60%)'
          area.fill()

          area.beginPath()
          area.moveTo(x_pos + cluster/2 + x * cluster, y_pos + cluster/2 + y * cluster)
          area.lineTo(x_pos + x * cluster, y_pos + y * cluster)
          area.lineTo(x_pos + cluster + x * cluster, y_pos + y * cluster)
          area.closePath()
          area.fillStyle = 'hsl(' + color + ', 60%, 60%)'
          area.fill()
          break

        case 3:
          area.beginPath()
          area.arc(x_pos + cluster/2 + x * cluster, y_pos + cluster/2 + y * cluster, cluster/2, 0, 2 * Math.PI, false)
          area.closePath()
          area.fillStyle = 'hsl(' + color + ', 60%, 60%)'
          area.fill()
          break

        case 4:
          area.beginPath()
          area.moveTo(x_pos + x * cluster, y_pos + y * cluster)
          area.lineTo(x_pos + cluster + x * cluster, y_pos + y * cluster)
          area.lineTo(x_pos + cluster + x * cluster, y_pos + cluster + y * cluster)
          area.closePath()
          area.fillStyle = 'hsl(' + color + ', 60%, 60%)'
          area.fill()
          break

        case 5:
          area.beginPath()
          area.rect(x_pos + x * cluster, y_pos + y * cluster, cluster, cluster)
          area.closePath()
          area.fillStyle = 'hsl(' + color + ', 60%, 60%)'
          area.fill()
          area.beginPath()
          area.arc(x_pos + cluster/2 + x * cluster, y_pos + cluster/2 + y * cluster, cluster/2, 0, 2 * Math.PI, false)
          area.closePath()
          area.fillStyle = '#EBE9DB'
          area.fill()
          break

        default:
          area.beginPath()
          area.arc(x_pos + cluster/2 + x * cluster, y_pos + cluster/2 + y * cluster, cluster/2, 0, 2 * Math.PI, false)
          area.closePath()
          area.fillStyle = 'hsl(' + color + ', 60%, 60%)'
          area.fill()

      }
    }
  }

  style.mainColor = '#494969'
  style.fillColor = '#EBE9DB'
}

OK.Covers.Patterns.FractalTree = function(area, startx, starty, width, height, pageCount, style)
{

  var minPageCount = 10
  var maxPageCount = 500

  var minBranch = 12
  var maxBranch = 18

  var hue = 10 + Math.random() * 100
  var margins = 0

  var niceBlue = '#27D1E7'
  var paleYellow = 'rgb(255, 255, 240)'
  var colorHSL = chroma.hex(niceBlue).hsl()
  var color = chroma.hsl(hue, 0.8, 0.2).hex()
  var lightColor = chroma.hsl(hue, 0.5, colorHSL[2] * 1.2).hex()

  area.fill(lightColor).rect(margins, margins, area.canvas.width - 2 * margins, area.canvas.height - 2 * margins)

  area.fill(false).stroke('rgba(255, 255, 255, 0.15)', 3)

  var buds = []
  area.save()

  //mapping page number to BranchMaxLevel
  if(pageCount < minPageCount) { pageCount = minPageCount }
  if(pageCount > maxPageCount) { pageCount = maxPageCount }

  var branchMaxLevel = Math.round(OK.Covers.Utils.remap(pageCount, minPageCount, maxPageCount, minBranch, maxBranch)) //17

  var branchSchrink = 0.95
  var branchAngle = 15 + Math.random() * 15
  var branchInitLen = area.canvas.width * (0.09 + Math.random() * 0.07)
  var branchStartX = area.canvas.width * (0.3 + 0.5 * Math.random())

  //var branchInitLen = 200 //area.canvas.width * (pageCount/250 + Math.random() * 0.08)
  //var branchStartX = 200 //area.canvas.width * (0.3 + 0.5 * Math.random())

  var branchingChance = 0.75 + Math.random() * 0.2
  function grow() {
    if (buds.length == 0) {
      return
    }

    var bud = buds.shift()
    var nx = bud.x + bud.len * Math.cos(bud.dir / 180 * Math.PI)
    var ny = bud.y + bud.len * Math.sin(bud.dir / 180 * Math.PI)
    area.line(bud.x, bud.y, nx, ny)

    if (bud.level >= branchMaxLevel) {
      return //die
    }

    var chance = Math.random()
    if (chance < 0.25) { //go forward the same way
      bud.length *= branchSchrink
      buds.push({
        x : nx,
        y : ny,
        dir : bud.dir,
        len : bud.len * branchSchrink,
        level : bud.level + 1
      })
    }
    else if (chance < branchingChance || bud.level <= 2) { //split
      buds.push({
        x : nx,
        y : ny,
        dir : bud.dir - branchAngle,
        len : bud.len * branchSchrink,
        level : bud.level + 1
      })
      buds.push({
        x : nx,
        y : ny,
        dir : bud.dir + branchAngle,
        len : bud.len * branchSchrink * branchSchrink,
        level : bud.level + 1
      })
    }
    else {
      //do nothing / die
    }

    grow()
  }

  buds.push({
    x : branchStartX,
    y : area.canvas.height,
    dir : -90,
    len : branchInitLen,
    level : 0
  })
  grow()

  while(buds.length > 0) {
    grow()
  }

  area.fill(false).stroke('#333333', 1)

  //branchAngle = 15 + Math.random() * 15
  //branchInitLen = area.canvas.width * (0.09 + Math.random() * 0.07)
  branchStartX += 10

  buds.push({
    x : branchStartX,
    y : area.canvas.height,
    dir : -90,
    len : branchInitLen,
    level : 0
  })
  grow()

  area.restore()
  area.stroke(false)
  var stack = [] 

  style.mainColor = chroma.hsl(hue, 0.8, 0.2).hex()//console.log('parent colour: ' + document.getElementById('child_colour').value) //= chroma.hsl(hue, 0.4, 0.4).hex()
  style.fillColor = lightColor

}

OK.Covers.Patterns.FractalTreeDecentred = function(area, startx, starty, width, height, pageCount, style)
{

  var minPageCount = 10
  var maxPageCount = 500

  var minBranch = 12
  var maxBranch = 18

  var hue = 10 + Math.random() * 100
  var margins = 0

  var niceBlue = '#27D1E7'
  var paleYellow = 'rgb(255, 255, 240)'
  var colorHSL = chroma.hex(niceBlue).hsl()
  var color = chroma.hsl(hue, 0.8, 0.2).hex()
  var lightColor = chroma.hsl(hue, 0.5, colorHSL[2] * 1.2).hex()

  area.fill(lightColor).rect(margins, margins, area.canvas.width - 2 * margins, area.canvas.height - 2 * margins)

  area.fill(false).stroke('rgba(255, 255, 255, 0.15)', 3)

  var buds = []
  area.save()

  //mapping page number to BranchMaxLevel
  if(pageCount < minPageCount) { pageCount = minPageCount }
  if(pageCount > maxPageCount) { pageCount = maxPageCount }

  var branchMaxLevel = Math.round(OK.Covers.Utils.remap(pageCount, minPageCount, maxPageCount, minBranch, maxBranch)) //17

  var branchSchrink = 0.95
  var branchAngle = 15 + Math.random() * 15
  var branchInitLen = area.canvas.width * (0.09 + Math.random() * 0.07)
  var branchStartX = 218

  //var branchInitLen = 200 //area.canvas.width * (pageCount/250 + Math.random() * 0.08)
  //var branchStartX = 200 //area.canvas.width * (0.3 + 0.5 * Math.random())

  var branchingChance = 0.75 + Math.random() * 0.2
  function grow() {
    if (buds.length == 0) {
      return
    }

    var bud = buds.shift()
    var nx = bud.x + bud.len * Math.cos(bud.dir / 180 * Math.PI)
    var ny = bud.y + bud.len * Math.sin(bud.dir / 180 * Math.PI)
    area.line(bud.x, bud.y, nx, ny)

    if (bud.level >= branchMaxLevel) {
      return //die
    }

    var chance = Math.random()
    if (chance < 0.25) { //go forward the same way
      bud.length *= branchSchrink
      buds.push({
        x : nx,
        y : ny,
        dir : bud.dir,
        len : bud.len * branchSchrink,
        level : bud.level + 1
      })
    }
    else if (chance < branchingChance || bud.level <= 2) { //split
      buds.push({
        x : nx,
        y : ny,
        dir : bud.dir - branchAngle,
        len : bud.len * branchSchrink,
        level : bud.level + 1
      })
      buds.push({
        x : nx,
        y : ny,
        dir : bud.dir + branchAngle,
        len : bud.len * branchSchrink * branchSchrink,
        level : bud.level + 1
      })
    }
    else {
      //do nothing / die
    }

    grow()
  }

  buds.push({
    x : branchStartX,
    y : area.canvas.height,
    dir : -90,
    len : branchInitLen,
    level : 0
  })
  grow()

  while(buds.length > 0) {
    grow()
  }

  area.fill(false).stroke('#333333', 1)

  //branchAngle = 15 + Math.random() * 15
  //branchInitLen = area.canvas.width * (0.09 + Math.random() * 0.07)
  branchStartX += 10

  buds.push({
    x : branchStartX,
    y : area.canvas.height,
    dir : -90,
    len : branchInitLen,
    level : 0
  })
  grow()

  area.restore()
  area.stroke(false)
  var stack = [] 

  style.mainColor = chroma.hsl(hue, 0.8, 0.2).hex()//console.log('parent colour: ' + document.getElementById('child_colour').value) //= chroma.hsl(hue, 0.4, 0.4).hex()
  style.fillColor = lightColor

}

OK.Covers.Patterns.FractalTreeControl = function(area, startx, starty, width, height, pageCount, style)
{

  var minPageCount = 10
  var maxPageCount = 500

  var minBranch = 6
  var maxBranch = 12

  var hue = 10 + Math.random() * 100
  var margins = 0

  var niceBlue = '#27D1E7'
  var paleYellow = 'rgb(255, 255, 240)'
  var colorHSL = chroma.hex(niceBlue).hsl()
  var color = chroma.hsl(hue, 0.8, 0.2).hex()
  var lightColor = chroma.hsl(hue, 0.5, colorHSL[2] * 1.2).hex()

  area.fill(lightColor).rect(margins, margins, area.canvas.width - 2 * margins, area.canvas.height - 2 * margins)

  area.fill(false).stroke('rgba(255, 255, 255, 0.15)', 3)

  var buds = []
  area.save()

  //mapping page number to BranchMaxLevel
  if(pageCount < minPageCount) { pageCount = minPageCount }
  if(pageCount > maxPageCount) { pageCount = maxPageCount }

  var branchMaxLevel = Math.round(OK.Covers.Utils.remap(pageCount, minPageCount, maxPageCount, minBranch, maxBranch)) //17

  var branchSchrink = 0.95
  var branchAngle = 15 + Math.random() * 15
  var branchInitLen = area.canvas.width * (0.09 + Math.random() * 0.07)
  var branchStartX = startx + width/2 + (-100 + Math.random()*200)
  var branchStartY = 600

  //var branchInitLen = 200 //area.canvas.width * (pageCount/250 + Math.random() * 0.08)
  //var branchStartX = 200 //area.canvas.width * (0.3 + 0.5 * Math.random())

  var branchingChance = 0.75 + Math.random() * 0.2
  function grow() {
    if (buds.length == 0) {
      return
    }

    var bud = buds.shift()
    var nx = bud.x + bud.len * Math.cos(bud.dir / 180 * Math.PI)
    var ny = bud.y + bud.len * Math.sin(bud.dir / 180 * Math.PI)
    area.line(bud.x, bud.y, nx, ny)

    if (bud.level >= branchMaxLevel) {
      return //die
    }

    var chance = Math.random()
    if (chance < 0.25) { //go forward the same way
      bud.length *= branchSchrink
      buds.push({
        x : nx,
        y : ny,
        dir : bud.dir,
        len : bud.len * branchSchrink,
        level : bud.level + 1
      })
    }
    else if (chance < branchingChance || bud.level <= 2) { //split
      buds.push({
        x : nx,
        y : ny,
        dir : bud.dir - branchAngle,
        len : bud.len * branchSchrink,
        level : bud.level + 1
      })
      buds.push({
        x : nx,
        y : ny,
        dir : bud.dir + branchAngle,
        len : bud.len * branchSchrink * branchSchrink,
        level : bud.level + 1
      })
    }
    else {
      //do nothing / die
    }

    grow()
  }

  buds.push({
    x : branchStartX,
    y : branchStartY,
    dir : -90,
    len : branchInitLen,
    level : 0
  })
  grow()

  while(buds.length > 0) {
    grow()
  }

  area.fill(false).stroke('#333333', 1)

  //branchAngle = 15 + Math.random() * 15
  //branchInitLen = area.canvas.width * (0.09 + Math.random() * 0.07)
  branchStartX += 10

  buds.push({
    x : branchStartX,
    y : branchStartY,
    dir : -90,
    len : branchInitLen,
    level : 0
  })
  grow()

  area.restore()
  area.stroke(false)
  var stack = [] 

  style.mainColor = chroma.hsl(hue, 0.8, 0.2).hex()//console.log('parent colour: ' + document.getElementById('child_colour').value) //= chroma.hsl(hue, 0.4, 0.4).hex()
  area.context.fillStyle = '#f2f6e9'
  area.context.fillRect(0, 0, 200, 800)
  area.context.fillRect(0, 0, 600, 200)
  area.context.fillRect(0, 600, 600, 200)


}

OK.Covers.Patterns.FractalTreeControlII = function(area, startx, starty, width, height, pageCount, style)
{

  var minPageCount = 10
  var maxPageCount = 500

  var minBranch = 12
  var maxBranch = 20

  var hue = 10 + Math.random() * 100
  var margins = 0

  var niceBlue = '#27D1E7'
  var paleYellow = 'rgb(255, 255, 240)'
  var colorHSL = chroma.hex(niceBlue).hsl()
  var color = chroma.hsl(hue, 0.8, 0.2).hex()
  var lightColor = chroma.hsl(hue, 0.5, colorHSL[2] * 1.2).hex()

  area.fill(lightColor).rect(margins, margins, area.canvas.width - 2 * margins, area.canvas.height - 2 * margins)

  area.fill(false).stroke('rgba(255, 255, 255, 0.15)', 3)

  var buds = []
  area.save()

  //mapping page number to BranchMaxLevel
  if(pageCount < minPageCount) { pageCount = minPageCount }
  if(pageCount > maxPageCount) { pageCount = maxPageCount }

  var branchMaxLevel = Math.round(OK.Covers.Utils.remap(pageCount, minPageCount, maxPageCount, minBranch, maxBranch)) //17

  var branchSchrink = 0.95
  var branchAngle = 15 + Math.random() * 15
  var branchInitLen = area.canvas.width * (0.09 + Math.random() * 0.07)
  var branchStartX = 250
  var branchStartY = 800

  //var branchInitLen = 200 //area.canvas.width * (pageCount/250 + Math.random() * 0.08)
  //var branchStartX = 200 //area.canvas.width * (0.3 + 0.5 * Math.random())

  var branchingChance = 0.75 + Math.random() * 0.2
  function grow() {
    if (buds.length == 0) {
      return
    }

    var bud = buds.shift()
    var nx = bud.x + bud.len * Math.cos(bud.dir / 180 * Math.PI)
    var ny = bud.y + bud.len * Math.sin(bud.dir / 180 * Math.PI)
    area.line(bud.x, bud.y, nx, ny)

    if (bud.level >= branchMaxLevel) {
      return //die
    }

    var chance = Math.random()
    if (chance < 0.25) { //go forward the same way
      bud.length *= branchSchrink
      buds.push({
        x : nx,
        y : ny,
        dir : bud.dir,
        len : bud.len * branchSchrink,
        level : bud.level + 1
      })
    }
    else if (chance < branchingChance || bud.level <= 2) { //split
      buds.push({
        x : nx,
        y : ny,
        dir : bud.dir - branchAngle,
        len : bud.len * branchSchrink,
        level : bud.level + 1
      })
      buds.push({
        x : nx,
        y : ny,
        dir : bud.dir + branchAngle,
        len : bud.len * branchSchrink * branchSchrink,
        level : bud.level + 1
      })
    }
    else {
      //do nothing / die
    }

    grow()
  }

  buds.push({
    x : branchStartX,
    y : branchStartY,
    dir : -90,
    len : branchInitLen,
    level : 0
  })
  grow()

  while(buds.length > 0) {
    grow()
  }

  area.fill(false).stroke('#333333', 1)

  //branchAngle = 15 + Math.random() * 15
  //branchInitLen = area.canvas.width * (0.09 + Math.random() * 0.07)
  branchStartX += 10

  buds.push({
    x : branchStartX,
    y : branchStartY,
    dir : -90,
    len : branchInitLen,
    level : 0
  })
  grow()

  area.restore()
  area.stroke(false)
  var stack = [] 

  style.mainColor = chroma.hsl(hue, 0.8, 0.2).hex()//console.log('parent colour: ' + document.getElementById('child_colour').value) //= chroma.hsl(hue, 0.4, 0.4).hex()
  area.context.fillStyle = '#f2f6e9'
  area.context.fillRect(0, 0, 600, 50)
  area.context.fillRect(550, 0, 50, 800)
  area.context.fillRect(0, 750, 600, 50)


}
OK.Covers.Patterns.Hexagons = function (area, width, height, style) {

  var   numberOfSides = 6,
    outerSize = 25 + Math.round(Math.random()*25),
    innerSize = outerSize/2,
    rows = Math.round(height/outerSize)
  cols = Math.round(width/outerSize)

  var hue = Math.round(128 + (-128 + Math.random() * 256))
  //var color = 
  //console.log('hue: ' + hue)
  area.fillStyle = 'hsl(' + hue + ', 60%, 60%)'
  area.fillRect(0,0, width, height)
  area.fill()
  style.mainColor = chroma.hsl(hue, 0.5, 0.25).hex()
  style.fillColor = 'hsl(' + hue + ', 60%, 60%)'
  var colour_matrix = OK.Covers.Patterns.coloursArray(numberOfSides)

  for (var y = 0 y < rows y++) {
    for (var x = 0 x < cols x++) {    

      OK.Covers.Patterns.drawHexagons(area, numberOfSides ,x, y, false, true, outerSize, innerSize, rows, cols, colour_matrix, hue, style)

    }
  }
}

OK.Covers.Patterns.coloursArray = function(sides) {
  var colours = new Array(sides / 2)
  for (var c = 0 c < sides / 2 c++) {
    //64 -192
    colours[c] = 64 + 128 / (sides / 2 - 1) * c
  }

  return colours
}


OK.Covers.Patterns.drawHexagons = function ( area, numberOfSides, x, y, solid, chaos,  outerSize, innerSize, rows, cols, colour_matrix, hue , style)
{

  if(chaos == true) { var counter = Math.round(Math.random()*((numberOfSides/2)-1)) }
  else{
    var counter = 0 }


  Xcenter = outerSize*2 * x
  var test_n = x % 2
  if (test_n == 0) {
    Ycenter = outerSize*2.33 * y
  } else {
    Ycenter = outerSize + outerSize*2.33 * y
  }


  if(solid == true) { 

    area.beginPath()
    area.arc(Xcenter, Ycenter, outerSize*0.75 , 0, 2 * Math.PI, false)
    area.fillStyle = '#FFFFFF'
    area.fill()
    area.closePath()


  }

  for (var i = 1 i <= numberOfSides i += 1) {


    if (i == 1) {

      area.beginPath()
      area.moveTo(Xcenter + outerSize * Math.cos(0), Ycenter + outerSize * Math.sin(0))
      area.lineTo(Xcenter + innerSize * Math.cos(0), Ycenter + innerSize * Math.sin(0))
      area.lineTo(Xcenter + innerSize * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + innerSize * Math.sin(i * 2 * Math.PI / numberOfSides))
      area.lineTo(Xcenter + outerSize * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + outerSize * Math.sin(i * 2 * Math.PI / numberOfSides))
      area.lineTo(Xcenter + outerSize * Math.cos(0), Ycenter + outerSize * Math.sin(0))
      area.closePath()
      //area.fillStyle = 'rgb(' + colour_matrix[counter] + ', ' + colour_matrix[counter] + ', ' + colour_matrix[counter] + ')'
      area.fillStyle = 'hsl(' + hue + ', ' + Math.round(colour_matrix[counter]/255*100) + '%, ' + Math.round(colour_matrix[counter]/255*100) + '%)'
      console.log('Percentage: ' + Math.round(colour_matrix[counter]/255*100) )
      if (counter < numberOfSides / 2 - 1) {
        counter++
      } else {
        counter = 0
      }
      area.fill()
    } else {



      area.beginPath()
      area.moveTo(Xcenter + outerSize * Math.cos((i - 1) * 2 * Math.PI / numberOfSides), Ycenter + outerSize * Math.sin((i - 1) * 2 * Math.PI / numberOfSides))
      area.lineTo(Xcenter + outerSize * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + outerSize * Math.sin(i * 2 * Math.PI / numberOfSides))
      area.lineTo(Xcenter + innerSize * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + innerSize * Math.sin(i * 2 * Math.PI / numberOfSides))
      area.lineTo(Xcenter + innerSize * Math.cos((i - 1) * 2 * Math.PI / numberOfSides), Ycenter + innerSize * Math.sin((i - 1) * 2 * Math.PI / numberOfSides))
      area.lineTo(Xcenter + outerSize * Math.cos((i - 1) * 2 * Math.PI / numberOfSides), Ycenter + outerSize * Math.sin((i - 1) * 2 * Math.PI / numberOfSides))
      area.closePath()

      //area.fillStyle = 'rgb(' + colour_matrix[counter] + ', ' + colour_matrix[counter] + ', ' + colour_matrix[counter] + ')'
      area.fillStyle = 'hsl(' + (hue - 20) + ', ' + Math.round(colour_matrix[counter]/255*100)  + '%, ' + Math.round(colour_matrix[counter]/255*100)     + '%)'
      area.fill()
      if (counter < numberOfSides / 2 - 1) {
        counter++
      } else {
        counter = 0
      }


    }
  }    
}

OK.Covers.Patterns.DividedLetters = function(area, startx, startx, width, height, letters) {
  var img_matrix = new Array(16)

  OK.Covers.Patterns.drawLetters(area, img_matrix, letters, 0, 0, 333)
  OK.Covers.Patterns.renderMatrix(area, img_matrix, 50, 250)
}

OK.Covers.Patterns.renderMatrix = function(area, bm_data, startx, starty) {
  for (y = 0 y < 3 y++) {
    for (x = 0 x < 3 x++) {
      var side_width = 333
      //var side_width = crayon.canvas.width * 0.55
      area.context.putImageData(bm_data[Math.round(Math.random() * 15)], startx + x * side_width / 2 * 1.02, starty + y * side_width / 2 * 1.02)
    }
  }
}




OK.Covers.Patterns.drawLetters = function(area, img_matrix, letters, x, y, side) {

  var draw_canvas = document.createElement('canvas')
  draw_canvas.width = 600
  draw_canvas.height = 600
  var d = draw_canvas.getContext('2d')


  for (var l = 0 l < 4 l++) {

    d.fillStyle = 'rgb(' + (200 + (25 - Math.round(Math.random() * 50))) + ', 130, 155)'
    d.fillRect(x, y, side, side)

    var fontScale = side * 1.45
    d.fillStyle = '#3b253c'
    d.font = 'bold ' + fontScale + 'px Arial'

    var metrics = d.measureText(letters[l])
    var width = metrics.width

    d.fillText(letters[l], x + side / 2 - width / 2, y + side / 2 + fontScale / 2.85)

    img_matrix[(l * 4 + 0)] = d.getImageData(x, y, side / 2, side / 2)
    img_matrix[(l * 4 + 1)] = d.getImageData(x + side / 2, y, side / 2, side / 2)
    img_matrix[(l * 4 + 2)] = d.getImageData(x, y + side / 2, side / 2, side / 2)
    img_matrix[(l * 4 + 3)] = d.getImageData(x + side / 2, y + side / 2, side / 2, side / 2)

  }

  //console.log('BD: ' + img_matrix[0])
}
