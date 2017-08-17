const chroma = require('chroma-js')

module.exports = function Hexagons (area, width, height, style) {
  var numberOfSides = 6
  var outerSize = 25 + Math.round(Math.random() * 25)
  var innerSize = outerSize / 2
  var rows = Math.round(height / outerSize)
  var cols = Math.round(width / outerSize)

  var hue = Math.round(128 + (-128 + Math.random() * 256))
  // var color =
  // console.log('hue: ' + hue)
  area.fillStyle = 'hsl(' + hue + ', 60%, 60%)'
  area.fillRect(0, 0, width, height)
  area.fill()
  style.mainColor = chroma.hsl(hue, 0.5, 0.25).hex()
  style.fillColor = 'hsl(' + hue + ', 60%, 60%)'
  var colorMatrix = coloursArray(numberOfSides)

  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      drawHexagons(area, numberOfSides, x, y, false, true, outerSize, innerSize, rows, cols, colorMatrix, hue, style)
    }
  }
}

function coloursArray (sides) {
  var colours = new Array(sides / 2)
  for (var c = 0; c < sides / 2; c++) {
    // 64 -192
    colours[c] = 64 + 128 / (sides / 2 - 1) * c
  }

  return colours
}

function drawHexagons (area, numberOfSides, x, y, solid, chaos, outerSize, innerSize, rows, cols, colorMatrix, hue, style) {
  var counter = 0
  if (chaos === true) {
    counter = Math.round(Math.random() * ((numberOfSides / 2) - 1))
  }

  var cx = outerSize * 2 * x
  var cy
  if (x % 2 === 0) {
    cy = outerSize * 2.33 * y
  } else {
    cy = outerSize + outerSize * 2.33 * y
  }

  if (solid === true) {
    area.beginPath()
    area.arc(cx, cy, outerSize * 0.75, 0, 2 * Math.PI, false)
    area.fillStyle = '#FFFFFF'
    area.fill()
    area.closePath()
  }

  for (var i = 1; i <= numberOfSides; i += 1) {
    if (i === 1) {
      area.beginPath()
      area.moveTo(cx + outerSize * Math.cos(0), cy + outerSize * Math.sin(0))
      area.lineTo(cx + innerSize * Math.cos(0), cy + innerSize * Math.sin(0))
      area.lineTo(cx + innerSize * Math.cos(i * 2 * Math.PI / numberOfSides), cy + innerSize * Math.sin(i * 2 * Math.PI / numberOfSides))
      area.lineTo(cx + outerSize * Math.cos(i * 2 * Math.PI / numberOfSides), cy + outerSize * Math.sin(i * 2 * Math.PI / numberOfSides))
      area.lineTo(cx + outerSize * Math.cos(0), cy + outerSize * Math.sin(0))
      area.closePath()
      // area.fillStyle = 'rgb(' + colorMatrix[counter] + ', ' + colorMatrix[counter] + ', ' + colorMatrix[counter] + ')'
      area.fillStyle = 'hsl(' + hue + ', ' + Math.round(colorMatrix[counter] / 255 * 100) + '%, ' + Math.round(colorMatrix[counter] / 255 * 100) + '%)'
      if (counter < numberOfSides / 2 - 1) {
        counter++
      } else {
        counter = 0
      }
      area.fill()
    } else {
      area.beginPath()
      area.moveTo(cx + outerSize * Math.cos((i - 1) * 2 * Math.PI / numberOfSides), cy + outerSize * Math.sin((i - 1) * 2 * Math.PI / numberOfSides))
      area.lineTo(cx + outerSize * Math.cos(i * 2 * Math.PI / numberOfSides), cy + outerSize * Math.sin(i * 2 * Math.PI / numberOfSides))
      area.lineTo(cx + innerSize * Math.cos(i * 2 * Math.PI / numberOfSides), cy + innerSize * Math.sin(i * 2 * Math.PI / numberOfSides))
      area.lineTo(cx + innerSize * Math.cos((i - 1) * 2 * Math.PI / numberOfSides), cy + innerSize * Math.sin((i - 1) * 2 * Math.PI / numberOfSides))
      area.lineTo(cx + outerSize * Math.cos((i - 1) * 2 * Math.PI / numberOfSides), cy + outerSize * Math.sin((i - 1) * 2 * Math.PI / numberOfSides))
      area.closePath()

      // area.fillStyle = 'rgb(' + colorMatrix[counter] + ', ' + colorMatrix[counter] + ', ' + colorMatrix[counter] + ')'
      area.fillStyle = 'hsl(' + (hue - 20) + ', ' + Math.round(colorMatrix[counter] / 255 * 100) + '%, ' + Math.round(colorMatrix[counter] / 255 * 100) + '%)'
      area.fill()
      if (counter < numberOfSides / 2 - 1) {
        counter++
      } else {
        counter = 0
      }
    }
  }
}
