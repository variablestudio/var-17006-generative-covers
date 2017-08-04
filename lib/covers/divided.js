const Crayon = require('../crayons')
const typo = require('../typography')
const utils = require('../utils')

var crayon
var imgMatrix = new Array(16)
var letters = ['', '', '', '']

function paperAging (year) {
  // 1950 - 230/200/150
  // 25/55/95

  var currentTime = new Date()
  var currentYear = currentTime.getFullYear()

  var range = currentYear - 1950
  var timepos = currentYear - year

  var r = 255 - Math.round(timepos / range * 25)
  var g = 255 - Math.round(timepos / range * 55)
  var b = 255 - Math.round(timepos / range * 95)

  return 'rgb(' + r + ', ' + g + ', ' + b + ')'
}

function renderMatrix (data) {
  for (var y = 0; y < 3; y++) {
    for (var x = 0; x < 3; x++) {
      var sideWidth = crayon.canvas.width * 0.55
      // var sideWidth = crayon.canvas.width * 0.55;
      crayon.context.putImageData(data[Math.round(Math.random() * 15)], 52 + x * sideWidth / 2 * 1.02, 250 + y * sideWidth / 2 * 1.02)
    }
  }
}

function drawLetters (letters, x, y, side) {
  var drawCanvas = document.createElement('canvas')
  drawCanvas.width = crayon.canvas.width * 0.55
  drawCanvas.height = crayon.canvas.width * 0.55
  var d = drawCanvas.getContext('2d')

  for (var l = 0; l < 4; l++) {
    d.fillStyle = 'rgb(' + (200 + (25 - Math.round(Math.random() * 50))) + ', 130, 155)'
    d.fillRect(x, y, side, side)

    var fontScale = side * 1.45
    d.fillStyle = '#3b253c'
    d.font = 'bold ' + fontScale + 'px Arial'

    var metrics = d.measureText(letters[l])
    var width = metrics.width

    d.fillText(letters[l], x + side / 2 - width / 2, y + side / 2 + fontScale / 2.85)

    imgMatrix[(l * 4 + 0)] = d.getImageData(x, y, side / 2, side / 2)
    imgMatrix[(l * 4 + 1)] = d.getImageData(x + side / 2, y, side / 2, side / 2)
    imgMatrix[(l * 4 + 2)] = d.getImageData(x, y + side / 2, side / 2, side / 2)
    imgMatrix[(l * 4 + 3)] = d.getImageData(x + side / 2, y + side / 2, side / 2, side / 2)
  }

  // console.log("BD: " + imgMatrix[0]);
}

function makeCover (book) {
  if (!crayon) {
    crayon = new Crayon(document.getElementById('cover'))
  }

  crayon.clear()
  crayon.style('default')

  console.log('divided.makeCover', book.author)
  var author = typo.formatAuthorName(book.author)
  var year = book.year

  var paper = paperAging(year)
  crayon.fill(paper).rect(0, 0, crayon.canvas.width, crayon.canvas.height)

  letters[0] = author.name[0].charAt(0)
  letters[1] = author.surname[0].charAt(0)
  letters[2] = year.charAt(2)
  letters[3] = year.charAt(3)

  drawLetters(letters, 0, 0, crayon.canvas.width * 0.55)
  renderMatrix(imgMatrix)

  // console.log(letters);

  var authorFontSize = crayon.canvas.height * 0.03
  var titleFontSize = crayon.canvas.height * 0.05

  var titleX = crayon.canvas.width * 0.08
  var titleY = crayon.canvas.width * 0.1
  var titleWidth = crayon.canvas.width * 0.4

  // var longest = OK.Covers.Typography.longestWord(book.title)

  var titleSections = typo.breakTitle(book.title)
  var title = titleSections[0]
  var subTitle = titleSections[1]
italic
  // crayon.save()
  crayon.translate(titleX, titleY)
  crayon.font('BenchNineLight', titleFontSize, 'normal').fill('#000000').paragraph('left', -0.2, titleWidth, true).text(title)
  crayon.font('BenchNineLight', titleFontSize * 0.85, 'normal').fill('#000000').paragraph('left', -0.2, titleWidth, true).text(subTitle, 0, titleFontSize / 4)
  // crayon.restore()
  // crayon.font("UbuntuCondensed", authorFontSize, author[1][1]).fill("#313131").paragraph("left", 0.25, titleWidth, false).text(author[1][0], 0, authorFontSize/2);
  // 0 + name.pixelLength of author[1][0] + " "
  crayon.context.font = authorFontSize + 'px UbuntuCondensed'
  var tmp1 = crayon.context.measureText(author.surname[0] + '' + author.name[0]).width
  crayon.context.textAlign = 'right'
  crayon.context.fillText(author.surname[0], crayon.canvas.width - 50 - tmp1, 54)
  crayon.context.fillText(author.name[0], crayon.canvas.width - 50, 54)
  // crayon.paragraph('right', 0, 0)
  // crayon.text(author.surname[0], crayon.canvas.width - 50 - tmp1, 54)
  // crayon.text(author.name[0], crayon.canvas.width - 50, 54)
  // crayon.translate(tmp, 0);
  // crayon.font("UbuntuCondensed", authorFontSize, author[0][1]).fill("#313131").paragraph("left", -0.25, titleWidth, true).text(author[0][0], 0, authorFontSize/2);
  utils.addCover()
}

module.exports = {
  name: 'Divided',
  makeCover: makeCover
}
