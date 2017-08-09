const Crayon = require('../crayons')
const typo = require('../typography')
const utils = require('../utils')
const chroma = require('chroma-js')
var crayon

PixelGrid = function (width, height, x_pos, y_pos, cluster, mode) {
  for (x = 0; x < width * cluster / cluster; x++) {
    for (y = 0; y < height * cluster / cluster; y++) {
      var color = ~~(Math.random() * 360)
      crayon.context.fillStyle = 'hsl(' + color + ', 60%, 60%)'

            // if(mode == 'mixed') { var randShape = Math.round((Math.random() * 5)); }
            // if(mode == 'corners') { var randShape = 4; }
            // if(mode == 'pixels') { var randShape = 0; }

      if (mode == 0) { var randShape = Math.round((Math.random() * 5)) }
      if (mode == 1) { var randShape = 4 }
      if (mode == 2) { var randShape = 0 }

      switch (randShape) {
        case 0:
          crayon.context.beginPath()
          crayon.context.rect(x_pos + x * cluster, y_pos + y * cluster, cluster, cluster)
          crayon.context.closePath()
          crayon.context.fillStyle = 'hsl(' + color + ', 60%, 60%)'
          crayon.context.fill()
          break

        case 1:
          crayon.context.beginPath()
          crayon.context.moveTo(x_pos + cluster / 2 + x * cluster, y_pos + y * cluster)
          crayon.context.lineTo(x_pos + x * cluster, y_pos + cluster + y * cluster)
          crayon.context.lineTo(x_pos + cluster + x * cluster, y_pos + cluster + y * cluster)
          crayon.context.closePath()
          crayon.context.fillStyle = 'hsl(' + color + ', 60%, 60%)'
          crayon.context.fill()
          break

        case 2:
          crayon.context.beginPath()
          crayon.context.moveTo(x_pos + cluster / 2 + x * cluster, y_pos + cluster / 2 + y * cluster)
          crayon.context.lineTo(x_pos + x * cluster, y_pos + cluster + y * cluster)
          crayon.context.lineTo(x_pos + cluster + x * cluster, y_pos + cluster + y * cluster)
          crayon.context.closePath()
          crayon.context.fillStyle = 'hsl(' + color + ', 60%, 60%)'
          crayon.context.fill()

          crayon.context.beginPath()
          crayon.context.moveTo(x_pos + cluster / 2 + x * cluster, y_pos + cluster / 2 + y * cluster)
          crayon.context.lineTo(x_pos + x * cluster, y_pos + y * cluster)
          crayon.context.lineTo(x_pos + cluster + x * cluster, y_pos + y * cluster)
          crayon.context.closePath()
          crayon.context.fillStyle = 'hsl(' + color + ', 60%, 60%)'
          crayon.context.fill()
          break

        case 3:
          crayon.context.beginPath()
          crayon.context.arc(x_pos + cluster / 2 + x * cluster, y_pos + cluster / 2 + y * cluster, cluster / 2, 0, 2 * Math.PI, false)
          crayon.context.closePath()
          crayon.context.fillStyle = 'hsl(' + color + ', 60%, 60%)'
          crayon.context.fill()
          break

        case 4:
          crayon.context.beginPath()
          crayon.context.moveTo(x_pos + x * cluster, y_pos + y * cluster)
          crayon.context.lineTo(x_pos + cluster + x * cluster, y_pos + y * cluster)
          crayon.context.lineTo(x_pos + cluster + x * cluster, y_pos + cluster + y * cluster)
          crayon.context.closePath()
          crayon.context.fillStyle = 'hsl(' + color + ', 60%, 60%)'
          crayon.context.fill()
          break

        case 5:
          crayon.context.beginPath()
          crayon.context.rect(x_pos + x * cluster, y_pos + y * cluster, cluster, cluster)
          crayon.context.closePath()
          crayon.context.fillStyle = 'hsl(' + color + ', 60%, 60%)'
          crayon.context.fill()
          crayon.context.beginPath()
          crayon.context.arc(x_pos + cluster / 2 + x * cluster, y_pos + cluster / 2 + y * cluster, cluster / 2, 0, 2 * Math.PI, false)
          crayon.context.closePath()
          crayon.context.fillStyle = '#EBE9DB'
          crayon.context.fill()
          break

        default:
          crayon.context.beginPath()
          crayon.context.arc(x_pos + cluster / 2 + x * cluster, y_pos + cluster / 2 + y * cluster, cluster / 2, 0, 2 * Math.PI, false)
          crayon.context.closePath()
          crayon.context.fillStyle = 'hsl(' + color + ', 60%, 60%)'
          crayon.context.fill()
      }
    }
  }
}

function makeCover (book) {
  if (!crayon) {
    crayon = new Crayon(document.getElementById('cover'))
  }

  crayon.clear()
  crayon.style('default')

  crayon.fill('#f2f1ee').rect(0, 0, crayon.canvas.width, crayon.canvas.height)

  var randMode = Math.round(Math.random() * 2)

    // update with random numbers of cols and rows!!!!!!!!!!!!!!!!!
    // calculate proper cluster size from these numbers

  var randCols = 5 + Math.round(Math.random() * 7)
  var randRows = randCols

    // console.log('canvas width: ' + crayon.canvas.width);
  var clusterSize = (crayon.canvas.width - 100) / randCols
  var posx = 50
  var posy = crayon.canvas.height - 50 - randRows * clusterSize
  PixelGrid(randCols, randRows, posx, posy, clusterSize, randMode)

  var author = typo.formatAuthorName(book.author)

  var authorFontSize = crayon.canvas.height * 0.04
  var titleFontSize = crayon.canvas.height * 0.04

  var titleX = crayon.canvas.width * 0.08
  var titleY = crayon.canvas.width * 0.08 + authorFontSize
  var titleWidth = crayon.canvas.width * 0.8

  var titleSections = typo.breakTitle(book.title)
  var title = titleSections[0]
  var subTitle = titleSections[1]

  crayon.translate(titleX, titleY)
  title = typo.addLigatures(title, 'Andada')
    // crayon.font('Andada', titleFontSize, 'bold', 0).fill('#000000').paragraph('left', 0.25, titleWidth, true).text(title);
    // crayon.font('Andada', titleFontSize*0.85, 'normal', 0).fill('#000000').paragraph('left', 0.25, titleWidth, true).text(subTitle, 0, titleFontSize/4);
    // crayon.font('Arial', authorFontSize, author.nameStyle, 0).fill('#FF9000').paragraph('left', 0.25, titleWidth, false).text(author.name, 0, authorFontSize/2);
    // 0 + name.pixelLength of author.name + ' '
    // crayon.font('Arial', authorFontSize, author.surnameStyle, 0).fill('#FF9000').paragraph('left', -0.25, titleWidth, true).text(author.surname, 0 +              crayon.measureText(author.name + ' ').width, authorFontSize/2);

  utils.addCover()
}

module.exports = {
  enabled: false,
  name: 'Mosaic',
  makeCover: makeCover
}
