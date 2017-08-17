const Crayon = require('../crayons')
const typo = require('../typography')
const utils = require('../utils')

var crayon

function makeCover (book) {
  crayon = new Crayon(document.getElementById('cover'))

  crayon.clear()
  crayon.style('default')

  crayon.fill('#deded2').rect(0, 0, crayon.canvas.width, crayon.canvas.height)
        // crayon.fill('#DDDDDD').rect(25, 25, 550, 750);

  crayon.context.save()

  var def_year = book.year
  var def_pages = book.pageCount
  var def_sections = book.sectionCount

        // x1 > 18..21 - 50 - 550;

  var sect = parseInt(def_sections)
  if (sect < 6) { sect = 6 }

  var color = 50
  var hue = Math.random() * 360

  crayon.context.strokeStyle = '#FFFFFF'
  crayon.context.lineWidth = 1
  crayon.context.beginPath()
  for (p = 0; p < 1024; p++) {
    crayon.context.lineWidth = 1
        // var rand = 200 + Math.round(Math.random()*55);

    var x = Math.random() * 600
    var y = Math.random() * 800
    crayon.context.moveTo(x, y)
    crayon.context.quadraticCurveTo(x - 6 + Math.random() * 12, y - 6 + Math.random() * 12, x - 6 + Math.random() * 12, y - 6 + Math.random() * 12)
  }

  crayon.context.strokeStyle = '#FFFFFF'
  crayon.context.lineWidth = 1
  crayon.context.stroke()
        // console.log('datas: ' + x1 + ' ' + y1 + ' ' + x2 + ' ' + y2);
        // crayon.context.restore();
  crayon.context.closePath()

  crayon.context.beginPath()
  crayon.context.lineWidth = 2
  var colors = new Array('#A30B0B', '#9119A7', '#2A2525', '#FFFFFF', '#00208B', '#3A7254')
  crayon.context.strokeStyle = colors[Math.round(Math.random() * 5)]
  var stitch_width = 80 + Math.random() * 80
  crayon.context.moveTo(stitch_width, 0)
  crayon.context.lineTo(stitch_width, 800)

  var option = Math.round(Math.random() * 4)

  switch (option) {
    case 0:
      for (s = 1; s < sect; s++) {
        crayon.context.moveTo(0, s * (800 / sect))
        crayon.context.lineTo(stitch_width, s * (800 / sect))
      }
      break

    case 1:
      for (s = 1; s < sect; s++) {
        crayon.context.moveTo(0, s * (800 / sect))
        crayon.context.lineTo(stitch_width, s * (800 / sect))
        if (s > 1) {
          crayon.context.moveTo(stitch_width, s * (800 / sect))
          crayon.context.lineTo(stitch_width / 2, s * (800 / sect) - 800 / sect / 2)
          crayon.context.lineTo(0, s * (800 / sect) - 800 / sect / 2)
          crayon.context.lineTo(stitch_width / 2, s * (800 / sect) - 800 / sect / 2)
          crayon.context.lineTo(stitch_width, s * (800 / sect) - 800 / sect)
        }
      }
      break

    case 2:
      for (s = 1; s < sect; s++) {
        crayon.context.moveTo(0, s * (800 / sect))
        crayon.context.lineTo(stitch_width, s * (800 / sect))
        if (s > 1 && s < sect - 1) {
          crayon.context.moveTo(stitch_width, s * (800 / sect) - 800 / sect / 6)
          crayon.context.lineTo(0, s * (800 / sect) - 800 / sect / 6)
          crayon.context.moveTo(stitch_width, s * (800 / sect) + 800 / sect / 6)
          crayon.context.lineTo(0, s * (800 / sect) + 800 / sect / 6)
        }
      }
      break

    case 3:
      for (s = 1; s < sect; s++) {
        crayon.context.moveTo(0, s * (800 / sect))
        crayon.context.lineTo(stitch_width, s * (800 / sect))
        if (s > 1 && s < sect - 1) {
          crayon.context.moveTo(stitch_width, s * (800 / sect))
          crayon.context.lineTo(stitch_width / 2, s * (800 / sect) - 800 / sect / 2)
          crayon.context.lineTo(0, s * (800 / sect) - 800 / sect / 2)
          crayon.context.moveTo(stitch_width, s * (800 / sect))
          crayon.context.lineTo(stitch_width / 2, s * (800 / sect) + 800 / sect / 2)
          crayon.context.lineTo(0, s * (800 / sect) + 800 / sect / 2)
        // crayon.context.lineTo(stitch_width/2, s*(800/sect) - 800/sect/2);
        // crayon.context.lineTo(stitch_width, s*(800/sect) - 800/sect);
        }
      }
      break

    case 4:
      for (s = 1; s < sect; s++) {
        if (s > 1 && s < sect - 1) {
          crayon.context.moveTo(stitch_width, s * (800 / sect))
          crayon.context.lineTo(stitch_width / 2, s * (800 / sect) - 800 / sect / 1.5)
          crayon.context.lineTo(stitch_width / 2, s * (800 / sect) - 800 / sect / 3)
          crayon.context.lineTo(0, s * (800 / sect) - 800 / sect / 3)
          crayon.context.lineTo(0, s * (800 / sect) + 800 / sect / 3)
          crayon.context.lineTo(stitch_width / 2, s * (800 / sect) + 800 / sect / 3)
          crayon.context.lineTo(stitch_width / 2, s * (800 / sect) + 800 / sect / 1.5)
          crayon.context.lineTo(stitch_width, s * (800 / sect))
        // crayon.context.lineTo(0, s*(800/sect) - 800/sect/2);
        // crayon.context.moveTo(stitch_width, s*(800/sect));
        // crayon.context.lineTo(stitch_width/2, s*(800/sect) + 800/sect/2);
        // crayon.context.lineTo(0, s*(800/sect) + 800/sect/2);
        // crayon.context.lineTo(stitch_width/2, s*(800/sect) - 800/sect/2);
        // crayon.context.lineTo(stitch_width, s*(800/sect) - 800/sect);
        } else {
          crayon.context.moveTo(0, s * (800 / sect))
          crayon.context.lineTo(stitch_width, s * (800 / sect))
        }
      }
      break
  }

  crayon.context.closePath()
  crayon.context.stroke()

  crayon.context.strokeStyle = '#FFFFFF'
  crayon.context.lineWidth = 1

  var fonts = typo.pairSelector(this.name, book.title)
  var author = typo.formatAuthorName(book.author)

  var titleFontSize = crayon.canvas.height * 0.08
  var authorFontSize = titleFontSize * fonts.PairRatio

  if (typo.longestWord(book.title) > 10) { titleFontSize = titleFontSize * utils.remap(typo.longestWord(book.title) - 10, 0, 10, 0.75, 0.5) } else {
    titleFontSize = titleFontSize + 100 / book.title.length
  }

  var titleX = stitch_width + crayon.canvas.width * 0.08

  if (book.title.length < 72) {
    var titleY = 800 / sect + titleFontSize * 0.8
  } else {
    var titleY = crayon.canvas.height * 0.08 + titleFontSize
  }

  var titleWidth = crayon.canvas.width * 0.5

  var titleSections = typo.breakTitle(book.title)
  var title = titleSections[0]
  var subTitle = titleSections[1]

  title = typo.addLigatures(title, fonts.titleFamily)

  crayon.translate(titleX, titleY)

  crayon.font(fonts.titleFamily + fonts.titleFont, titleFontSize, fonts.titleStyle, 0).fill('#000000').paragraph('left', fonts.titleLine, titleWidth, true).text(title)
  crayon.font(fonts.titleFamily + fonts.titleFont, titleFontSize * 0.75, fonts.titleStyle, 0).fill('#000000').paragraph('left', fonts.titleLine, titleWidth, true).text(subTitle, 0, titleFontSize / 4)

  if (Math.round(Math.random()) == 0 && (author.surname.length + author.name.length) < 16) {
    crayon.context.font = 'normal ' + authorFontSize + 'px' + ' ' + fonts.authorFamily + fonts.authorFont
    crayon.font(fonts.authorFamily + fonts.authorFont, authorFontSize, author.surnameStyle, 0).fill('#000000').paragraph('left', 0.25, titleWidth, false).text(author.surname, 0, authorFontSize / 2)
    crayon.font(fonts.authorFamily + fonts.authorFont, authorFontSize, author.nameStyle, 0).fill('000000').paragraph('left', -0.25, titleWidth, true).text(author.name, 0 + crayon.context.measureText(author.surname + '').width, authorFontSize / 2)
  } else {
    crayon.font(fonts.authorFamily + fonts.authorFont, authorFontSize, author.surnameStyle, 0).fill('#000000').paragraph('left', -0.5, titleWidth, true).text(author.surname, 0, authorFontSize / 2)
    crayon.font(fonts.authorFamily + fonts.authorFont, authorFontSize, author.nameStyle, 0).fill('#000000').paragraph('left', 0.25, titleWidth, true).text(author.name, 0, authorFontSize / 2)
  }

  utils.addCover()
  crayon.context.closePath()
        // crayon.fill('#d9d5c3').rect(0, 0, crayon.canvas.width, crayon.canvas.height);
}

module.exports = {

  name: 'Stitch',
  makeCover: makeCover
}
