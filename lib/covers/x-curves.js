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

  var borderScale = 1 + Math.random()
  var hue = Math.random() * 360
  var minPageCount = 10
  var maxPageCount = 500
  var numX = utils.remap(book.pageCount, minPageCount, maxPageCount, 2, 100, true)

  var margins = 0

  crayon.clear()

  var niceBlue = '#27D1E7'
  var paleYellow = 'rgb(255, 255, 255)'
  var colorHSL = chroma.hex(niceBlue).hsl()
  var color = chroma.hsl(hue, 0.8, colorHSL[2]).hex()
  var lightColor = chroma.hsl(hue, 0.8, colorHSL[2] * 1.5).hex()
  var darkColor = chroma.hsl(hue, 0.8, colorHSL[2] * 0.5).hex()

  crayon.fill(paleYellow).rect(margins, margins, crayon.canvas.width - 2 * margins, crayon.canvas.height - 2 * margins)

  var author = typo.formatAuthorName(book.author)

  crayon.style('lines').fill(false).stroke('rgba(30, 30, 30, 0.2)')

  var w = crayon.canvas.width
  var h = crayon.canvas.height
  for (var i = 0; i < numX; i++) {
    crayon.stroke('rgba(30, 30, 30, 1)', 1 + 20 * Math.random())
    crayon.line(w / 2, h, i / numX * w, 0)
  }

  var authorFontSize = crayon.canvas.height * 0.03
  var titleFontSize = crayon.canvas.height * 0.05

  var shiftY = 50

  var titleX = crayon.canvas.width * 0.08
  var titleY = crayon.canvas.width * 0.08
  var titleWidth = crayon.canvas.width * 0.8

  crayon.style('title').font('Arial', titleFontSize, 'bold').paragraph('left', 0.25).fill(darkColor)

  var titleLines = typo.breakLines(crayon, book.title.toUpperCase(), titleWidth)
  var titleMeasurements = crayon.measureText(titleLines)
  var titleAscent = -titleMeasurements.y

  titleY += titleAscent

  //titleY += shiftY;

  crayon.style('author').font('Verdana', authorFontSize).fill(darkColor)
  var authorMeasurements = crayon.measureText(author)

  crayon.style('title').text(titleLines, titleX, titleY)
  crayon.style('author').text(author.name + " " + author.surname, titleX, titleY + titleMeasurements.height)

  utils.addCover()
}

module.exports = {
  name: 'Curves',
  makeCover: makeCover
}
