const layouts = {
  bar: require('./bar'),
  // swissQuad: require('./swiss-quad'),
  // rightLabel: require('./right-label')
}

layouts.all = Object.keys(layouts).map((name) => layouts[name])

module.exports = layouts
