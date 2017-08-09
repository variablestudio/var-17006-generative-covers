const Crayon = require('../../crayons')
const typo = require('../../typography')
const utils = require('../../utils')
const patterns = require('../patterns')

var crayon
var letters = ['', '', '', '']
var style = {
  mainColor: '#FFFFFF',
  fillColor: 'FFFFFF'
}

function makeCover (book) {
  if (!crayon) {
    crayon = new Crayon(document.getElementById('cover'))
  }

  function paperAging (year) {
    // 1950 - 230/200/150
    // 25/55/95

    var currentTime = new Date()
    var currentYear = currentTime.getFullYear()

    var range = currentYear - 1950
    var timepos = currentYear - year

    var r = 235 - Math.round(timepos / range * 5)
    var g = 245 - Math.round(timepos / range * 15)
    var b = 250 - Math.round(timepos / range * 10)

    var outColor = 'rgb(' + r + ', ' + g + ', ' + b + ')'
    return outColor
  }

  crayon.clear()
  crayon.style('default')

  var year = book.year

  var paper = paperAging(year)
  crayon.fill(paper).rect(0, 0, crayon.canvas.width, crayon.canvas.height)
    // crayon.fill("#FF9000").rect(0, 0, crayon.canvas.width, crayon.canvas.height);

  style.mainColor = '#FBFBFB'
  var pattern = 4 // Math.round(Math.random()*5);
  switch (pattern) {
        // Pattern selector
    case 0:
      patterns.ChaoticCircles(crayon.context, 0, 0, crayon.canvas.width, crayon.canvas.height, book.sectionCount, style)
      break
    case 1:
      patterns.MarcinTilesControlA(crayon, 200, 200, 400, 400, 16, 96, style)
      break
    case 2:
      patterns.MarcinLinesControl(crayon, 0, 0, crayon.canvas.width, crayon.canvas.height, style)
      break
    case 3:
      patterns.FractalTreeControl(crayon, 200, 200, 400, 400, book.pageCount, style)
      break
    case 4:
      patterns.Hexagons(crayon.context, crayon.canvas.width, crayon.canvas.height, style)
      break
    case 5:
      var randMode = Math.round(Math.random() * 2)
      var randCols = 3 + Math.round(Math.random() * 7)
      var randRows = randCols
      var clusterSize = 400 / randCols
      // var posx = 0
      // var posy = 0// crayon.canvas.height - 50 - randRows*clusterSize;
      patterns.PixelGrid(crayon.context, 200, 200, randCols, randRows, clusterSize, randMode, style)
      break

    case 6:
      let year = book.year
      let author = typo.formatAuthorName(book.author)

      letters[0] = author.surname.charAt(0)
      letters[1] = author.name.charAt(0)
      letters[2] = year.charAt(2)
      letters[3] = year.charAt(3)
      patterns.DividedLetters(crayon, 50, 250, 500, 500, letters)
      break

    case 7:
      patterns.Superformula(crayon, 200, 200, 400, 400, Math.round(book.pageCount / 2), paper)
      break
  }

    // crayon.context.fillStyle = "f5f4ea";
    // crayon.context.fillRect(crayon.canvas.width*0.60, 0, crayon.canvas.width*0.40, crayon.canvas.height);

  var fonts = typo.pairSelector(this.name, book.title)
  var author = typo.formatAuthorName(book.author)

  var titleFontSize = crayon.canvas.height * 0.06
  var authorFontSize = titleFontSize * fonts.PairRatio

  var titleX = crayon.canvas.width * 0.33
  var titleY = crayon.canvas.height * 0.70 + titleFontSize
  var titleWidth = crayon.canvas.width * 0.60

  var titleSections = typo.breakTitle(book.title)
  var title = titleSections[0]
  var subTitle = titleSections[1]

  title = typo.addLigatures(title, fonts.titleFamily)

  crayon.translate(titleX, titleY)

  crayon.font(fonts.titleFamily + fonts.titleFont, titleFontSize, fonts.titleStyle, 0).fill('#000000').paragraph('left', fonts.titleLine, titleWidth, true).text(title) //
  crayon.font(fonts.titleFamily + fonts.titleFont, titleFontSize * 0.75, fonts.titleStyle, 0).fill('#000000').paragraph('left', fonts.titleLine, titleWidth, true).text(subTitle, 0, titleFontSize / 4) //

  var titleLines = typo.breakLines(crayon, book.title, titleWidth)
  var titleMeasurements = crayon.measureText(titleLines)
  var titleAscent = -titleMeasurements.y

  titleY += titleAscent

  // titleY += shiftY //

  crayon.font(fonts.authorFamily + fonts.authorFont, authorFontSize, author.surnameStyle, 0).fill('#000000').paragraph('left', -0.5, titleWidth, true).text(author.surname, 0, authorFontSize / 2) //
  crayon.font(fonts.authorFamily + fonts.authorFont, authorFontSize, author.nameStyle, 0).fill('#000000').paragraph('left', 0.25, titleWidth, true).text(author.name, 0, authorFontSize / 2) //

  utils.addCover()
}

module.exports = {
  name: 'SwissQuad',
  makeCover: makeCover
}
