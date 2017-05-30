// -unique colors per tag
// -grouping but more diverse

const Crayon = require('../crayons')
const typo = require('../typography')
const utils = require('../utils')

var crayon

var mainCategories = [
  { color2: '#604D7A', color: '#9F81C6'/* purple */, tags: [ 'ekonomia', 'prawo', 'zarządzanie' ] },
  { color2: '#02939C', color: '#08CED9'/* skyblue */, tags: [ 'psychologia społeczna', 'socjologia', 'demografia', 'krytyka społeczna' ] },
  { color2: '#875F40', color: '#CC9363'/* brown */, tags: [ 'zabytki', 'urbanistyka', 'architektura' ] },
  { color2: '#398D57', color: '#5BD785'/* green */, tags: [ 'geografia', 'turystyka' ] },
  { color2: '#819193', color: '#B3C7CA'/* grey */, tags: [ 'edukacja', 'Akme', 'varsavianistyka', 'teatr' ] },
  { color2: '#64948A', color: '#89C9BB'/* teal */, tags: [ 'literatura', 'politologia', 'filozofia' ] },
  { color2: '#A67451', color: '#DD9A6C'/* orange */, tags: [ 'kulturoznawstwo', 'historia sztuki', 'kultura staropolska' ] },
  { color2: '#9A2C33', color: '#DF434B'/* red */, tags: [ 'archeologia', 'historia', 'nowożytność', 'starożytność', 'średniowiecze', 'XIX wiek', 'XX wiek', 'historia antyczna' ] }
]

function makeCover (book) {
  if (!crayon) {
    crayon = new Crayon(document.getElementById('cover'))
  }

  crayon.clear()
  crayon.style('default')

  var categoryColor = '#B3C7CA'
  var categoryColor2 = '#000000'
  var hitCount = 0
  mainCategories.forEach(function (categoryGroup) {
    book.categories.forEach(function (category) {
      if (categoryGroup.tags.indexOf(category) !== -1) {
        categoryColor = categoryGroup.color
        categoryColor2 = categoryGroup.color2
        hitCount++
      }
    })
  })

  crayon.fill(categoryColor).rect(0, 0, crayon.canvas.width, crayon.canvas.height)

  var author = typo.formatAuthorName(book.author.toUpperCase())

  var authorFontSize = crayon.canvas.height * 0.04
  var titleFontSize = crayon.canvas.height * 0.06

  var titleX = crayon.canvas.width * 0.13
  var titleY = crayon.canvas.width * 0.08
  var titleWidth = crayon.canvas.width * 0.8

  crayon.style('title').font('Arial', titleFontSize, 'bold').paragraph('left', 0.25).fill('#FFFFFF')

  var titleLines = typo.breakLines(crayon, book.title.toUpperCase(), titleWidth)
  var titleMeasurements = crayon.measureText(titleLines)
  var titleAscent = -titleMeasurements.y

  titleY += titleAscent

  crayon.style('author').font('Arial', authorFontSize).fill('#000000')
  var authorMeasurements = crayon.measureText(author)

  var pageCount = '' + book.pageCount

  crayon.style('count').font('Futura', authorFontSize * 5).fill(categoryColor2)
  var countMeasurements = crayon.measureText(pageCount)

  crayon.style('title').text(titleLines, titleX, titleY)
  crayon.style('author').text(author, titleX, titleY + titleMeasurements.height)
  crayon.style('count').text(pageCount, titleX, titleY + titleMeasurements.height - countMeasurements.y)

  crayon.style('default').fill(categoryColor2).rect(0, 0, crayon.canvas.width * 0.05, crayon.canvas.height)

  utils.addCover()
}

module.exports = {
  name: 'Data',
  makeCover: makeCover
}
