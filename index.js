const random = require('pex-random')
const fonts = require('./fonts.js')

const covers = [
  // require('./lib/covers/data'),
  require('./lib/covers/divided'),
  // require('./lib/covers/divided3'),
  // require('./lib/covers/broken-kaleidoscope'),
  // require('./lib/covers/broken-hexagons'),
  // require('./lib/covers/layouts/swissquad'),
  // require('./lib/covers/layouts/moleskine'),
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
const numCovers = 10

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
