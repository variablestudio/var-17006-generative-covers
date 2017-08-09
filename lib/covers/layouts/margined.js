const Crayon = require('../../crayons')
const typo = require('../../typography')
const utils = require('../../utils')
const patterns = require('../patterns')

var crayon
var letters = new Array('', '', '', '')
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
    // crayon.fill('#FF9000').rect(0, 0, crayon.canvas.width, crayon.canvas.height);

  style.mainColor = '#FBFBFB'
  var pattern = 3 // Math.round(Math.random()*5);
  switch (pattern) {
        // Pattern selector
    case 0:
      patterns.ChaoticCircles(crayon.context, 0, 0, crayon.canvas.width, crayon.canvas.height, book.sectionCount, style)
      break
    case 1:
      patterns.MarcinTilesControlB(crayon, 0, 50, 550, 700, 16, 96, style)
      break
    case 2:
      patterns.MarcinLinesControl(crayon, 0, 0, crayon.canvas.width, crayon.canvas.height, style)
      break
    case 3:
      patterns.FractalTreeControlII(crayon, 200, 200, 400, 400, book.pageCount, style)
      break
    case 4:
      patterns.Hexagons(crayon.context, crayon.canvas.width, crayon.canvas.height, style)
      break
    case 5:
      var randMode = Math.round(Math.random() * 2)
      var randCols = 5 + Math.round(Math.random() * 7)
      var randRows = randCols + 2
      var clusterSize = 550 / randCols
      var posx = 0
      var posy = 0// crayon.canvas.height - 50 - randRows*clusterSize;
      patterns.PixelGrid(crayon.context, 0, 50, randCols, randRows, clusterSize, randMode, style)
      break

    case 6:
      var year = book.year
      var author = typo.formatAuthorName(book.author)

      letters[0] = author.surname.charAt(0)
      letters[1] = author.name.charAt(0)
      letters[2] = year.charAt(2)
      letters[3] = year.charAt(3)
      patterns.DividedLetters(crayon, 200, 200, 400, 400, letters)
      break
  }

    // crayon.context.fillStyle = 'f5f4ea';
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

   // crayon.font(fonts.titleFamily+fonts.titleFont, titleFontSize, fonts.titleStyle, 0).fill('#000000').paragraph('right', fonts.titleLine, titleWidth, true).text(title);
  wrapText(crayon.context, title, 140, 400, 260, 30)
        // crayon.font(fonts.titleFamily+fonts.titleFont, titleFontSize * 0.75, fonts.titleStyle, 0).fill('#000000').paragraph('right', fonts.titleLine, titleWidth, true).text(subTitle, 0, titleFontSize / 4);

  var titleLines = typo.breakLines(crayon, book.title, titleWidth)
  var titleMeasurements = crayon.measureText(titleLines)
  var titleAscent = -titleMeasurements.y

    // titleY += titleAscent;

    // titleY += shiftY;

  function wrapText (context, text, x, y, maxWidth, lineHeight) {
    var cars = text.split('\n')
    var counter = 0
        // ctx.fillStyle = '#000000';

    for (var ii = 0; ii < cars.length; ii++) {
      var line = ''
      var words = cars[ii].split(' ')

      for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' '
        var metrics = context.measureText(testLine)
        var testWidth = metrics.width

        if (testWidth > maxWidth) {
          context.fillStyle = '#f2f6e9'
          context.fillRect(x + 395 - testWidth, y - lineHeight / 2 * 1.2 - 8, testWidth + 20, lineHeight * 1.2)
          context.textAlign = 'end'
          context.fillStyle = 'black'
          context.fillText(line, x + 395, y)
          line = words[n] + ' '
          y += lineHeight
          counter++
        } else {
                    // ctx.fillStyle = 'red';
                    // ctx.fillRect(start_x - 10, start_y - 30, 400, 200);
                    // ctx.fillStyle = '#0000FF';
          line = testLine
        }
      }

      context.fillStyle = '#f2f6e9'
      context.fillRect(x + 395 - testWidth, y - lineHeight / 2 * 1.2 - 8, testWidth + 20, lineHeight * 1.2)
      context.fillStyle = 'black'
      context.textAlign = 'end'
      context.fillText(line, x + 395, y)
      y += lineHeight
    }
  }

  crayon.context.font = 'normal ' + authorFontSize + 'px' + ' ' + fonts.authorFamily + fonts.authorFont
  crayon.font(fonts.authorFamily + fonts.authorFont, authorFontSize, author.surnameStyle, 0).fill('#000000').paragraph('right', 0.25, titleWidth, false).text(author.surname, 0, authorFontSize / 2)
  crayon.font(fonts.authorFamily + fonts.authorFont, authorFontSize, author.nameStyle, 0).fill('000000').paragraph('right', -0.25, titleWidth, true).text(author.name, 0 + crayon.context.measureText(author.surname + '').width, authorFontSize / 2)

  utils.addCover()
}

module.exports = {
  name: 'Margined',
  makeCover: makeCover
}
