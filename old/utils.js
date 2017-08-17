// FORMAT AUTHOR'S NAME
// need to be expanded with seven options
// originally splits name/surname from CVS "," or return unchanged if from JSON
// as I think the choice should be done here, not in templates... or?
// some templates could not be suited for particular rules.
// The main question could be external function called from another... like OK.Covers.Parsers.formatAuthor from OK.Covers.Minimal.js
// TODO: deprecated, what's the use of t?
function formatAuthorName (name) {
  var tokens = name.split(', ')
  if (tokens.length === 2) { return tokens[1] + ' ' + tokens[0] } else { return tokens[0] }
}

//TODO: deprecated use rune.map
function remap (value, oldMin, oldMax, newMin, newMax, clamp) {
  var newValue = newMin + (value - oldMin) / (oldMax - oldMin) * (newMax - newMin)
  if (clamp) {
    if (newValue < newMin) newValue = newMin
    if (newValue > newMax) newValue = newMax
  }
  return newValue
}

// BreakingLines and BreakingTitle are moved to typography.
// TODO: deprecated, not needed after using rune
function addCover (prepend) {
  var coverCanvas = document.getElementById('cover')
  var img = document.createElement('img')
  img.src = coverCanvas.toDataURL()
  img.className = 'thumb'

  var covers = document.getElementById('covers')
  if (covers.childNodes.length === 0 || !prepend) { covers.appendChild(img) } else { covers.insertBefore(img, covers.childNodes[0]) }
}

module.exports = {
  formatAuthorName: formatAuthorName,
  remap: remap,
  addCover: addCover
}
