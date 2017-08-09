const Crayon = require('../crayons')
const typo = require('../typography')
const utils = require('../utils')

var crayon
var img_matrix = new Array(16)
var letters = new Array('', '', '', '')

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

function renderMatrix (bm_data) {
  for (var y = 0; y < 3; y++) {
    for (var x = 0; x < 3; x++) {
      var side_width = quarter_width
      // var side_width = crayon.canvas.width * 0.55;
      crayon.context.putImageData(bm_data[Math.round(Math.random() * 15)], quarter_x + x * side_width / 2 * 1.02, quarter_y + y * side_width / 2 * 1.02)
    }
  }
}

function drawLetters (letters, x, y, side) {
  var draw_canvas = document.createElement('canvas')
  draw_canvas.width = quarter_width
  draw_canvas.height = quarter_width
  var d = draw_canvas.getContext('2d')

  for (var l = 0; l < 4; l++) {
    d.fillStyle = 'rgb(' + (200 + (25 - Math.round(Math.random() * 50))) + ', 130, 155)'
    d.fillRect(x, y, side, side)

    var fontScale = side * 1.45
    d.fillStyle = '#3b253c'
    d.font = 'bold ' + fontScale + 'px Arial'

    var metrics = d.measureText(letters[l])
    var width = metrics.width

    d.fillText(letters[l], x + side / 2 - width / 2, y + side / 2 + fontScale / 2.85)

    img_matrix[(l * 4 + 0)] = d.getImageData(x, y, side / 2, side / 2)
    img_matrix[(l * 4 + 1)] = d.getImageData(x + side / 2, y, side / 2, side / 2)
    img_matrix[(l * 4 + 2)] = d.getImageData(x, y + side / 2, side / 2, side / 2)
    img_matrix[(l * 4 + 3)] = d.getImageData(x + side / 2, y + side / 2, side / 2, side / 2)
  }

  // console.log("BD: " + img_matrix[0]);
}

function makeCover (book) {
  if (!crayon) {
    crayon = new Crayon(document.getElementById('cover'))
  }

  crayon.clear()
  crayon.style('default')

  quarter_width = Math.round((crayon.canvas.width - 100) / 4 * 3) / 1.5
  quarter_height = Math.round((crayon.canvas.height - 100) / 4 * 3) / 1.5
  quarter_x = 100 + (crayon.canvas.width - 100) / 4
  quarter_y = 50 + (crayon.canvas.height - 100) / 4

  var author = typo.formatAuthorName(book.author)
  var year = book.year

  var paper = paperAging(year)
  crayon.fill(paper).rect(0, 0, crayon.canvas.width, crayon.canvas.height)

  letters[0] = author.name.charAt(0)
  letters[1] = author.surname.charAt(0)
  letters[2] = year.charAt(2)
  letters[3] = year.charAt(3)

  drawLetters(letters, 0, 0, quarter_width)
  renderMatrix(img_matrix)

  // console.log(letters);

  var authorFontSize = crayon.canvas.height * 0.03
  var titleFontSize = crayon.canvas.height * 0.05

  var titleX = quarter_x
  var titleY = quarter_y + quarter_width * 1.7 + crayon.canvas.width * 0.01
  var titleWidth = crayon.canvas.width * 0.4

  var longest = typo.longestWord(book.title)

  var titleSections = typo.breakTitle(book.title)
  var title = titleSections[0]
  var subTitle = titleSections[1]
  // crayon.save();
  crayon.context.textAlign = 'left'
  crayon.save()
  crayon.translate(titleX, titleY)
  crayon.font('BenchNineLight', titleFontSize, 'normal').fill('#000000')
    .paragraph('left', -0.2 * 0, titleWidth, true).text(title)
  crayon.font('BenchNineLight', titleFontSize * 0.85, 'normal').fill('#000000').paragraph('left', -0.2 * 0, titleWidth, true).text(subTitle, 0, titleFontSize / 4)
  crayon.restore()
  // crayon.font("UbuntuCondensed", authorFontSize, author.nameStyle).fill("#313131").paragraph("left", 0.25, titleWidth, false).text(author.name, 0, authorFontSize/2);
  // 0 + name.pixelLength of author.name + " "
  crayon.context.font = authorFontSize + 'px UbuntuCondensed'
  var tmp = crayon.context.measureText(author.surname + '').width
  var tmp1 = crayon.context.measureText(author.name + '' + author.surname).width
  // crayon.restore()
  // crayon.translate(-quarter_width*2, quarter_width/3);
  crayon.context.textAlign = 'right'
  crayon.context.fillText(author.name, crayon.canvas.width - 50 - tmp1, 54)
  crayon.context.fillText(author.surname, crayon.canvas.width - 50, 54)
  // crayon.context.fillText(author.surname, quarter_x, quarter_width / 2)
  // crayon.translate(tmp, 0);
  // crayon.font("UbuntuCondensed", authorFontSize, author.surnameStyle).fill("#313131").paragraph("left", -0.25, titleWidth, true).text(author.surname, 0, authorFontSize/2);

  utils.addCover()
}

module.exports = {
  name: 'Divided',
  makeCover: makeCover
}
