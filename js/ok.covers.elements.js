const Crayon = require('../crayons')
const typo = require('../typography')
const utils = require('../utils')

elements = {}

elements.PixelElement = function (area, x_pos, y_pos, cluster) {
  var color = ~~(Math.random() * 360)
  area.fillStyle = 'hsl(' + color + ', 60%, 60%)'

    // if(mode == 'mixed') { var randShape = Math.round((Math.random() * 5)); }
    // if(mode == 'corners') { var randShape = 4; }
    // if(mode == 'pixels') { var randShape = 0; }

  var randShape = Math.round((Math.random() * 3))

  switch (randShape) {
    case 0:
      area.beginPath()
      area.moveTo(x_pos + cluster / 2, y_pos)
      area.lineTo(x_pos, y_pos + cluster)
      area.lineTo(x_pos + cluster, y_pos + cluster)
      area.closePath()
      area.fillStyle = 'hsl(' + color + ', 60%, 60%)'
      area.fill()
      break

    case 1:
      area.beginPath()
      area.moveTo(x_pos + cluster / 2, y_pos + cluster / 2)
      area.lineTo(x_pos, y_pos + cluster)
      area.lineTo(x_pos + cluster, y_pos + cluster)
      area.closePath()
      area.fillStyle = 'hsl(' + color + ', 60%, 60%)'
      area.fill()

      area.beginPath()
      area.moveTo(x_pos + cluster / 2, y_pos + cluster / 2)
      area.lineTo(x_pos, y_pos)
      area.lineTo(x_pos + cluster, y_pos)
      area.closePath()
      area.fillStyle = 'hsl(' + color + ', 60%, 60%)'
      area.fill()
      break

    case 2:
      area.beginPath()
      area.arc(x_pos + cluster / 2, y_pos + cluster / 2, cluster / 2, 0, 2 * Math.PI, false)
      area.closePath()
      area.fillStyle = 'hsl(' + color + ', 60%, 60%)'
      area.fill()
      break

    case 3:
      area.beginPath()
      area.moveTo(x_pos, y_pos)
      area.lineTo(x_pos + cluster, y_pos)
      area.lineTo(x_pos + cluster, y_pos + cluster)
      area.closePath()
      area.fillStyle = 'hsl(' + color + ', 60%, 60%)'
      area.fill()
      break

    case 4:
      area.beginPath()
      area.rect(x_pos, y_pos, cluster, cluster)
      area.closePath()
      area.fillStyle = 'hsl(' + color + ', 60%, 60%)'
      area.fill()
      area.beginPath()
      area.arc(x_pos + cluster / 2, y_pos + cluster / 2, cluster / 2, 0, 2 * Math.PI, false)
      area.closePath()
      area.fillStyle = '#f2f1ee'
      area.fill()
      break

    default:

      area.beginPath()
      area.rect(x_pos, y_pos, cluster, cluster)
      area.closePath()
      area.fillStyle = 'hsl(' + color + ', 60%, 60%)'
      area.fill()
      break
  }
}

elements.LetterElement = function (area, letters, x_pos, y_pos, cluster) {
  var img_matrix = new Array(16)
  drawLetters(area, img_matrix, letters, x_pos, y_pos, cluster * 2)
    // renderMatrix(area, img_matrix);
}

function renderMatrix (bm_data) {
  for (y = 0; y < 3; y++) {
    for (x = 0; x < 3; x++) {
      var side_width = area.canvas.width * 0.55
            // var side_width = crayon.canvas.width * 0.55;
      area.context.putImageData(bm_data[Math.round(Math.random() * 15)], 52 + x * side_width / 2 * 1.02, 250 + y * side_width / 2 * 1.02)
    }
  }
}

