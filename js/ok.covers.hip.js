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

  crayon.fill('#FF9000').rect(0, 0, crayon.canvas.width, crayon.canvas.height)

  var author = typo.formatAuthorName(book.author)

  var authorFontSize = crayon.canvas.height * 0.02
  var titleFontSize = crayon.canvas.height * 0.04

  var titleX = crayon.canvas.width / 2
  var titleY = crayon.canvas.width * 0.08 + 130
  var titleWidth = crayon.canvas.width * 0.4

  var titleSections = typo.breakTitle(book.title)
  var title = titleSections[0]
  var subTitle = titleSections[1]

  var numberOfSides = 6,
    size = 240,
    Xcenter = crayon.canvas.width / 2,
    Ycenter = crayon.canvas.width / 2

// crayon.context.rotate(-60);
  function polygon (ctx, x, y, radius, sides, startAngle, anticlockwise) {
    if (sides < 3) return
    var a = (Math.PI * 2) / sides
    a = anticlockwise ? -a : a
    crayon.context.save()
    crayon.context.translate(x, y)
    crayon.context.rotate(startAngle)
    crayon.context.moveTo(radius, 0)
    for (var i = 1; i < sides; i++) {
      crayon.context.lineTo(radius * Math.cos(a * i), radius * Math.sin(a * i))
    }
    crayon.context.closePath()
    crayon.context.restore()
  }

  crayon.context.beginPath()
  polygon(crayon.context, crayon.canvas.width / 2, crayon.canvas.width / 2, 240, 6, -Math.PI / 2)
  crayon.context.fillStyle = '#FFFFFF'
  crayon.context.fill()
  crayon.context.stroke()
// crayon.context.rotate(60);

  crayon.translate(titleX, titleY)
  crayon.context.font = titleFontSize + 'pt Arial'
  crayon.context.textAlign = 'center'
  crayon.context.fillStyle = 'black'
      // crayon.context.fillText(title, 300, 200, 300);
  crayon.font('Arial', titleFontSize, 'bold').fill('#000000').paragraph('center', 0.25, titleWidth, true).text(title)
    // crayon.font('Arial', titleFontSize*0.85, 'normal').fill('#000000').paragraph('center', 0.25, titleWidth, true).text(subTitle, 0, titleFontSize/4);
  crayon.font('Arial', authorFontSize, author.nameStyle).fill('#D6D6D6').paragraph('left', 0.25, titleWidth, false).text(author.name, 0, authorFontSize / 2)
    // 0 + name.pixelLength of author.name + ' '
  crayon.font('Arial', authorFontSize, author.surnameStyle).fill('#D6D6D6').paragraph('left', -0.25, titleWidth, true).text(author.surname, 0, authorFontSize / 2)

  utils.addCover()
}

module.exports = {
  enabled: false,
  name: 'Hip',
  makeCover: makeCover
}
