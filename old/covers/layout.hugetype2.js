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
  var mark = new Array(3)
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

function hugeType (initials) {
    // '#FF9900'
  var tmp_canvas2 = document.createElement('canvas')
  tmp_canvas2.setAttribute('width', huge_width)
  tmp_canvas2.setAttribute('height', huge_height)
  tmp_canvas2.setAttribute('id', 'tmp_canvas2')
  document.body.appendChild(tmp_canvas2)
  var tmp2 = document.getElementById('tmp_canvas2')
  tmpctx2 = tmp2.getContext('2d')

  var tmp_canvas1 = document.createElement('canvas')
  tmp_canvas1.setAttribute('width', huge_width)
  tmp_canvas1.setAttribute('height', huge_height)
  tmp_canvas1.setAttribute('id', 'tmp_canvas1')
  document.body.appendChild(tmp_canvas1)
  var tmp1 = document.getElementById('tmp_canvas1')
  tmpctx = tmp1.getContext('2d')

    // tmpctx2.rect(0, 0, huge_width, huge_height);
    // tmpctx2.fillStyle = '#FFFFFF';
    // tmpctx2.fill();

  tmpctx2.font = 'bold ' + huge_height * 1.4 + 'px OpenSansExtra'
  tmpctx2.fillStyle = '#319dff'
  console.log(tmpctx2.measureText(initials[1]).width - golden_width)
    // tmpctx2.fillText(initials[1],  tmpctx2.measureText(initials[1]).width/2 - golden_width, huge_height);
  tmpctx2.fillText(initials[1], -tmpctx2.measureText(initials[1]).width / 2 + 390, huge_height)
  var tmp2Data = tmpctx2.getImageData(0, 0, huge_width, huge_height)
  var trim2mark = getPosition(tmp2Data, huge_width, huge_height, 'right')

    // tmpctx2.rect(0, 0, huge_width, huge_height);
    // tmpctx2.fillStyle = '#FFFFFF';
    // tmpctx2.fill();
    // tmpctx2.putImageData(trim2Data, 0, 0);

  tmpctx.rect(0, 0, huge_width, huge_height)
  tmpctx.fillStyle = '#b6d6f4'
  tmpctx.fill()

  tmpctx.font = 'normal ' + huge_height * 1.4 + 'px OpenSansExtra'
  tmpctx.fillStyle = '#F41099'
  tmpctx.fillText(initials[0], tmpctx.measureText(initials[0]).width / 2 - golden_width * (tmpctx.measureText(initials[0]).width / 690), huge_height)
  var tmp1Data = tmpctx.getImageData(0, 0, huge_width, huge_height)
    // var trim1Data = decodeAndRebuild(tmp1Data, huge_width, huge_height, getPosition(tmp1Data, huge_width, huge_height));
    // tmpctx.rect(0, 0, huge_width, huge_height);
    // tmpctx.fillStyle = '#FFFFFF';
    // tmpctx.fill();
    // tmpctx.putImageData(trim1Data, 0, 0);
    // var bottom_img = crayon.context.getImageData(600, 800);
    // crayon.clear();

  tmpctx.blendOnto(tmpctx2, 'multiply', {destX: 0, destY: 0})

    // tempCanvas.width = tmpctx2.width;
    // tempCanvas.height = tmpctx2.height;

  crayon.context.save()

  crayon.context.translate(50, crayon.canvas.height * 0.67)
  crayon.context.rotate(-45)

  crayon.context.drawImage(tmp_canvas2, 0, 0)
    // crayon.scale(5,5);
  crayon.context.restore()
    // document.body.appendChild(tempCanvas);
    // var tmpData = tmpctx2.getImageData(0,0, huge_width, huge_height);
  document.body.removeChild(tmp_canvas2)
  document.body.removeChild(tmp_canvas1)

    // crayon.context.fillStyle = '#0078E6';
    // crayon.context.fillText(initials[1], huge_x + 95, crayon.canvas.height)
    // crayon.context.putImageData(tmpData, -golden_x, huge_y);
    // crayon.rotate(-45);

// Append for debugging purposes, just to show what the canvas did loo k like before the transforms.

    // crayon.context.putImageData(tmpData, 0, huge_y);

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

  huge_width = crayon.canvas.width * 1.33
  huge_height = crayon.canvas.height * 1.33
  huge_x = 0
  huge_y = 0

    // console.log('golden ratio XY: ' + golden_x + ', ' + golden_y);

  crayon.clear()
  crayon.style('default')

  crayon.fill('#b6d6f4').rect(0, 0, crayon.canvas.width, crayon.canvas.height)
    // golden_box;
    // crayon.fill('E2E2E2').rect(golden_x, golden_y, golden_width, golden_height);

  var author = typo.formatAuthorName(book.author)

  initials[0] = author.name.charAt(0)
  initials[1] = author.surname.charAt(0)

  hugeType(initials)

    // crayon.fill('#f2f2ef').rect(golden_width, 0, crayon.canvas.width, crayon.canvas.height);

  var authorFontSize = crayon.canvas.height * 0.02
  var titleFontSize = crayon.canvas.height * 0.03

  var shiftY = 50

  var titleX = crayon.canvas.width * 0.08
  var titleY = crayon.canvas.width * 0.08 + 15
  var titleWidth = crayon.canvas.width * 0.32

  crayon.style('title').font('UbuntuCondensed', titleFontSize, 'normal').paragraph('left', 0.25).fill('#333333')

  var titleLines = typo.breakLines(crayon, book.title, titleWidth)
  var titleMeasurements = crayon.measureText(titleLines)
  var titleAscent = -titleMeasurements.y

  titleY += titleAscent

  titleY += shiftY

  crayon.style('author').font('PTSans', authorFontSize).fill('#333333')
  var authorMeasurements = crayon.measureText(author)
    crayon.style('title').text(titleLines, titleX, titleY);
    crayon.style('author').text(author.name, titleX, crayon.canvas.height - 60);
    crayon.style('author').text(author.surname, titleX, crayon.canvas.height - 40);
    // title = typo.addLigatures(title, 'Arial');
    // crayon.font('OpenSansSemi', titleFontSize, 'normal', 0).fill('#000000').paragraph('left', 0.25, titleWidth, true).text(title);
    // crayon.font('Arial', titleFontSize*0.85, 'normal', 0).fill('#000000').paragraph('left', 0.25, titleWidth, true).text(subTitle, 0, titleFontSize/4);

  utils.addCover()
}

module.exports = {
  enabled: false,
  name: 'Huge Ratio Typography II',
  makeCover: makeCover
}
