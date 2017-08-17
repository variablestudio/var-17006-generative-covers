const random = require('pex-random')
const fonts = require('./old/fonts.js')
require('./old/canvas.ext')

// const patterns = require('./patterns')
// const chroma = require('chroma-js')
const covers = [
  require('./old/covers/layouts/simplest.js'),
  require('./old/covers/layouts/pseudo.js'),
  require('./old/covers/layout.hip.js'),
  require('./old/covers/layout.penguin.js'),
  require('./old/covers/layouts/moleskine.js'),
  require('./old/covers/layout.header.js'),
  require('./old/covers/layout.footer.js'),
  require('./old/covers/layout.semiopaque.js'),
  require('./old/covers/layout.semiopaque.circularchaos2.js'),
  require('./old/covers/layout.goldenlabel.js'), //TODO: text is too big, font missing
  // require('./old/covers/layout.rightlabel.js'), //TODO: patterns missing and fonts
  require('./old/covers/layout.hugetype.js'), //TODO: blendOnto is missing
  require('./old/covers/layout.goldentype.js'), //TODO: blendOnto is not a function, text out
  require('./old/covers/layouts/swissquad.js'),
  require('./old/covers/divided3.js'), // kind of swissquad
  require('./old/covers/divided.js'),
  require('./old/covers/mosaic.js'), //TODO: font missing
  require('./old/covers/layouts/margined.js'),
  require('./old/covers/layouts/cornered.js'),
  require('./old/covers/divided2.js'), // kind of cornered
  require('./old/covers/goldencorner.js'),// kind of cornered
  // require('./old/covers/layout.hugetype2.js'),//TODO: blendOnto is missing
  require('./old/covers/layout.goldentree.js'), //TODO: patterns missin
  require('./old/covers/fourth.js'),
  require('./old/covers/layout.charts.js'),  //TODO: text sticks out
  require('./old/covers/layout.stitch.js'), //TODO fonts missing, nice
  require('./old/covers/layout.bonedupl.js'),  //TODO: limit available fonts
  require('./old/covers/data.js'),
  // require('./old/covers/layout.mapper.js'), // cool triangles
  // require('./old/covers/layout.grids.js'), // cool, no text though?
  // require('./old/covers/layout.wavecircles.js'), //TODO: text missing, cool patterns
  // require('./old/covers/ok.covers.rule2.js'), // cool
  require('./old/covers/kaleidoscope.js'),
  require('./old/covers/cube.js'), //TODO: no text?
  require('./old/covers/hexagons.js'), //text is out
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
