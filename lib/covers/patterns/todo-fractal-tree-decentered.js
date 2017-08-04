OK.Covers.Patterns.FractalTreeDecentred = function (area, startx, starty, width, height, pageCount, style) {
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

  // mapping page number to BranchMaxLevel
  if (pageCount < minPageCount) { pageCount = minPageCount }
  if (pageCount > maxPageCount) { pageCount = maxPageCount }

  var branchMaxLevel = Math.round(OK.Covers.Utils.remap(pageCount, minPageCount, maxPageCount, minBranch, maxBranch)) // 17

  var branchSchrink = 0.95
  var branchAngle = 15 + Math.random() * 15
  var branchInitLen = area.canvas.width * (0.09 + Math.random() * 0.07)
  var branchStartX = 218

  // var branchInitLen = 200 //area.canvas.width * (pageCount/250 + Math.random() * 0.08)
  // var branchStartX = 200 //area.canvas.width * (0.3 + 0.5 * Math.random())

  var branchingChance = 0.75 + Math.random() * 0.2
  function grow () {
    if (buds.length == 0) {
      return
    }

    var bud = buds.shift()
    var nx = bud.x + bud.len * Math.cos(bud.dir / 180 * Math.PI)
    var ny = bud.y + bud.len * Math.sin(bud.dir / 180 * Math.PI)
    area.line(bud.x, bud.y, nx, ny)

    if (bud.level >= branchMaxLevel) {
      return // die
    }

    var chance = Math.random()
    if (chance < 0.25) { // go forward the same way
      bud.length *= branchSchrink
      buds.push({
        x: nx,
        y: ny,
        dir: bud.dir,
        len: bud.len * branchSchrink,
        level: bud.level + 1
      })
    } else if (chance < branchingChance || bud.level <= 2) { // split
      buds.push({
        x: nx,
        y: ny,
        dir: bud.dir - branchAngle,
        len: bud.len * branchSchrink,
        level: bud.level + 1
      })
      buds.push({
        x: nx,
        y: ny,
        dir: bud.dir + branchAngle,
        len: bud.len * branchSchrink * branchSchrink,
        level: bud.level + 1
      })
    } else {
      // do nothing / die
    }

    grow()
  }

  buds.push({
    x: branchStartX,
    y: area.canvas.height,
    dir: -90,
    len: branchInitLen,
    level: 0
  })
  grow()

  while (buds.length > 0) {
    grow()
  }

  area.fill(false).stroke('#333333', 1)

  // branchAngle = 15 + Math.random() * 15
  // branchInitLen = area.canvas.width * (0.09 + Math.random() * 0.07)
  branchStartX += 10

  buds.push({
    x: branchStartX,
    y: area.canvas.height,
    dir: -90,
    len: branchInitLen,
    level: 0
  })
  grow()

  area.restore()
  area.stroke(false)
  var stack = []

  style.mainColor = chroma.hsl(hue, 0.8, 0.2).hex()// console.log('parent colour: ' + document.getElementById('child_colour').value) //= chroma.hsl(hue, 0.4, 0.4).hex()
  style.fillColor = lightColor
}
