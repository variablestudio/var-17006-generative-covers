const random = require('pex-random')
const fonts = require('./fonts.js')

// const patterns = require('./patterns')
// const chroma = require('chroma-js')
const covers = [
  // require('./lib/covers/bio.js'), //so so, missing Libre_Baskerville
  // require('./lib/covers/broken-curves.js'),
  // require('./lib/covers/broken-hexagons.js'), //TODO: Andada bold font is missing
  // require('./lib/covers/broken-hexagons.old.js'), //TODO: text outside of text bg
  // require('./lib/covers/broken-kaleidoscope.js'),
  // require('./lib/covers/data.js'),
  // require('./lib/covers/divided.js'),
  // require('./lib/covers/divided2.js'),
  // require('./lib/covers/divided3.js'), //TODO: severe overlap issues
  // require('./lib/covers/goldencorner.js'),
  // require('./lib/covers/kaleidoscope.js'),
  // require('./lib/covers/layout.layered-cube.js'), //TODO: no text?
  // require('./lib/covers/layout.bonedupl.js'),  //TODO: limit available fonts
  // require('./lib/covers/layout.charts.js'),  //TODO: text sticks out
  // require('./lib/covers/layout.swissquad.js'), //TODO: no text bg
  // require('./lib/covers/ok.covers.layout.divided2.js'), //TODO: text sticks out
  // require('./lib/covers/ok.covers.layout.footer.js'), //TODO: text is too big, font missing
  require('./lib/covers/ok.covers.layout.goldenlabel.js'), //TODO: text is too big, font missing
  // require('./lib/covers/ok.covers.layout.goldentree.js'), //TODO: patterns missing
  // require('./lib/covers/ok.covers.layout.goldentype.js'), //TODO: blendOnto is not a function
  // require('./lib/covers/ok.covers.layout.grids.js'), // cool, no text though?
  // require('./lib/covers/ok.covers.layout.header.js'), //TODO: patterns missing
  // require('./lib/covers/ok.covers.layout.hip.js'), //TODO: patterns missing, cool hex
  // require('./lib/covers/ok.covers.layout.hugetype.js'), //TODO: blendOnto is missing
  // require('./lib/covers/ok.covers.layout.hugetype2.js'),//TODO: blendOnto is missing
  // require('./lib/covers/ok.covers.layout.mapper.js'), // cool triangles
  // require('./lib/covers/ok.covers.layout.margined.js'), // TODO: missing fonts
  // require('./lib/covers/ok.covers.layout.penguin.js'), //TODO: patterns missing and fonts
  // require('./lib/covers/ok.covers.layout.rightlabel.js'), //TODO: patterns missing and fonts
  // require('./lib/covers/ok.covers.layout.rightquad.js'), //TODO: text missing
  // require('./lib/covers/ok.covers.layout.semiopaque.js'), //TODO: patterns missing and fonts
  // require('./lib/covers/ok.covers.layout.statistical.js'), // TODO: font missing, crazy
  // require('./lib/covers/ok.covers.layout.stitch.js'), //TODO fonts missing, nice
  // require('./lib/covers/ok.covers.layout.swissquad.js'), //TODO: text missing
  // require('./lib/covers/ok.covers.layout.wavecircles.js'), //TODO: text missing, cool patterns
  // require('./lib/covers/ok.covers.minimal.js'),
  // require('./lib/covers/ok.covers.minimal.old.js'), //TODO: font missing
  // require('./lib/covers/ok.covers.mosaic.js'), //TODO: font missing
  // require('./lib/covers/ok.covers.mosaic.old.js'), //TODO: text missing
  // require('./lib/covers/ok.covers.pattern.bak2.js'), //TODO: no text background
  // require('./lib/covers/ok.covers.pattern.js'),
  // require('./lib/covers/ok.covers.plain.js'), //TODO: author name overlaps
  // require('./lib/covers/ok.covers.rule2.js'), // cool
  // require('./lib/covers/soso-blend.js'),
  // require('./lib/covers/soso-blend2.js'),
  // require('./lib/covers/soso-circularchaos.js'),
  // require('./lib/covers/soso-circularchaos2.js'),
  // require('./lib/covers/soso-fourth.js'),
  // require('./lib/covers/soso-hip.js'),
  // require('./lib/covers/todo-cornered.js'), //TODO: missing font
  // require('./lib/covers/todo-goldenlabel.old.js'),
  // require('./lib/covers/todo-goldentype.js'),
  // require('./lib/covers/todo-hugetype.js'),
  // require('./lib/covers/todo-hugetype2.js'),
  // require('./lib/covers/todo-layout.circles.js'),
]

const books = require('./data/books.json')

const css = document.createElement('link')
css.rel = 'stylesheet'
css.href = 'css/style.css'
document.head.appendChild(css)

const canvasContainer = document.createElement('div')
canvasContainer.id = 'canvasContainer'
document.body.appendChild(canvasContainer)

const canvas = document.createElement('canvas')
canvas.id = 'cover'
canvas.width = 600
canvas.height = 800
canvasContainer.appendChild(canvas)

const coversContainer = document.createElement('div')
coversContainer.id = 'covers'
document.body.appendChild(coversContainer)

console.log('covers', covers.length)
random.seed(0)
const numCovers = 200

window.onload = function () {
  fonts.load((err, fonts) => {
    for (let i = 0; i < numCovers; i++) {
      const book = books[i]
      let cover = random.element(covers)
      setTimeout(() => {
        cover.makeCover(book)
      }, 1)
    }
  })
}
