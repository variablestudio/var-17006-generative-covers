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

  var authorFontSize = crayon.canvas.height * 0.04
  var titleFontSize = crayon.canvas.height * 0.06

  var titleX = crayon.canvas.width * 0.08
  var titleY = crayon.canvas.width * 0.08 + authorFontSize
  var titleWidth = crayon.canvas.width * 0.8

  var titleSections = typo.breakTitle(book.title)
  var title = titleSections[0]
  var subTitle = titleSections[1]

  crayon.translate(titleX, titleY)
  crayon.font('Arial', titleFontSize, 'bold').fill('#000000').paragraph('left', 0.25, titleWidth, true).text(title)
  crayon.font('Arial', titleFontSize * 0.85, 'normal').fill('#000000').paragraph('left', 0.25, titleWidth, true).text(subTitle, 0, titleFontSize / 4)
  crayon.font('Arial', authorFontSize, author.nameStyle).fill('#D6D6D6').paragraph('left', 0.25, titleWidth, false).text(author.name, 0, authorFontSize / 2)
    // 0 + name.pixelLength of author.name + ' '
  crayon.font('Arial', authorFontSize, author.surnameStyle).fill('#D6D6D6').paragraph('left', -0.25, titleWidth, true).text(author.surname, 0, authorFontSize / 2)

  utils.addCover()
}

module.exports = {
  enabled: false,
  name: 'Simplest',
  makeCover: makeCover
}
