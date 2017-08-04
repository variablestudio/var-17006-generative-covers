const random = require('pex-random')
const fonts = require('./fonts.js')

const covers = [
  // require('./lib/covers/data'),
  require('./lib/covers/divided'),
  // require('./lib/covers/divided3'), //severe overlap issues
  // require('./lib/covers/broken-kaleidoscope'), //broken
  // require('./lib/covers/broken-hexagons'),//broken, text outside of text bg
  // require('./lib/covers/layouts/swissquad'), //broken, unreadable text, no bg
  // require('./lib/covers/layouts/moleskine'), //broken, text outside of text bg
  // require('./lib/covers/layouts/pseudo'),
  // require('./lib/covers/layouts/simplest'),
  // require('./lib/covers/layouts/cube')
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
const numCovers = 20

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
