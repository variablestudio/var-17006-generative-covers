const random = require('pex-random')

const covers = [
  // require('./lib/covers/data'),
  // require('./lib/covers/divided'),
  // require('./lib/covers/divided3')
  require('./lib/covers/kaleidoscope')
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
for (let i = 0; i < 10; i++) {
  const book = books[i]
  let cover = random.element(covers)
  cover.makeCover(book)
}
