const Crayon = require('../crayons')
const typo = require('../typography')
const utils = require('../utils')
const chroma = require('chroma-js')

var crayon

function makeCover (book) {
  if (!crayon) {
    crayon = new Crayon(document.getElementById('cover'))
  }

  crayon.style('default')

  var minPageCount = 10
  var maxPageCount = 500

  var hue = 75 + Math.random() * 100
  var margins = 0

  crayon.clear()

  var niceBlue = '#27D1E7'
  var paleYellow = 'rgb(255, 255, 240)'
  var colorHSL = chroma.hex(niceBlue).hsl()
  var color = chroma.hsl(hue, 0.8, 0.2).hex()
  var lightColor = chroma.hsl(hue, 0.5, colorHSL[2] * 1.2).hex()

  crayon.fill(lightColor).rect(margins, margins, crayon.canvas.width - 2 * margins, crayon.canvas.height - 2 * margins)

  crayon.fill(false).stroke('rgba(255, 255, 255, 0.15)', 3)

  var buds = []
  crayon.save()

  var branchSchrink = 0.95
  var branchMaxLevel = 17
  var branchAngle = 15 + Math.random() * 15
  var branchInitLen = crayon.canvas.height * (0.08 + Math.random() * 0.07)
  var branchStartX = crayon.canvas.width * (0.3 + 0.5 * Math.random())

  var branchingChance = 0.7 + Math.random() * 0.2
  function grow (level) {
    if (buds.length == 0) {
      return
    }

    var bud = buds.shift()
    var nx = bud.x + bud.len * Math.cos(bud.dir / 180 * Math.PI)
    var ny = bud.y + bud.len * Math.sin(bud.dir / 180 * Math.PI)
    crayon.line(bud.x, bud.y, nx, ny)

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

    if (level < 500) {
      grow(level+1)
    }
  }

  buds.push({
    x: branchStartX,
    y: crayon.canvas.height,
    dir: -90,
    len: branchInitLen,
    level: 0
  })
  grow(0)

  while (buds.length > 0) {
    grow()
  }

  crayon.fill(false).stroke('#333333', 1)

    // branchAngle = 15 + Math.random() * 15;
    // branchInitLen = crayon.canvas.width * (0.09 + Math.random() * 0.07);
  branchStartX += 10

  buds.push({
    x: branchStartX,
    y: crayon.canvas.height,
    dir: -90,
    len: branchInitLen,
    level: 0
  })
  grow()

  crayon.restore()

  var stack = []

  golden_width = Math.round(crayon.canvas.width / 1.61803398875)
  golden_height = Math.round(crayon.canvas.height / 1.61803398875)
  golden_x = crayon.canvas.width - golden_width
  golden_y = crayon.canvas.height - golden_height

  var author = typo.formatAuthorName(book.author)

  var authorFontSize = crayon.canvas.height * 0.02
  var titleFontSize = crayon.canvas.height * 0.04

  var shiftY = 20

  var titleX = crayon.canvas.width * 0.06
  var titleY = crayon.canvas.height * 0.33 + crayon.canvas.width * 0.08
  var titleWidth = crayon.canvas.width * 0.8

  var titleLines = typo.breakLines(crayon, book.title.toUpperCase(), titleWidth)
  var titleMeasurements = crayon.measureText(titleLines)
  var titleAscent = -titleMeasurements.y

  var titleSections = typo.breakTitle(book.title)
  var title = titleSections[0]
  var subTitle = titleSections[1]

  //crayon.style('author').font('Libre Baskerville', authorFontSize).fill('#333333');
  var authorMeasurements = crayon.measureText(author)

  crayon.style('default').stroke(false).fill(lightColor).rect(0, crayon.canvas.height * 0.33, crayon.canvas.width, crayon.canvas.height * 0.33)
  crayon.style('default').stroke(false).fill(lightColor).rect(golden_x, golden_width, crayon.canvas.width - golden_x, crayon.canvas.height)

    // crayon.style('title').text(titleLines, titleX, titleY);
    // crayon.style('author').text(author, titleX, titleY + titleMeasurements.height);
  crayon.save()
  crayon.translate(titleX, titleY)
  crayon.font('Anaheim', titleFontSize, 'bold', 0).fill('#000000').paragraph('left', 0.25, titleWidth, true).text(title.toUpperCase())
  crayon.font('Anaheim', titleFontSize * 0.85, 'normal', 0).fill('#000000').paragraph('left', 0.25, titleWidth, true).text(subTitle, 0, titleFontSize / 4)
  crayon.restore()
  //0 + name.pixelLength of author.name + ' '

  crayon.style('#000000').stroke(true).line(0, crayon.canvas.height * 0.33, crayon.canvas.width, crayon.canvas.height * 0.33)
  crayon.style('#000000').stroke(true).line(0, crayon.canvas.height * 0.66, crayon.canvas.width, crayon.canvas.height * 0.66)
  crayon.style('#000000').stroke(true).line(golden_x, crayon.canvas.height * 0.66, golden_x, crayon.canvas.height)

  //crayon.font('Arial', authorFontSize, author.nameStyle, 0).fill('#FF9000').paragraph('left', 0.25, titleWidth, false).text(author.name, 0, authorFontSize/2);
  //crayon.font('Arial', authorFontSize, author.surnameStyle, 0).fill('#FF9000').paragraph('left', -0.25, titleWidth, true).text(author.surname, 0 + crayon.measureText(author.name + ' ').width, authorFontSize/2);


  utils.addCover()
}

module.exports = {
  name: 'Bio II',
  makeCover: makeCover
}
