const patterns = {
  // rule2: require('./rule2'),
  // waveCircles: require('./wave-circles'),
  // grids: require('./grids'),
  // mapper: require('./mapper')
  lines: require('./lines'),
}

patterns.all = Object.keys(patterns).map((name) => patterns[name])

module.exports = patterns
