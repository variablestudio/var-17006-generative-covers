const layouts = {
  bar: require('./bar'),
  swissQuad: require('./swiss-quad')
}

layouts.all = Object.keys(layouts).map((name) => layouts[name])

module.exports = layouts
