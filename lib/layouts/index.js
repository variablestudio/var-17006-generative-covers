const layouts = {
  bar: require('./bar')
}

layouts.all = Object.keys(layouts).map((name) => layouts[name])

module.exports = layouts
