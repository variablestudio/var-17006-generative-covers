module.exports = function grids (rune, w, h, book) {
  const r = rune
  const group = r.group()

  r.rect(0, 0, w, h)
    .fill('#9dbbdd')
    .addTo(group)

  // border frame lines
  const path = r.path()
    .fill(false)
    .stroke('#FFFFFF')
    .addTo(group)

  path
    .moveTo(25, 25)
    .lineTo(25, h - 25)
    .lineTo(w - 25, h - 25)
    .lineTo(w - 25, 25)
    .lineTo(25, 25)

  const rows = 5 + Math.round(Math.random() * 8)

  const rowsArray = []

  for (let row = 1; row < rows - 1; row++) {
    const random_n = Math.random() * 1000000
    const new_y = 25 + Math.round(((h - 2 * 25) / rows) * Math.round(rune.map(random_n, 0, 1000000, 1, rows)))
    rowsArray.push(new_y)

    // horizontal lines
    path
      .moveTo(25, new_y)
      .lineTo(w - 25, new_y)
  }

  rowsArray.push(25)
  rowsArray.push(h - 25)

  rowsArray.sort((a, b) => a - b)

  const cols = 2 + Math.round(Math.random() * 3)
  const colsArray = []

  for (let rr = 0; rr < rowsArray.length - 1; rr++) {
    for (let c = 1; c < cols - 1; c++) {
      const random_n = Math.random() * 1000000
      const new_x = 25 + Math.round(((w - 2 * 25) / cols) * Math.round(rune.map(random_n, 0, 1000000, 1, cols)))
      colsArray.push(new_x)

      // vertical subsection lines
      path
        .moveTo(new_x, rowsArray[rr])
        .lineTo(new_x, rowsArray[rr + 1])
    }

    colsArray.push(25)
    colsArray.push(575)
    colsArray.sort()

    // diagonal lines
    for (let cc = 0; cc < colsArray.length - 1; cc++) {
      path
        .moveTo(colsArray[cc + 1], rowsArray[rr])
        .lineTo(colsArray[cc], rowsArray[rr + 1])
    }
  }

  return group
}
