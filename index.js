const random = require('pex-random')
const fonts = require('./fonts.js')
require('./lib/canvas.ext')

// const patterns = require('./patterns')
// const chroma = require('chroma-js')
const covers = [
  require('./lib/covers/layouts/simplest.js'),

  require('./lib/covers/layouts/pseudo.js'),

  require('./lib/covers/layout.hip.js'),

  require('./lib/covers/layout.penguin.js'),

  require('./lib/covers/layouts/moleskine.js'),

  require('./lib/covers/layout.header.js'),

  require('./lib/covers/layout.footer.js'),

  require('./lib/covers/layout.semiopaque.js'),
  require('./lib/covers/layout.semiopaque.circularchaos2.js'),

  require('./lib/covers/layout.goldenlabel.js'), //TODO: text is too big, font missing

  require('./lib/covers/layout.rightlabel.js'), //TODO: patterns missing and fonts
  require('./lib/covers/layout.hugetype.js'), //TODO: blendOnto is missing

  require('./lib/covers/layout.goldentype.js'), //TODO: blendOnto is not a function, text out

  require('./lib/covers/layouts/swissquad.js'),
  require('./lib/covers/divided3.js'), // kind of swissquad

  require('./lib/covers/divided.js'),

  require('./lib/covers/mosaic.js'), //TODO: font missing

  require('./lib/covers/layouts/margined.js'),

  require('./lib/covers/layouts/cornered.js'),
  require('./lib/covers/divided2.js'), // kind of cornered
  require('./lib/covers/goldencorner.js'),// kind of cornered
  require('./lib/covers/layout.hugetype2.js'),//TODO: blendOnto is missing

  require('./lib/covers/layout.goldentree.js'), //TODO: patterns missin

  require('./lib/covers/fourth.js'),

  // Nice but not from matrix
  require('./lib/covers/layout.charts.js'),  //TODO: text sticks out
  require('./lib/covers/layout.stitch.js'), //TODO fonts missing, nice
  require('./lib/covers/layout.bonedupl.js'),  //TODO: limit available fonts
  require('./lib/covers/data.js'),
  require('./lib/covers/layout.mapper.js'), // cool triangles
  require('./lib/covers/layout.grids.js'), // cool, no text though?
  require('./lib/covers/layout.wavecircles.js'), //TODO: text missing, cool patterns
  require('./lib/covers/ok.covers.rule2.js'), // cool

  // Hmm
  require('./lib/covers/kaleidoscope.js'),
  require('./lib/covers/layouts/todo-cube.js'), //TODO: no text?
  require('./lib/covers/hexagons.js'), //text is out
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
//random.seed(0)
const numCoversPerAlgo = 6
const numCovers = numCoversPerAlgo * covers.length

window.onload = function () {
  fonts.load((err, fonts) => {
    try {
      var i = 0
      function next() {
        const book = books[i % books.length]
        //let cover = random.element(covers)
        const cover = covers[Math.floor(i / numCoversPerAlgo)]
        if (i % numCoversPerAlgo == 0) {
          var header = document.createElement('h2')
          header.innerText = cover.name
          header.style.clear = 'both'
          header.style.margin = '0'
          header.style.padding = '1em 0 0 0.5em'
          header.style.fontFamily = 'Verdana'
          header.style.color = '#FFF'
          document.getElementById('covers').appendChild(header)
        }
        cover.makeCover(book, (i % numCoversPerAlgo) % 6)
        i++
        if (i < numCovers) {
          setTimeout(next, 10)
        }
      }
      next()
    } catch (e) {
      console.log(e)
    }
  })
}
