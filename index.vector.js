const opentype = require('opentype.js')
const fonts = require('./fonts.js')
const random = require('pex-random')
const books = require('./data/books.json')
const layouts = require('./lib/layouts')

random.seed(0)

const canvasContainer = document.createElement('div')
canvasContainer.id = 'canvasContainer'
document.body.appendChild(canvasContainer)

const coversContainer = document.createElement('div')
coversContainer.id = 'covers'
document.body.appendChild(coversContainer)

const w = 600
const h = 800

var shortestTitle = books.sort((a, b) => {
  return a.title.length - b.title.length
})[0]

var longestTitle = books.sort((a, b) => {
  return -(a.title.length - b.title.length)
})[0]

var shortestAuthor = books.sort((a, b) => {
  return a.author.length - b.author.length
})[0]

var longestAuthor = books.sort((a, b) => {
  return -(a.author.length - b.author.length)
})[0]

var fewestPages = books.sort((a, b) => {
  return a.pageCount - b.pageCount
})[0]

var mostPages = books.sort((a, b) => {
  return -(a.pageCount - b.pageCount)
})[0]

var selectedBooks = [
  shortestTitle, longestTitle,
  shortestAuthor, longestAuthor,
  fewestPages, mostPages
].concat(books.reverse())

fonts.load(() => {
  opentype.load('fonts/ptsans/pt_sans-web-regular-webfont.ttf', function (err, font) {
    opentype.load('fonts/opensansextra/opensans-extrabold-webfont.ttf', function (err, boldFont) {
    // opentype.load('fonts/ptserif/pt_serif-web-bold-webfont.ttf', function (err, boldFont) {
      if (err) console.log(err)
      for (let i = 0; i < 26; i++) {
        const book = selectedBooks[i % selectedBooks.length]
        const makeCover = random.element(layouts.all)
        // const cover = layouts.bar({book, font, w, h })
        // const cover = layouts.swissQuad({ book, font, w, h })
        // const cover = layouts.rightLabel({ book, font, w, h })
        const cover = makeCover({ book, font, boldFont, w, h })
        cover.setAttribute('viewBox', `0 0 ${w} ${h}`)
        coversContainer.appendChild(cover)
      }
    })
  })
})
