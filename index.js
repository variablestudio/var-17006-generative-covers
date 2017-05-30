const covers = [
  require('./lib/covers/data')
]

const book = {
  title: 'Budownictwo murowane w Małopolsce w XIV i XV wieku',
  author: 'Andrzej Wyrobisz',
  publisher: 'Zakład Narodowy im. Ossolińskich - Wydawnictwo',
  year: '1963',
  categories: ['historia', 'architektura', 'historia sztuki'],
  sectionCoun: 7,
  pageCount: 99,
  wordCount: 0
}

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
console.log('covers', covers[covers.length - 1].makeCover(book))
