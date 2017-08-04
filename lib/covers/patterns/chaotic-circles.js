module.exports = function ChaoticCircles (area, startx, starty, width, height, sections, style) {
  var prevX
  var prevY
  for (var c = 0; c < 32; c++) {
    var r = 25 + Math.round(Math.random() * 100)
    var x = 50 + Math.round(Math.random() * 500)
    var y = 50 + Math.round(Math.random() * 700)

    if (c !== 0) {
      area.beginPath()
      area.moveTo(prevX, prevY)
      area.lineTo(x, y)
      area.closePath()
      area.strokeStyle = 'rgba(49,49,49,0.5)'
      area.stroke()
      prevX = x
      prevY = y
    } else {
      prevX = x
      prevY = y
    }
    area.beginPath()
    area.arc(x, y, r, 0, 2 * Math.PI, false)
    area.closePath()
    var circular
    if (sections === undefined) {
      circular = Math.round(Math.random() * 360 / Math.random() * 12)
    } else {
      circular = Math.round(Math.random() * 360 / sections)
    }
    area.fillStyle = 'hsla(' + circular + ', 60%, 60%, ' + Math.random() + ')'
    area.fill()
  }

  style.mainColor = '#9A3C36'
  style.fillColor = '#FBFBFB'
}
