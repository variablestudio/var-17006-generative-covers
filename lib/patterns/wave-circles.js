module.exports = function waveCircles (rune, w, h, book) {
  const r = rune
  const group = r.group()

  r.rect(0, 0, w, h)
    .fill('#EAEAEA')
    .stroke(false)
    .addTo(group)

  var amp = 28
  var time = 28
  let lineWidth = 2
  for (let y = 0; y < 158; y++) {
    const path = r.path()
      .fill(false)
      .stroke(0)
      .strokeWidth(lineWidth)
      .addTo(group)
    for (let x = 0; x < 124; x++) {
      let nx = x * time * 2
      let ny = 0 + y * amp * 0.82
      path.moveTo(nx, ny)
      var option = Math.round(Math.random() * 3)
      switch (option) {
        case 0:
        // sine
          path.curveTo(nx + time / 2, ny + amp / 2, nx + time, ny)
          path.curveTo(nx + time * 1.5, ny - amp / 2, nx + 2 * time, ny)

          break
        case 1:
        // triangle
          path.lineTo(nx + time / 2, ny + amp / 2)
          path.lineTo(nx + time, ny)
          path.lineTo(nx + time * 1.5, ny - amp / 2)
          path.lineTo(nx + 2 * time, ny)

          break
        case 2:
        // triangle
          path.lineTo(nx + time, ny + amp / 2)
          path.lineTo(nx + time, ny - amp / 2)
          path.lineTo(nx + 2 * time, ny)

          break
        case 3:
        // quad
          path.lineTo(nx + time / 2, ny)
          path.lineTo(nx + time / 2, ny + amp / 2)
          path.lineTo(nx + time, ny + amp / 2)
          path.lineTo(nx + time, ny - amp / 2)
          path.lineTo(nx + time * 1.5, ny - amp / 2)
          path.lineTo(nx + time * 1.5, ny)
          path.lineTo(nx + 2 * time, ny)

          break
        default:
        // quad
          path.lineTo(nx + time / 2, ny)
          path.lineTo(nx + time / 2, ny + amp / 2)
          path.lineTo(nx + time, ny + amp / 2)
          path.lineTo(nx + time, ny - amp / 2)
          path.lineTo(nx + time * 1.5, ny - amp / 2)
          path.lineTo(nx + time * 1.5, ny)
          path.lineTo(nx + 2 * time, ny)
      }
      lineWidth = 2 + Math.random() * 5
    }
  }

  return group
}
