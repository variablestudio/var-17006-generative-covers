const Crayon = require('../crayons')
const typo = require('../typography')
const utils = require('../utils')

var crayon

function makeCover (book) {
  crayon = new Crayon(document.getElementById('cover'))

  crayon.clear()
  crayon.style('default')

  crayon.fill('#ededed').rect(0, 0, crayon.canvas.width, crayon.canvas.height)
        // crayon.fill('#DDDDDD').rect(25, 25, 550, 750);

  crayon.context.save()

  var def_year = book.year
  var def_pages = book.pageCount
  var def_sections = book.sectionCount

        // x1 > 18..21 - 50 - 550;

  var master_gap = 28
  var matrix = 3 + Math.round(Math.random() * 3)

  var cube_gap = 540 / matrix
  var cube_max = 0.8 * (cube_gap - master_gap)
  var cube_min = cube_max * 0.7

  var cube = cube_min + (Math.random() * (cube_max - cube_min))
  var sect = parseInt(def_sections)
  if (sect < 6) {
    sect = 6
  }

  var heights = new Array(matrix * matrix)
  for (m = 0; m < heights.length; m++) {
    heights[m] = master_gap // Math.round(master_gap*0.25+ Math.random()*master_gap*0.75);
  }

  heights[0] = utils.remap(parseInt(def_year.substring(0, 2)), 18, 21, 10, 30)
  heights[1] = utils.remap(parseInt(def_year.substring(2)), 0, 99, 10, 32)
  heights[2] = utils.remap(parseInt(def_pages), 0, 1000, 5, 32)
  heights[3] = utils.remap(book.title.length, 0, 200, 5, 36)
  heights[4] = utils.remap(book.author.length, 0, 120, 5, 36)
  heights[5] = utils.remap(book.publisher.length, 0, 120, 5, 36)

  heights = OK.Covers.Utils.shuffleArray(heights)

        // crayon.context.save();
  var counter = 0

  for (y = 0; y < matrix; y++) {
    for (x = 0; x < matrix; x++) {
      gap = heights[counter]

      crayon.context.beginPath()
      crayon.context.moveTo(550, 750)
      crayon.context.lineTo(550, 750 - cube)
      crayon.context.lineTo(550 - gap, 750 - cube - gap)
      crayon.context.lineTo(550 - gap - cube, 750 - cube - gap)
      crayon.context.lineTo(550 - gap - cube, 750 - gap)
      crayon.context.lineTo(550 - cube, 750)
      crayon.context.lineTo(550, 750)
      crayon.context.closePath()
      if (gap == master_gap) {
        crayon.context.fillStyle = '#f75710'
      } else {
        crayon.context.fillStyle = 'hsl(' + Math.random() * 360 + ', 94%, 52%)'
      }
      crayon.context.fill()

      crayon.context.beginPath()
      crayon.context.moveTo(550 - gap - cube, 750 - cube - gap)
      crayon.context.lineTo(550 - gap - cube, 750 - gap)
      crayon.context.lineTo(550 - gap, 750 - gap)
      crayon.context.lineTo(550 - gap, 750 - cube - gap)
      crayon.context.lineTo(550 - gap - cube, 750 - cube - gap)
      crayon.context.closePath()
      crayon.context.fillStyle = '#363636'
      crayon.context.fill()

      crayon.context.translate(-cube_gap, 0)
      counter++
    }
    crayon.context.translate(cube_gap * matrix, -cube_gap)
  }

  crayon.context.restore()

  var fonts = typo.pairSelector(this.name, book.title)
  var author = typo.formatAuthorName(book.author)

  var titleFontSize = crayon.canvas.height * 0.06
  var authorFontSize = titleFontSize * fonts.PairRatio

  var titleX = crayon.canvas.width * 0.08
  var titleY = crayon.canvas.width * 0.1 + titleFontSize
  var titleWidth = crayon.canvas.width * 0.45

  if (OK.Covers.Typography.longestWord(book.title) > 10) {
    titleFontSize = titleFontSize * utils.remap(OK.Covers.Typography.longestWord(book.title) - 10, 0, 10, 0.9, 0.7)
  } else {
    titleFontSize = titleFontSize + 180 / book.title.length
  }

        // console.log('FontSize: ' + titleFontSize);

  crayon.context.save()
  crayon.context.translate(titleX, titleY)

  var titleSections = typo.breakTitle(book.title)
  var title = titleSections[0]
  var subTitle = titleSections[1]

  title = typo.addLigatures(title, fonts.titleFamily)

  crayon.font(fonts.titleFamily + fonts.titleFont, titleFontSize, fonts.titleStyle, 0).fill('#000000').paragraph('left', fonts.titleLine, titleWidth, true).text(title.toUpperCase())
  crayon.font(fonts.titleFamily + fonts.titleFont, titleFontSize * 0.75, fonts.titleStyle, 0).fill('#000000').paragraph('left', fonts.titleLine, titleWidth, true).text(subTitle.toLowerCase(), 0, titleFontSize / 4)

            // always split

  crayon.context.translate(-titleX, -titleY)

  crayon.context.textAlign = 'right'

  if (author.nameStyle != undefined) {
    crayon.context.font = author.nameStyle + ' ' + authorFontSize + 'px ' + fonts.authorFamily + fonts.authorFont
  } else {
    crayon.context.font = authorFontSize + 'px ' + fonts.authorFamily + fonts.authorFont
  }
  crayon.context.fillText(author.name.trim(), 550, 85)

  crayon.context.textAlign = 'right'

  if (author.nameStyle != undefined) {
    crayon.context.font = author.surnameStyle + ' ' + authorFontSize + 'px ' + fonts.authorFamily + fonts.authorFont
  } else {
    crayon.context.font = authorFontSize + 'px ' + fonts.authorFamily + fonts.authorFont
  }
  crayon.context.fillText(author.surname, 550, 115)

            // crayon.context.font = 'normal ' + authorFontSize + 'px' + ' ' + fonts.authorFamily + fonts.authorFont;
            // crayon.font(fonts.authorFamily + fonts.authorFont, authorFontSize, author.nameStyle, 0).fill('#000000').paragraph('right', 0.25, titleWidth, false).text(author.name, 0, authorFontSize / 2);
            // crayon.font(fonts.authorFamily + fonts.authorFont, authorFontSize, author.surnameStyle, 0).fill('000000').paragraph('right', -0.25, titleWidth, true).text(author.surname, 0 + crayon.context.measureText(author.name + '').width, authorFontSize / 2);

        // crayon.restore();

  utils.addCover()
  crayon.context.restore()
        // crayon.context.closePath();
        // crayon.fill('#d9d5c3').rect(0, 0, crayon.canvas.width, crayon.canvas.height);
}

module.exports = {

  name: 'Charts',
  makeCover: makeCover
}