function drawLetters (area, img_matrix, letters, x, y, cluster) {
  var draw_canvas = document.createElement('canvas')
  draw_canvas.width = area.canvas.width
  draw_canvas.height = area.canvas.width
  var d = draw_canvas.getContext('2d')

  for (var l = 0; l < 4; l++) {
    d.fillStyle = 'rgb(' + (200 + (25 - Math.round(Math.random() * 50))) + ', 130, 155)'
    d.fillRect(x, y, cluster, cluster)

    var fontScale = cluster * 1.45
    d.fillStyle = '#3b253c'
    d.font = 'bold ' + fontScale + 'px Arial'

    var metrics = d.measureText(letters[l])
    var width = metrics.width

    d.fillText(letters[l], x + cluster / 2 - width / 2, y + cluster / 2 + fontScale / 2.85)

    img_matrix[(l * 4 + 0)] = d.getImageData(x, y, cluster / 2, cluster / 2)
    img_matrix[(l * 4 + 1)] = d.getImageData(x + cluster / 2, y, cluster / 2, cluster / 2)
    img_matrix[(l * 4 + 2)] = d.getImageData(x, y + cluster / 2, cluster / 2, cluster / 2)
    img_matrix[(l * 4 + 3)] = d.getImageData(x + cluster / 2, y + cluster / 2, cluster / 2, cluster / 2)
  }

  area.context.putImageData(img_matrix[Math.round(Math.random() * 15)], x, y)

    // console.log('BD: ' + img_matrix[0]);
}

elements.TileElement = function (area, x_pos, y_pos, cluster) {
  var margins = 0
  var borderScale = 1 + Math.random()
  var hue = Math.random() * 360
  var numX = 2 + Math.floor(Math.random() * 10)
  var radius = (0.2 + 0.5 * Math.random())
  var radius2 = (0.1 + 0.4 * Math.random())
  var shape = Math.floor(Math.random() * 2)

  var niceBlue = '#27D1E7'
  var paleYellow = 'rgb(255, 255, 255)'
  var colorHSL = chroma.hex(niceBlue).hsl()
  var color = chroma.hsl(hue, 0.8, colorHSL[2]).hex()
  var lightColor = chroma.hsl(hue, 0.8, colorHSL[2] * 1.5).hex()

  area.context.fillStyle = color
  area.context.fillRect(x_pos, y_pos, cluster, cluster)

  var r = cluster / 2 * radius
  var r2 = cluster / 2 * radius2

  r2 *= 0.25 // square
    // if (shape == 1) r2 *= 0.25; //ellipse

  area.fill(lightColor).stroke(false)

  area.save()
  area.translate(x_pos + cluster / 2, y_pos + cluster / 2)
  area.rotate(-45)
  area.scale(borderScale, borderScale)
  area.rect(-r, -r2, r * 2, r2 * 2)
    // if (shape == 1) area.ellipse(-r, -r2, r*2, r2*2);
  area.rotate(90)
  area.rect(-r, -r2, r * 2, r2 * 2)
    // if (shape == 1) area.ellipse(-r, -r2, r*2, r2*2);
  area.restore()

  area.fill(color).stroke(false)

  area.save()
  area.translate(x_pos + cluster / 2, y_pos + cluster / 2)
  area.rotate(-45)
  area.rect(-r, -r2, r * 2, r2 * 2)
  area.ellipse(-r, -r2, r * 2, r2 * 2)
  area.rotate(90)
  area.rect(-r, -r2, r * 2, r2 * 2)
  area.ellipse(-r, -r2, r * 2, r2 * 2)
  area.restore()

    // minimal 32, maximal 128 - for semi-opaque layout
    // minimal 24, maximal 64 for cornered layout
}

elements.SolidTileElement = function (area, x_pos, y_pos, cluster, color, lightColor, radius, radius2, borderScale) {
    // area.context.fillStyle = color;
    // area.context.fillRect(x_pos, y_pos, cluster, cluster);

  area.context.fillStyle = color
  area.context.fillRect(x_pos, y_pos, cluster, cluster)
  var r = cluster / 2 * radius
  var r2 = cluster / 2 * radius2

     // square
    // if (shape == 1) r2 *= 0.25; //ellipse

  r2 *= 0.25 // square
    // if (shape == 1) r2 *= 0.25; //ellipse

  area.fill(lightColor).stroke(false)

  area.save()
  area.translate(x_pos + cluster / 2, y_pos + cluster / 2)
  area.rotate(-45)
  area.scale(borderScale, borderScale)
  area.rect(-r, -r2, r * 2, r2 * 2)
    // if (shape == 1) area.ellipse(-r, -r2, r*2, r2*2);
  area.rotate(90)
  area.rect(-r, -r2, r * 2, r2 * 2)
    // if (shape == 1) area.ellipse(-r, -r2, r*2, r2*2);
  area.restore()

  area.fill(color).stroke(false)

  area.save()
  area.translate(x_pos + cluster / 2, y_pos + cluster / 2)
  area.rotate(-45)
  area.rect(-r, -r2, r * 2, r2 * 2)
  area.ellipse(-r, -r2, r * 2, r2 * 2)
  area.rotate(90)
  area.rect(-r, -r2, r * 2, r2 * 2)
  area.ellipse(-r, -r2, r * 2, r2 * 2)
  area.restore()

    // minimal 32, maximal 128 - for semi-opaque layout
    // minimal 24, maximal 64 for cornered layout
}

