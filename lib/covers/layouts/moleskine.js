const Crayon = require('../../crayons')
const typo = require('../../typography')
const utils = require('../../utils')
const patterns = require('../patterns')

var crayon
var style = {
  mainColor: '#FFFFFF'
}

function makeCover (book) {
  if (!crayon) {
    crayon = new Crayon(document.getElementById('cover'))
  }

  crayon.clear()
  crayon.style('default')

    // crayon.fill('#FF9000').rect(0, 0, crayon.canvas.width, crayon.canvas.height);

  style.mainColor = '#DEDEDE'
  var pattern = Math.round(Math.random() * 5)
  pattern = 0
  switch (pattern) {
        // Pattern selector
    case 0:
      patterns.ChaoticCircles(crayon.context, 0, 0, crayon.canvas.width, crayon.canvas.height, book.sectionCount, style)
      break
    case 1:
      patterns.MarcinTiles(crayon, 0, 0, crayon.canvas.width, crayon.canvas.height, 32, 128, style)
      break
    case 2:
      patterns.MarcinLines(crayon, 0, 0, crayon.canvas.width, crayon.canvas.height, style)
      break
    case 3:
      patterns.FractalTree(crayon, 0, 0, crayon.canvas.width, crayon.canvas.height, book.pageCount, style)
      break
    case 4:
      patterns.Hexagons(crayon.context, crayon.canvas.width, crayon.canvas.height, style)
      break
    case 5:
      var randMode = Math.round(Math.random() * 2)
      var randCols = 5 + Math.round(Math.random() * 7)
      var randRows = randCols + 4
      var clusterSize = (crayon.canvas.width) / randCols
      var posx = 0
      var posy = 0// crayon.canvas.height - 50 - randRows*clusterSize;
      patterns.PixelGrid(crayon.context, posx, posy, randCols, randRows, clusterSize, randMode, style)
      break
  }
        // crayon.context.fillStyle = style.mainColor;
        // crayon.context.fillRect(0, 258, 268, crayon.canvas.height - 268 - 50);

  var fonts = typo.pairSelector(this.name, book.title)
  var author = typo.formatAuthorName(book.author)

  var titleSections = typo.breakTitle(book.title)
  var title = titleSections[0]
  var subTitle = titleSections[1]
  title = typo.addLigatures(title, fonts.titleFamily)

  var authorFontSize = crayon.canvas.height * 0.03
  var titleFontSize = crayon.canvas.height * 0.08

  // var shiftY = 50

  // var titleX = crayon.canvas.width * 0.08
  // var titleY = crayon.canvas.height - 800 / 2 - 800 / 6 - 30
  var titleWidth = crayon.canvas.width * 0.84

    // crayon.style('default').fill(paleYellow).rect(margins, margins + shiftY, crayon.canvas.width - 2 * margins, titleY + titleMeasurements.height*1.5 + authorMeasurements.height + titleAscent/2 - shiftY);

  crayon.context.fillStyle = '#FFFFFF'
  crayon.context.fillRect(0, crayon.canvas.height - 800 / 2 - 800 / 6, 600, 800 / 3)

    // crayon.style('title').text(titleLines, titleX, titleY);
    // crayon.style('author').text(author, titleX, crayon.canvas.height - 40);

  crayon.translate(50, 115)

  crayon.font(fonts.titleFamily + fonts.titleFont, titleFontSize, fonts.titleStyle, 0).fill('#000000').paragraph('left', fonts.titleLine, titleWidth, true).text(title)
  crayon.font(fonts.titleFamily + fonts.titleFont, titleFontSize * 0.75, fonts.titleStyle, 0).fill('#000000').paragraph('left', fonts.titleLine, titleWidth, true).text(subTitle, 0, titleFontSize / 4)

  var titleLines = typo.breakLines(crayon, book.title, titleWidth)
  var titleMeasurements = crayon.measureText(titleLines)
  var titleAscent = -titleMeasurements.y

  // titleY += titleAscent

    // titleY += shiftY;

  if (Math.round(Math.random()) === 0) {
    crayon.font(fonts.authorFamily + fonts.authorFont, authorFontSize, author.surnameStyle, 0).fill('#000000').paragraph('left', 0.25, titleWidth, false).text(author.surname, 0, authorFontSize / 2)
    crayon.context.font = 'normal ' + authorFontSize + 'px' + ' ' + fonts.authorFamily + fonts.authorFont
    crayon.font(fonts.authorFamily + fonts.authorFont, authorFontSize, author.nameStyle, 0).fill('#000000').paragraph('left', -0.25, titleWidth, true).text(author.name, 0 + crayon.context.measureText(author.surname + ' ').width, authorFontSize / 2)
  } else {
    crayon.font(fonts.authorFamily + fonts.authorFont, authorFontSize, author.surnameStyle, 0).fill('#000000').paragraph('left', -0.5, titleWidth, true).text(author.surname, 0, authorFontSize / 2)
    crayon.font(fonts.authorFamily + fonts.authorFont, authorFontSize, author.nameStyle, 0).fill('#000000').paragraph('left', 0.25, titleWidth, true).text(author.name, 0, authorFontSize / 2)
  }

  utils.addCover()
}
module.exports = {
  enabled: false,
  name: 'Moleskine',
  makeCover: makeCover
}
