const Crayon = require('../crayons')
const typo = require('../typography')
const utils = require('../utils')
const chroma = require('chroma-js')
const Pixels = require('../pixels')

var crayon

function makeCover (book) {
  if (!crayon) {
    crayon = new Crayon(document.getElementById('cover'))
  }

  crayon.style('default')

  var borderScale = 1 + Math.random()
  var hue = Math.random() * 60 - 30
  var hue2 = 175 + Math.random() * 50
  var minPageCount = 10
  var maxPageCount = 500
  var numX = utils.remap(book.pageCount, minPageCount, maxPageCount, 2, 100, true)

  var margins = 0

  crayon.clear()

  var niceBlue = '#27D1E7'
  var paleYellow = 'rgb(255, 255, 240)'
  var colorHSL = chroma.hex(niceBlue).hsl()
  var color = chroma.hsl(hue, 0.98, colorHSL[2]).hex()
  var color2 = chroma.hsl(hue2, 0.7, colorHSL[2]).hex()
  var lightColor = chroma.hsl(hue, 0.7, colorHSL[2] * 1.5).hex()
  var darkColor = chroma.hsl(hue, 0.8, colorHSL[2] * 0.5).hex()

  crayon.fill(paleYellow).rect(margins, margins, crayon.canvas.width - 2 * margins, crayon.canvas.height - 2 * margins)

  var author = typo.formatAuthorName(book.author)

  var w = crayon.canvas.width
  var h = crayon.canvas.height

    // crayon.style('blending').stroke(false);

  var shape2 = Math.floor(Math.random() * 2)

  var bg = Pixels.fromCanvas(crayon.canvas)

  crayon.clear()
  crayon.fill(color) // '#FF9900'
  var shape1 = Math.floor(Math.random() * 2)
  var n = 60
  if (shape1 == 1) n = 1
  for (var i = 0; i < n; i++) {
    color = chroma.hsl(hue, 0.97, colorHSL[2] + Math.random() * 0.2 * (1 - shape1)).hex()
    crayon.fill(color)
    var c1 = [w * 0.05 + Math.random() * w * 0.9, h * 0.05 + Math.random() * h * 0.9, w * 0.02 + Math.random() * w * 0.09]
    if (shape1 == 0) crayon.circle(c1[0], c1[1], c1[2])
    if (shape1 == 1) crayon.font('Arial', 1000, 'bold').text(book.title.substr(0, 1), c1[0] - 300, c1[1] + 300)
  }

  var blue = Pixels.fromCanvas(crayon.canvas)

  crayon.clear()
  crayon.fill(color2) // '#00DDFF'
  shape1 = Math.floor(Math.random() * 2)
  n = 60
  if (shape1 == 1) n = 1
  for (var i = 0; i < n; i++) {
    color2 = color2 = chroma.hsl(hue2, 0.7, colorHSL[2] + Math.random() * 0.2 * (1 - shape1)).hex()
    crayon.fill(color2)
    var c1 = [w * 0.05 + Math.random() * w * 0.9, h * 0.05 + Math.random() * h * 0.9, w * 0.01 + Math.random() * w * 0.04]
    if (shape1 == 0) crayon.circle(c1[0], c1[1], c1[2])
    if (shape1 == 1) crayon.font('Arial', 1000, 'bold').text(book.author.substr(0, 1), c1[0] - 300, c1[1] + 300)
  }
  var red = Pixels.fromCanvas(crayon.canvas)

  var blended
  blended = Pixels.blend(bg, red)
  blended = Pixels.blend(blended, blue)

    // blended = Pixels.blend(blended, orange);

    // Pixels.blend(Pixels.blend(bg, red), blue), orange
    // var blended = Pixels.blend(blue, red);
    // var blended = Pixels.blend(red, blue, 'cmyk');
  Pixels.draw(blended, crayon.canvas)

  var authorFontSize = crayon.canvas.height * 0.04
  var titleFontSize = crayon.canvas.height * 0.06

  var shiftY = 50

  var titleX = crayon.canvas.width * 0.08
  var titleY = crayon.canvas.width * 0.08
  var titleWidth = crayon.canvas.width * 0.8

  crayon.style('title').font('Arial', titleFontSize, 'bold').paragraph('left', 0.25).fill('#333333')

  var titleLines = typo.breakLines(crayon, book.title.toUpperCase(), titleWidth)
  var titleMeasurements = crayon.measureText(titleLines)
  var titleAscent = -titleMeasurements.y

  titleY += titleAscent

    // titleY += shiftY;

  crayon.style('author').font('Verdana', authorFontSize).fill('#333333')
  var authorMeasurements = crayon.measureText(author)

  crayon.style('title').fill('#333333').text(titleLines, titleX, titleY)
  crayon.style('author').fill('#333333').text(author.name + " " + author.surname, titleX, titleY + titleMeasurements.height)

    // crayon.clip(function(context) {
    //  context.beginPath();
    //  if (shape1 == 0) context.arc(c1[0], c1[1], c1[2], 0, 2 * Math.PI, false);
    //  if (shape1 == 1) { context.moveTo(c1[0], c1[1]); context.lineTo(c1[0]+c1[2], c1[1]); context.lineTo(c1[0]+c1[2], c1[1]+c1[2]); context.lineTo(c1[0], c1[1]+c1[2]);}
    //  if (shape2 == 0) context.arc(c2[0], c2[1], c2[2], 0, 2 * Math.PI, false);
    //  if (shape2 == 1) { context.moveTo(c2[0], c2[1]); context.lineTo(c2[0]+c2[2], c2[1]); context.lineTo(c2[0]+c2[2], c1[1]+c1[2]); context.lineTo(c1[0], c1[1]+c1[2]);}
    //  context.clip();
    // });

    // crayon.style('title').fill('#FFFFFF').text(titleLines, titleX, titleY);
    // crayon.style('author').fill('#FFFFFF').text(author.name + " " + author.surname, titleX, titleY + titleMeasurements.height);

  crayon.clip(false)

  utils.addCover()
}

module.exports = {
  name: 'Blend 2',
  makeCover: makeCover
}
