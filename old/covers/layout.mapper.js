const Crayon = require('../crayons')
const typo = require('../typography')
const utils = require('../utils')

var crayon

function makeCover (book) {
  if (!crayon) {
    crayon = new Crayon(document.getElementById('cover'))
  }

  crayon.clear()
  crayon.style('default')

  crayon.fill('#DEDEDE').rect(0, 0, crayon.canvas.width, crayon.canvas.height)
        // crayon.fill('#DDDDDD').rect(25, 25, 550, 750);

  crayon.context.save()

  var def_year = book.year
  var def_pages = book.pageCount
  var def_sections = book.sectionCount

        // x1 > 18..21 - 50 - 550;
  var x1 = utils.remap(parseInt(def_year.substring(0, 2)), 18, 21, 0, 600)
  var y1 = utils.remap(parseInt(def_year.substring(2)), 0, 99, 0, 800)

  var x2 = utils.remap(parseInt(def_sections), 0, 30, 0, 600)
  var y2 = utils.remap(parseInt(def_pages), 0, 1000, 0, 800)

        // building
  crayon.context.beginPath()
  crayon.context.moveTo(0, 0)
  crayon.context.lineTo(x1, y1)
  crayon.context.lineTo(x2, y2)
  crayon.context.lineTo(0, 0)
  crayon.context.closePath()
  crayon.context.fillStyle = 'hsl(' + Math.random() * 360 + ', 60%, 60%)'
  crayon.context.fill()

  crayon.context.beginPath()
  crayon.context.moveTo(600, 800)
  crayon.context.lineTo(x1, y1)
  crayon.context.lineTo(x2, y2)
  crayon.context.lineTo(600, 800)
  crayon.context.closePath()
  crayon.context.fillStyle = 'hsl(' + Math.random() * 360 + ', 60%, 60%)'
  crayon.context.fill()

        // bulding from 0,0 to closest
  if (x1 < x2) {
    if (y1 > y2) {
      crayon.context.beginPath()
      crayon.context.moveTo(0, 0)
      crayon.context.lineTo(x1, y1)
      crayon.context.lineTo(0, 800)
      crayon.context.lineTo(0, 0)
      crayon.context.closePath()
      crayon.context.fillStyle = 'hsl(' + Math.random() * 360 + ', 60%, 60%)'
      crayon.context.fill()

      crayon.context.beginPath()
      crayon.context.moveTo(0, 800)
      crayon.context.lineTo(x1, y1)
      crayon.context.lineTo(600, 800)
      crayon.context.lineTo(0, 800)
      crayon.context.closePath()
      crayon.context.fillStyle = 'hsl(' + Math.random() * 360 + ', 60%, 60%)'
      crayon.context.fill()

      crayon.context.beginPath()
      crayon.context.moveTo(600, 0)
      crayon.context.lineTo(x2, y2)
      crayon.context.lineTo(0, 0)
      crayon.context.lineTo(600, 0)
      crayon.context.closePath()
      crayon.context.fillStyle = 'hsl(' + Math.random() * 360 + ', 60%, 60%)'
      crayon.context.fill()

      crayon.context.beginPath()
      crayon.context.moveTo(600, 0)
      crayon.context.lineTo(x2, y2)
      crayon.context.lineTo(600, 800)
      crayon.context.lineTo(600, 0)
      crayon.context.closePath()
      crayon.context.fillStyle = 'hsl(' + Math.random() * 360 + ', 60%, 60%)'
      crayon.context.fill()
    } else {
      crayon.context.beginPath()
      crayon.context.moveTo(0, 0)
      crayon.context.lineTo(x1, y1)
      crayon.context.lineTo(600, 0)
      crayon.context.lineTo(0, 0)
      crayon.context.closePath()
      crayon.context.fillStyle = 'hsl(' + Math.random() * 360 + ', 60%, 60%)'
      crayon.context.fill()

      crayon.context.beginPath()
      crayon.context.moveTo(0, 800)
      crayon.context.lineTo(x1, y1)
      crayon.context.lineTo(600, 800)
      crayon.context.lineTo(0, 800)
      crayon.context.closePath()
      crayon.context.fillStyle = 'hsl(' + Math.random() * 360 + ', 60%, 60%)'
      crayon.context.fill()

      crayon.context.beginPath()
      crayon.context.moveTo(600, 0)
      crayon.context.lineTo(x2, y2)
      crayon.context.lineTo(0, 0)
      crayon.context.lineTo(600, 0)
      crayon.context.closePath()
      crayon.context.fillStyle = 'hsl(' + Math.random() * 360 + ', 60%, 60%)'
      crayon.context.fill()

      crayon.context.beginPath()
      crayon.context.moveTo(600, 0)
      crayon.context.lineTo(x2, y2)
      crayon.context.lineTo(600, 800)
      crayon.context.lineTo(600, 0)
      crayon.context.closePath()
      crayon.context.fillStyle = 'hsl(' + Math.random() * 360 + ', 60%, 60%)'
      crayon.context.fill()
    }
  } else {
    if (y1 > y2) {
      crayon.context.beginPath()
      crayon.context.moveTo(0, 0)
      crayon.context.lineTo(x1, y1)
      crayon.context.lineTo(0, 800)
      crayon.context.lineTo(0, 0)
      crayon.context.closePath()
      crayon.context.fillStyle = 'hsl(' + Math.random() * 360 + ', 60%, 60%)'
      crayon.context.fill()

      crayon.context.beginPath()
      crayon.context.moveTo(0, 800)
      crayon.context.lineTo(x1, y1)
      crayon.context.lineTo(600, 800)
      crayon.context.lineTo(0, 800)
      crayon.context.closePath()
      crayon.context.fillStyle = 'hsl(' + Math.random() * 360 + ', 60%, 60%)'
      crayon.context.fill()

      crayon.context.beginPath()
      crayon.context.moveTo(600, 0)
      crayon.context.lineTo(x2, y2)
      crayon.context.lineTo(0, 0)
      crayon.context.lineTo(600, 0)
      crayon.context.closePath()
      crayon.context.fillStyle = 'hsl(' + Math.random() * 360 + ', 60%, 60%)'
      crayon.context.fill()

      crayon.context.beginPath()
      crayon.context.moveTo(600, 0)
      crayon.context.lineTo(x2, y2)
      crayon.context.lineTo(600, 800)
      crayon.context.lineTo(600, 0)
      crayon.context.closePath()
      crayon.context.fillStyle = 'hsl(' + Math.random() * 360 + ', 60%, 60%)'
      crayon.context.fill()
    } else {
      crayon.context.beginPath()
      crayon.context.moveTo(0, 0)
      crayon.context.lineTo(x1, y1)
      crayon.context.lineTo(600, 0)
      crayon.context.lineTo(0, 0)
      crayon.context.closePath()
      crayon.context.fillStyle = 'hsl(' + Math.random() * 360 + ', 60%, 60%)'
      crayon.context.fill()

      crayon.context.beginPath()
      crayon.context.moveTo(0, 800)
      crayon.context.lineTo(x1, y1)
      crayon.context.lineTo(600, 800)
      crayon.context.lineTo(0, 800)
      crayon.context.closePath()
      crayon.context.fillStyle = 'hsl(' + Math.random() * 360 + ', 60%, 60%)'
      crayon.context.fill()

      crayon.context.beginPath()
      crayon.context.moveTo(600, 0)
      crayon.context.lineTo(x2, y2)
      crayon.context.lineTo(0, 0)
      crayon.context.lineTo(600, 0)
      crayon.context.closePath()
      crayon.context.fillStyle = 'hsl(' + Math.random() * 360 + ', 60%, 60%)'
      crayon.context.fill()

      crayon.context.beginPath()
      crayon.context.moveTo(600, 0)
      crayon.context.lineTo(x2, y2)
      crayon.context.lineTo(600, 800)
      crayon.context.lineTo(600, 0)
      crayon.context.closePath()
      crayon.context.fillStyle = 'hsl(' + Math.random() * 360 + ', 60%, 60%)'
      crayon.context.fill()
    }
  }
  console.log('datas: ' + x1 + ' ' + y1 + ' ' + x2 + ' ' + y2)
  crayon.context.restore()

  var fonts = typo.pairSelector(this.name, book.title)
  var author = typo.formatAuthorName(book.author)

  var titleFontSize = crayon.canvas.height * 0.08
  var authorFontSize = titleFontSize * fonts.PairRatio

  var titleX = crayon.canvas.width * 0.16
  var titleY = crayon.canvas.width * 0.08 + titleFontSize
  var titleWidth = crayon.canvas.width * 0.68

  var titleSections = typo.breakTitle(book.title)
  var title = titleSections[0]
  var subTitle = titleSections[1]

  title = typo.addLigatures(title, fonts.titleFamily)

  crayon.translate(titleX, titleY)

  utils.addCover()
}

module.exports = {

  name: 'Mapper',
  makeCover: makeCover
}
