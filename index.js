const random = require('pex-random')
const fonts = require('./fonts.js')
require('./lib/canvas.ext')

// const patterns = require('./patterns')
// const chroma = require('chroma-js')
const covers = [
  require('./lib/covers/layouts/margined.js'),

  require('./lib/covers/layouts/swissquad.js'),
  require('./lib/covers/divided3.js'), // kind of swissquad

  require('./lib/covers/layouts/cornered.js'),
  require('./lib/covers/goldencorner.js'),// kind of cornered
  require('./lib/covers/divided2.js'), // kind of cornered

  require('./lib/covers/fourth.js'),

  require('./lib/covers/layouts/moleskine.js'),
  require('./lib/covers/layouts/simplest.js'),
  require('./lib/covers/layouts/pseudo.js'),
  require('./lib/covers/ok.covers.layout.penguin.js'), //TODO: patterns missing and fonts
  require('./lib/covers/ok.covers.layout.rightlabel.js'), //TODO: patterns missing and fonts
  require('./lib/covers/ok.covers.layout.goldentype.js'), //TODO: blendOnto is not a function, text out
  require('./lib/covers/divided.js'),
  require('./lib/covers/ok.covers.layout.goldentree.js'), //TODO: patterns missin

  require('./lib/covers/ok.covers.layout.footer.js'), //TODO: text is too big, font missing
  require('./lib/covers/ok.covers.layout.header.js'), //TODO: patterns missing
  require('./lib/covers/ok.covers.layout.goldenlabel.js'), //TODO: text is too big, font missing
  require('./lib/covers/ok.covers.layout.hip.js'), //TODO: patterns missing, cool hex

  require('./lib/covers/ok.covers.layout.semiopaque.js'), //TODO: patterns missing and fonts
  require('./lib/covers/soso-circularchaos2.js'),

  require('./lib/covers/ok.covers.mosaic.js'), //TODO: font missing

  require('./lib/covers/ok.covers.layout.hugetype.js'), //TODO: blendOnto is missing
  require('./lib/covers/ok.covers.layout.hugetype2.js'),//TODO: blendOnto is missing

  // Nice but not from matrix
  require('./lib/covers/layout.charts.js'),  //TODO: text sticks out
  require('./lib/covers/ok.covers.layout.stitch.js'), //TODO fonts missing, nice
  require('./lib/covers/layout.bonedupl.js'),  //TODO: limit available fonts
  require('./lib/covers/data.js'),
  require('./lib/covers/ok.covers.layout.mapper.js'), // cool triangles
  require('./lib/covers/ok.covers.layout.grids.js'), // cool, no text though?
  require('./lib/covers/ok.covers.layout.wavecircles.js'), //TODO: text missing, cool patterns
  require('./lib/covers/ok.covers.rule2.js'), // cool

  // Hmm
  require('./lib/covers/kaleidoscope.js'),
  require('./lib/covers/layout.layered-cube.js'), //TODO: no text?

  // Todo -------


  // require('./lib/covers/soso-blend.js'),
  // require('./lib/covers/soso-blend2.js'),
  // require('./lib/covers/soso-circularchaos.js'),
  // require('./lib/covers/soso-hip.js'),
  // require('./lib/covers/todo-cornered.js'), //TODO: missing font
  // require('./lib/covers/todo-goldenlabel.old.js'),
  // require('./lib/covers/todo-goldentype.js'),
  // require('./lib/covers/todo-hugetype.js'),
  // require('./lib/covers/todo-hugetype2.js'),
  // require('./lib/covers/todo-layout.circles.js'),

  // require('./lib/covers/x-curves.js'),
  // require('./lib/covers/x-hexagons.js'), //text is out
  // require('./lib/covers/x-hexagons.old.js'), //TODO: text outside of text bg
  // require('./lib/covers/x-layout.swissquad.js'), //TODO: no text bg
  // require('./lib/covers/x-ok.covers.layout.divided2.js'), //TODO: text sticks out
  // require('./lib/covers/x-ok.covers.layout.statistical.js'), // TODO: font missing, crazy
  // require('./lib/covers/x-bio.js'), // TODO: author missing
  // require('./lib/covers/x-ok.covers.minimal.js'), // nice expanding header
  // require('./lib/covers/x-ok.covers.pattern.bak2.js'), //nice patterns
  // require('./lib/covers/x-ok.covers.pattern.js'),
  // require('./lib/covers/x-ok.covers.minimal.old.js'), //TODO: font missing
  // require('./lib/covers/x-ok.covers.plain.js'), //TODO: author name overlaps
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
const numCovers = 6 * covers.length

window.onload = function () {
  fonts.load((err, fonts) => {
    var i = 0
    function next() {
      const book = books[i % books.length]
      //let cover = random.element(covers)
      const cover = covers[Math.floor(i / 6)]
      if (i % 6 == 0) {
        var header = document.createElement('h2')
        header.innerText = cover.name
        header.style.clear = 'both'
        header.style.margin = '0'
        header.style.padding = '1em 0 0 0.5em'
        header.style.fontFamily = 'Verdana'
        header.style.color = '#FFF'
        document.getElementById('covers').appendChild(header)
      }
      cover.makeCover(book)
      i++
      if (i < numCovers) {
        setTimeout(next, 10)
      }
    }
    next()
  })
}
