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

  var borderScale = 1 + Math.random()
  var hue = Math.random() * 360
    // var numX = 2 + Math.floor(Math.random() * 10);
  var numX = utils.remap(book.pageCount, minPageCount, maxPageCount, 2, 17, true)
  var radius = (0.2 + 0.5 * Math.random())
  var radius2 = (0.1 + 0.4 * Math.random())
  var counterLines = (Math.random() > 0.5) ? 0.1 : 0

  var margins = 0

  crayon.clear()

  var niceBlue = '#27D1E7'
  var paleYellow = 'rgb(255, 255, 255)'
  var colorHSL = chroma.hex(niceBlue).hsl()
  var color = chroma.hsl(hue, 0.7, colorHSL[2] * 1.1).hex()
  var lightColor = chroma.hsl(hue, 0.3, colorHSL[2] * 1.8).hex()

  //bg
  crayon.fill(color).rect(margins, margins, crayon.canvas.width - 2 * margins, crayon.canvas.height - 2 * margins)

  var stepX = crayon.canvas.width / (numX + 1)
  var stepY = stepX
  var r = stepX * radius
  var r2 = stepX * radius2 * 0.25

  crayon.fill(lightColor).stroke(false)

  for (var x = 0; x <= crayon.canvas.width + stepX / 2; x += stepX) {
    for (var y = 0; y <= crayon.canvas.height + stepY / 2; y += stepY) {
      var leftOrRight = Math.floor(Math.random() * 2)
      crayon.save()
      crayon.translate(x, y)
      crayon.rotate(-45)
      crayon.scale(borderScale, borderScale)
      if (leftOrRight) crayon.rect(-r, -r2, r * 2, r2 * 2).rotate(90).rect(-r, -r2 * counterLines, r * 2, r2 * 2 * counterLines)
      if (!leftOrRight) crayon.rect(-r, -r2 * counterLines, r * 2, r2 * 2 * counterLines).rotate(90).rect(-r, -r2, r * 2, r2 * 2)
      crayon.restore()
    }
  }

  var author = typo.formatAuthorName(book.author)

  var authorFontSize = crayon.canvas.height * 0.03
  var titleFontSize = crayon.canvas.height * 0.05

  var shiftY = crayon.canvas.height * 1/3 //50

  var titleX = crayon.canvas.width * 0.08
  var titleY = crayon.canvas.width * 0.08
  var titleWidth = crayon.canvas.width * 0.8

  crayon.style('title').font('Arial', titleFontSize, 'bold').paragraph('left', 0.25).fill('#333333')

  var titleLines = typo.breakLines(crayon, book.title, titleWidth)
  var titleMeasurements = crayon.measureText(titleLines)
  var titleAscent = -titleMeasurements.y

  titleY += titleAscent

  titleY += shiftY

  crayon.style('author').font('Gill Sans', authorFontSize).fill('#333333')
  var authorMeasurements = crayon.measureText(author)

  var gapHeight = 40

  crayon.style('default').fill(paleYellow).rect(margins, margins + shiftY, crayon.canvas.width - 2 * margins, titleY + titleMeasurements.height + authorMeasurements.height + titleAscent / 2 - shiftY + gapHeight)

  crayon.style('line').fill('#333333').rect(margins + titleX, titleY + titleMeasurements.height - 10, crayon.canvas.width - 2 * margins - titleX - titleX, 2)

  crayon.style('title').text(titleLines, titleX, titleY)

  crayon.translate(0, gapHeight)
  crayon.style('author').text(author.name + " " + author.surname, titleX, titleY + titleMeasurements.height)

  utils.addCover()
}

module.exports = {
  name: 'Rule2',
  makeCover: makeCover
}
