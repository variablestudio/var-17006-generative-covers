module.exports = function PixelGrid (area, x_pos, y_pos, cols, rows, cluster, mode, style) {

  for (x = 0; x < cols * cluster / cluster; x++) {
    for (y = 0; y < rows * cluster / cluster; y++) {

      var color = ~~ (Math.random() * 360)
      area.fillStyle = 'hsl(' + color + ', 60%, 60%)'

      //if(mode == 'mixed') { var randShape = Math.round((Math.random() * 5)) }
      //if(mode == 'corners') { var randShape = 4 }
      //if(mode == 'pixels') { var randShape = 0 }

      if(mode == 0) { var randShape = Math.round((Math.random() * 5)) }
      if(mode == 1) { var randShape = 4 }
      if(mode == 2) { var randShape = 0 }

      switch (randShape) {

        case 0:
          area.beginPath()
          area.rect(x_pos + x * cluster, y_pos + y * cluster, cluster, cluster)
          area.closePath()
          area.fillStyle = 'hsl(' + color + ', 60%, 60%)'
          area.fill()
          break

        case 1:
          area.beginPath()
          area.moveTo(x_pos + cluster/2 + x * cluster, y_pos + y * cluster)
          area.lineTo(x_pos + x * cluster, y_pos + cluster + y * cluster)
          area.lineTo(x_pos + cluster + x * cluster, y_pos + cluster + y * cluster)
          area.closePath()
          area.fillStyle = 'hsl(' + color + ', 60%, 60%)'
          area.fill()
          break

        case 2:
          area.beginPath()
          area.moveTo(x_pos + cluster/2 + x * cluster, y_pos + cluster/2 + y * cluster)
          area.lineTo(x_pos + x * cluster, y_pos + cluster + y * cluster)
          area.lineTo(x_pos + cluster + x * cluster, y_pos + cluster + y * cluster)
          area.closePath()
          area.fillStyle = 'hsl(' + color + ', 60%, 60%)'
          area.fill()

          area.beginPath()
          area.moveTo(x_pos + cluster/2 + x * cluster, y_pos + cluster/2 + y * cluster)
          area.lineTo(x_pos + x * cluster, y_pos + y * cluster)
          area.lineTo(x_pos + cluster + x * cluster, y_pos + y * cluster)
          area.closePath()
          area.fillStyle = 'hsl(' + color + ', 60%, 60%)'
          area.fill()
          break

        case 3:
          area.beginPath()
          area.arc(x_pos + cluster/2 + x * cluster, y_pos + cluster/2 + y * cluster, cluster/2, 0, 2 * Math.PI, false)
          area.closePath()
          area.fillStyle = 'hsl(' + color + ', 60%, 60%)'
          area.fill()
          break

        case 4:
          area.beginPath()
          area.moveTo(x_pos + x * cluster, y_pos + y * cluster)
          area.lineTo(x_pos + cluster + x * cluster, y_pos + y * cluster)
          area.lineTo(x_pos + cluster + x * cluster, y_pos + cluster + y * cluster)
          area.closePath()
          area.fillStyle = 'hsl(' + color + ', 60%, 60%)'
          area.fill()
          break

        case 5:
          area.beginPath()
          area.rect(x_pos + x * cluster, y_pos + y * cluster, cluster, cluster)
          area.closePath()
          area.fillStyle = 'hsl(' + color + ', 60%, 60%)'
          area.fill()
          area.beginPath()
          area.arc(x_pos + cluster/2 + x * cluster, y_pos + cluster/2 + y * cluster, cluster/2, 0, 2 * Math.PI, false)
          area.closePath()
          area.fillStyle = '#EBE9DB'
          area.fill()
          break

        default:
          area.beginPath()
          area.arc(x_pos + cluster/2 + x * cluster, y_pos + cluster/2 + y * cluster, cluster/2, 0, 2 * Math.PI, false)
          area.closePath()
          area.fillStyle = 'hsl(' + color + ', 60%, 60%)'
          area.fill()

      }
    }
  }

  style.mainColor = '#494969'
  style.fillColor = '#EBE9DB'
}
