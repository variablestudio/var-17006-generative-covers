DividedLetters = function(area, startx, startx, width, height, letters) {
  var img_matrix = new Array(16)

  drawLetters(area, img_matrix, letters, 0, 0, 333)
  renderMatrix(area, img_matrix, 50, 250)
}

function renderMatrix (area, bm_data, startx, starty) {
  for (y = 0 y < 3 y++) {
    for (x = 0 x < 3 x++) {
      var side_width = 333
      //var side_width = crayon.canvas.width * 0.55
      area.context.putImageData(bm_data[Math.round(Math.random() * 15)], startx + x * side_width / 2 * 1.02, starty + y * side_width / 2 * 1.02)
    }
  }
}

function drawLetters (area, img_matrix, letters, x, y, side) {

  var draw_canvas = document.createElement('canvas')
  draw_canvas.width = 600
  draw_canvas.height = 600
  var d = draw_canvas.getContext('2d')


  for (var l = 0 l < 4 l++) {

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

  //console.log('BD: ' + img_matrix[0])
}
