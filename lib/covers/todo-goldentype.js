const Crayon = require('../crayons')
const typo = require('../typography')
const utils = require('../utils')

var crayon
var initials = new Array('', '')
var golden_width = 0
var golden_height = 0
var golden_x = 0
var golden_y = 0
var mark = 0

function getPosition (imgData, width, height, mode) {
  var alpha = 0
  var stop = false

  switch (mode) {
    case 'left':
      for (var x = 0; x < width; x += 1) {
        for (var y = 0; y < height; y += 1) {
          alpha = imgData.data[y * width * 4 + x * 4 + 3]
          if (alpha < 128 && stop == false) {
            mark[0] = y * width * 4 + x * 4
            mark[1] = x
            mark[2] = y
          } else {
            stop = true
          }
        }
      }
      break

    case 'right':
      for (var x = 0; x < width; x += 1) {
        for (var y = 0; y < height - 1; y += 1) {
          alpha = imgData.data[(y + 1) * width * 4 - x * 4 - 1]
          if (alpha < 128 && stop == false) {
            mark[0] = y * width * 4 + x * 4
            mark[1] = x
            mark[2] = y
                    // imgData.data[(y + 1) * width * 4 - x*4 - 2] = 128;
                    // imgData.data[(y + 1) * width * 4 - x*4 - 3] = 128;
          } else {
            stop = true
          }
        }
      }
      break
  }

  return mark
}

function goldenType (initials) {
    // '#FF9900'
  var tmp_canvas2 = document.createElement('canvas')
  tmp_canvas2.setAttribute('width', golden_width)
  tmp_canvas2.setAttribute('height', golden_height)
  tmp_canvas2.setAttribute('id', 'tmp_canvas2')
  document.body.appendChild(tmp_canvas2)
  var tmp2 = document.getElementById('tmp_canvas2')
  tmpctx2 = tmp2.getContext('2d')

  var tmp_canvas1 = document.createElement('canvas')
  tmp_canvas1.setAttribute('width', golden_width)
  tmp_canvas1.setAttribute('height', golden_height)
  tmp_canvas1.setAttribute('id', 'tmp_canvas1')
  document.body.appendChild(tmp_canvas1)
  var tmp1 = document.getElementById('tmp_canvas1')
  tmpctx = tmp1.getContext('2d')

  tmpctx2.rect(0, 0, golden_width, golden_height)
  tmpctx2.fillStyle = '#FFFFFF'
  tmpctx2.fill()

  tmpctx2.font = 'bold ' + golden_height * 1.4 + 'px Arial'
  tmpctx2.fillStyle = '#319dff'
  tmpctx2.fillText(initials[1], 100, golden_height)
  var tmp2Data = tmpctx2.getImageData(0, 0, golden_width, golden_height)
    // trim2mark = getPosition(tmp2Data, golden_width, golden_height, 'left');
  tmpctx2.rect(0, 0, golden_width, golden_height)
  tmpctx2.fillStyle = '#FFFFFF'
  tmpctx2.fill()
  tmpctx2.fillStyle = '#319dff'
    // console.log('trim2: ' + trim2mark);
  tmpctx2.fillText(initials[1], 100, golden_height)
  var tmp2Data = tmpctx2.getImageData(0, 0, golden_width, golden_height)
    // tmpctx2.fill();
    // tmpctx2.putImageData(trim2Data, 0, 0);

  tmpctx.rect(0, 0, golden_width, golden_height)
  tmpctx.fillStyle = 'rgb(242, 242, 239)'
  tmpctx.fill()

  tmpctx.font = 'bold ' + golden_height * 1.4 + 'px Arial'
  tmpctx.fillStyle = '#F41099'
  tmpctx.fillText(initials[0], 0, golden_height)
  var tmp1Data = tmpctx.getImageData(0, 0, golden_width, golden_height)
  trim1mark = getPosition(tmp1Data, golden_width, golden_height, 'left')
  console.log('trim1: ' + trim1mark)
    // tmpctx.rect(0, 0, golden_width, golden_height);
    // tmpctx.fillStyle = '#FFFFFF';
    // tmpctx.fill();
    // tmpctx.putImageData(trim1Data, 0, 0);
    // var bottom_img = crayon.context.getImageData(600, 800);
    // crayon.clear();

  tmpctx.blendOnto(tmpctx2, 'multiply', {destX: 0, destY: 0}, -200)

  var tmpData = tmpctx2.getImageData(0, 0, golden_width, golden_height)
  document.body.removeChild(tmp_canvas2)
  document.body.removeChild(tmp_canvas1)

    // crayon.context.fillStyle = '#0078E6';
    // crayon.context.fillText(initials[1], golden_x + 95, crayon.canvas.height)
  crayon.context.putImageData(tmpData, golden_x - trim1mark, golden_y)

    // crayon.clear();
}

function makeCover (book) {
  if (!crayon) {
    crayon = new Crayon(document.getElementById('cover'))
  }

  golden_width = Math.round(crayon.canvas.width / 1.61803398875)
  golden_height = Math.round(crayon.canvas.height / 1.61803398875)
  golden_x = crayon.canvas.width - golden_width
  golden_y = crayon.canvas.height - golden_height

    // console.log('golden ratio XY: ' + golden_x + ', ' + golden_y);

  crayon.clear()
  crayon.style('default')

  crayon.fill('#f2f2ef').rect(0, 0, crayon.canvas.width, crayon.canvas.height)
    // golden_box;
    // crayon.fill('FF42E2').rect(golden_x, golden_y, golden_width, golden_height);

  var author = typo.formatAuthorName(book.author)

  initials[0] = author.name.charAt(0)
  initials[1] = author.surname.charAt(0)

  goldenType(initials)

  var authorFontSize = crayon.canvas.height * 0.04
  var titleFontSize = crayon.canvas.height * 0.03
  var titleFontSize = crayon.canvas.height * 0.03

  var titleX = crayon.canvas.width * 0.08
  var titleY = crayon.canvas.width * 0.08 + authorFontSize
  var titleWidth = crayon.canvas.width * 0.382

  var titleSections = typo.breakTitle(book.title)
  var title = titleSections[0]
  var subTitle = titleSections[1]

  crayon.translate(titleX, titleY)
  title = typo.addLigatures(title, 'Arial')
  crayon.font('Arial', titleFontSize, 'bold', 0).fill('#000000').paragraph('right', 0.25, titleWidth, true).text(title)
  crayon.font('Arial', titleFontSize * 0.85, 'normal', 0).fill('#000000').paragraph('left', 0.25, titleWidth, true).text(subTitle, 0, titleFontSize / 4)
    // crayon.font('Arial', authorFontSize, author.nameStyle, 0).fill('#FF9000').paragraph('left', 0.25, titleWidth, false).text(author.name, 0, authorFontSize/2);
    // 0 + name.pixelLength of author.name + ' '
    // crayon.font('Arial', authorFontSize, author.surnameStyle, 0).fill('#FF9000').paragraph('left', -0.25, titleWidth, true).text(author.surname, 0 + crayon.measureText(author.name + ' ').width, authorFontSize/2);

  utils.addCover()
}

module.exports = {
  enabled: false,
  name: 'Golden Ratio Typography',
  makeCover: makeCover
}
