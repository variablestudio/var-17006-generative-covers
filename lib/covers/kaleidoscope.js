const Crayon = require('../crayons')
const typo = require('../typography')
const utils = require('../utils')

var crayon

function makeCover (book) {
  if (!crayon) {
    crayon = new Crayon(document.getElementById('cover'))
  }

  crayon.clear()
  crayon.style('default')

  crayon.fill('#27D1E7').rect(0, 0, crayon.canvas.width, crayon.canvas.height)

  var authorInfo = typo.formatAuthorName(book.author.toUpperCase())
  var author = authorInfo.name + ' ' + authorInfo.surname

  var authorFontSize = crayon.canvas.height * 0.04
  var titleFontSize = crayon.canvas.height * 0.06

  var titleX = crayon.canvas.width * 0.08
  var titleY = crayon.canvas.width * 0.08 + authorFontSize
  var titleWidth = crayon.canvas.width * 0.8

  var titleSections = typo.breakTitle(book.title)
  var title = titleSections[0]
  var subTitle = titleSections[1]

  crayon.style('drawing')
    // crayon.save();
  var nx = 2 + Math.floor(Math.random() * 10)
  var ny = 1
  var thickness = 25 + Math.random() * 25
  var y1 = Math.random() * crayon.canvas.height
  var y1w = Math.random() * crayon.canvas.height
  var y2 = Math.random() * crayon.canvas.height
  var y2w = Math.random() * crayon.canvas.height
  var y11 = Math.random() * crayon.canvas.height
  var y11w = Math.random() * crayon.canvas.height
  var y12 = Math.random() * crayon.canvas.height
  var y12w = Math.random() * crayon.canvas.height
  for (var i = 0; i < nx; i++) {
    for (var j = 0; j < ny; j++) {
      var dx = crayon.canvas.width / nx
      var dy = crayon.canvas.height / ny
      crayon.clipRect(dx * i, dy * j, dx, crayon.canvas.height / ny)
      var rx = Math.random() * crayon.canvas.width
      crayon.stroke('#FF0000', thickness).fill(false).line(0 + rx, y1, crayon.canvas.width + rx, y2)
      crayon.stroke('#FFFFFF', thickness).fill(false).line(0 + rx, y1w, crayon.canvas.width + rx, y2w)
      crayon.stroke('#FF0000', thickness).fill(false).line(0 + rx, y11, crayon.canvas.width + rx, y12)
      crayon.stroke('#FFFFFF', thickness).fill(false).line(0 + rx, y11w, crayon.canvas.width + rx, y12w)
    }
  }
    // crayon.restore();

  crayon.save()
  crayon.translate(titleX, titleY)
  crayon.style('text')
  crayon.font('Arial', titleFontSize, 'bold')
    .fill('#000000').paragraph('left', 0.25, titleWidth, true)
    .text('NOT AUTH' + title.toUpperCase())
  crayon.font('Arial', titleFontSize * 0.5, 'normal')
    .fill('#000000').paragraph('left', 0.25, titleWidth, true)
    .text(subTitle.toUpperCase(), 0, titleFontSize / 4)
  crayon.font('Arial', authorFontSize)
    .fill('#222222')
    .paragraph('left', 0.25, titleWidth, true)
    .text(author, 0, authorFontSize / 2)
  var offsetY = crayon.translateY
  crayon.restore()

  crayon.style('debug').fill('#FFFFFF').rect(0, 0, crayon.canvas.width, offsetY - titleY + titleFontSize * 1.5)

  crayon.save()
  crayon.translate(titleX, titleY)
  crayon.style('text')
  crayon.font('Arial', titleFontSize, 'bold')
    .fill('#000000').paragraph('left', 0.25, titleWidth, true).text(title.toUpperCase())
  crayon.font('Arial', titleFontSize * 0.5, 'normal').fill('#999')
    .paragraph('left', 0.25, titleWidth, true)
    .text(subTitle.toUpperCase(), 0, -titleFontSize * 0.25)
  crayon.font('Arial', authorFontSize).fill('#222222')
    .paragraph('left', 0.25, titleWidth, true).text(author, 0, authorFontSize / 2)
  crayon.restore()

  utils.addCover()
}

module.exports = {
  enabled: false,
  name: 'Kaleidoscope',
  makeCover: makeCover
}