elements.coloursArray = function (sides) {
  var colours = new Array(sides / 2)
  for (var c = 0; c < sides / 2; c++) {
        // 64 -192
    colours[c] = 64 + 128 / (sides / 2 - 1) * c
  }

  return colours
}

elements.HexElement = function (area, x_pos, y_pos, cluster) {
  var hue = Math.random() * 360

  var counter = 0
  var outerSize = 0.7 * cluster
  var innerSize = outerSize * 0.5
  var numberOfSides = 6
  var Xcenter = x_pos + cluster / 2
  var Ycenter = y_pos + cluster / 2
  var counter = Math.round(Math.random() * ((numberOfSides / 2) - 1))

  var colour_matrix = elements.coloursArray(numberOfSides)

  for (var i = 1; i <= numberOfSides; i += 1) {
    if (i == 1) {
      area.context.beginPath()
      area.context.moveTo(Xcenter + outerSize * Math.cos(0), Ycenter + outerSize * Math.sin(0))
      area.context.lineTo(Xcenter + innerSize * Math.cos(0), Ycenter + innerSize * Math.sin(0))
      area.context.lineTo(Xcenter + innerSize * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + innerSize * Math.sin(i * 2 * Math.PI / numberOfSides))
      area.context.lineTo(Xcenter + outerSize * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + outerSize * Math.sin(i * 2 * Math.PI / numberOfSides))
      area.context.lineTo(Xcenter + outerSize * Math.cos(0), Ycenter + outerSize * Math.sin(0))
      area.context.closePath()
      area.context.fillStyle = 'hsl(' + hue + ', ' + Math.round(colour_matrix[counter] / 255 * 100) + '%, ' + Math.round(colour_matrix[counter] / 255 * 100) + '%)'

      if (counter < numberOfSides / 2 - 1) {
        counter++
      } else {
        counter = 0
      }

      area.context.fill()
    } else {
      area.context.beginPath()
      area.context.moveTo(Xcenter + outerSize * Math.cos((i - 1) * 2 * Math.PI / numberOfSides), Ycenter + outerSize * Math.sin((i - 1) * 2 * Math.PI / numberOfSides))
      area.context.lineTo(Xcenter + outerSize * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + outerSize * Math.sin(i * 2 * Math.PI / numberOfSides))
      area.context.lineTo(Xcenter + innerSize * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + innerSize * Math.sin(i * 2 * Math.PI / numberOfSides))
      area.context.lineTo(Xcenter + innerSize * Math.cos((i - 1) * 2 * Math.PI / numberOfSides), Ycenter + innerSize * Math.sin((i - 1) * 2 * Math.PI / numberOfSides))
      area.context.lineTo(Xcenter + outerSize * Math.cos((i - 1) * 2 * Math.PI / numberOfSides), Ycenter + outerSize * Math.sin((i - 1) * 2 * Math.PI / numberOfSides))
      area.context.closePath()

                // area.fillStyle = 'rgb(' + colour_matrix[counter] + ', ' + colour_matrix[counter] + ', ' + colour_matrix[counter] + ')';
      area.context.fillStyle = 'hsl(' + (hue - 20) + ', ' + Math.round(colour_matrix[counter] / 255 * 100) + '%, ' + Math.round(colour_matrix[counter] / 255 * 100) + '%)'
      area.context.fill()
      if (counter < numberOfSides / 2 - 1) {
        counter++
      } else {
        counter = 0
      }
    }
  }
}
