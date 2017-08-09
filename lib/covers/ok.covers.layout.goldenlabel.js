const Crayon = require('../crayons')
const typo = require('../typography')
const utils = require('../utils')
const patterns = require('./patterns')
var child_colour = 'hsl(100, 50%, 50%)'

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

  crayon.fill('#FAFAF0').rect(0, 0, crayon.canvas.width, crayon.canvas.height)

  style.mainColor = '#DEDEDE'
  var pattern = Math.round(Math.random() * 5)
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
  crayon.context.fillStyle = style.mainColor
  crayon.context.fillRect(0, 258, 268, crayon.canvas.height - 268 - 50)

  var fonts = typo.pairSelector(this.name, book.title)
  var author = typo.formatAuthorName(book.author)

  var titleFontSize = crayon.canvas.height * 0.046
  var authorFontSize = titleFontSize * fonts.PairRatio

  var titleX = crayon.canvas.width * (0.3 + 0.07)
  var titleY = 268 + titleFontSize
  var titleWidth = 258 * 0.70

  var titleSections = typo.breakTitle(book.title)
  var title = titleSections[0]
  var subTitle = titleSections[1]

  title = typo.addLigatures(title, fonts.titleFamily)

  crayon.translate(titleX, titleY)

  crayon.font(fonts.authorFamily + fonts.authorFont, authorFontSize, author.surnameStyle, 0).fill('#000000').paragraph('right', -0.5, titleWidth, true).text(author.surname, 0, authorFontSize / 2)
  crayon.font(fonts.authorFamily + fonts.authorFont, authorFontSize, author.nameStyle, 0).fill('#000000').paragraph('right', 2.5, titleWidth, true).text(author.name, 0, authorFontSize / 2)

  crayon.font(fonts.titleFamily + fonts.titleFont, titleFontSize, fonts.titleStyle, 0).fill('#FFFFFF').paragraph('right', fonts.titleLine, titleWidth, true).text(title)
  crayon.font(fonts.titleFamily + fonts.titleFont, titleFontSize * 0.75, fonts.titleStyle, 0).fill('#FFFFFF').paragraph('right', fonts.titleLine, titleWidth, true).text(subTitle, 0, titleFontSize / 4)

  console.log(fonts.titleFamily)
        // crayon.context.font = 'normal ' + authorFontSize + 'px BenchNine';
        // var randAuthor = Math.round(Math.random());

  utils.addCover()
}

module.exports = {

  name: 'GoldenLabel',
  makeCover: makeCover
}
