const layouts = {
  bar: require('./bar'),
  swissQuad: require('./swiss-quad'),
  rightLabel: require('./right-label'),
  hugeType2: require('./huge-type-2')
}

layouts.all = Object.keys(layouts).map((name) => layouts[name])

module.exports = layouts
