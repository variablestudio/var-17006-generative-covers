const Crayon = require('../crayons')
const typo = require('../typography')
const utils = require('../utils')

var crayon

function makeCover (book) {
  crayon = new Crayon(document.getElementById('cover'))

  crayon.clear()
  crayon.style('default')

  crayon.fill('#EAEAEA').rect(0, 0, crayon.canvas.width, crayon.canvas.height)
        // crayon.fill('#DDDDDD').rect(25, 25, 550, 750);

  crayon.context.save()

  var def_year = book.year
  var def_pages = book.pageCount
  var def_sections = book.sectionCount

        // x1 > 18..21 - 50 - 550;

  var sect = parseInt(def_sections)
  if (sect < 6) { sect = 6 }

  crayon.context.strokeStyle = '#000000'
  crayon.context.lineWidth = 2

  var color = 50
  var hue = Math.random() * 360

        // crayon.context.rotate(30);
        // WAVE LINES
  var amp = 28
  var time = 28

  for (y = 0; y < 158; y++) {
        // amp = time = 20 + Math.round(Math.random()*16);
    crayon.context.beginPath()
    for (x = 0; x < 124; x++) {
        // crayon.context.beginPath();
      new_x = x * time * 2
      new_y = 0 + y * amp * 0.82
      crayon.context.moveTo(new_x, new_y)
      var option = Math.round(Math.random() * 3)
      switch (option) {
        case 0:
        // sine
          crayon.context.quadraticCurveTo(new_x + time / 2, new_y + amp / 2, new_x + time, new_y)
          crayon.context.quadraticCurveTo(new_x + time * 1.5, new_y - amp / 2, new_x + 2 * time, new_y)

          break
        case 1:
        // triangle
          crayon.context.lineTo(new_x + time / 2, new_y + amp / 2)
          crayon.context.lineTo(new_x + time, new_y)
          crayon.context.lineTo(new_x + time * 1.5, new_y - amp / 2)
          crayon.context.lineTo(new_x + 2 * time, new_y)

          break
        case 2:
        // triangle
          crayon.context.lineTo(new_x + time, new_y + amp / 2)
          crayon.context.lineTo(new_x + time, new_y - amp / 2)
          crayon.context.lineTo(new_x + 2 * time, new_y)

          break
        case 3:
        // quad
          crayon.context.lineTo(new_x + time / 2, new_y)
          crayon.context.lineTo(new_x + time / 2, new_y + amp / 2)
          crayon.context.lineTo(new_x + time, new_y + amp / 2)
          crayon.context.lineTo(new_x + time, new_y - amp / 2)
          crayon.context.lineTo(new_x + time * 1.5, new_y - amp / 2)
          crayon.context.lineTo(new_x + time * 1.5, new_y)
          crayon.context.lineTo(new_x + 2 * time, new_y)

          break
        default:
        // quad
          crayon.context.lineTo(new_x + time / 2, new_y)
          crayon.context.lineTo(new_x + time / 2, new_y + amp / 2)
          crayon.context.lineTo(new_x + time, new_y + amp / 2)
          crayon.context.lineTo(new_x + time, new_y - amp / 2)
          crayon.context.lineTo(new_x + time * 1.5, new_y - amp / 2)
          crayon.context.lineTo(new_x + time * 1.5, new_y)
          crayon.context.lineTo(new_x + 2 * time, new_y)
      }
      crayon.context.lineWidth = 2 + Math.random() * 5
        // crayon.context.closePath();
        // crayon.context.strokeStyle = 'hsl(' + Math.round(Math.random()*360) + ', 60%, 60%)';

        // crayon.context.stroke();
    }
    crayon.context.closePath()
    crayon.context.strokeStyle = 'black'  // 'hsl(' + Math.round(Math.random()*360) + ', 60%, 60%)';
        // crayon.context.lineWidth = 1 + Math.random()*2;
    crayon.context.stroke()
  }

  var fonts = typo.pairSelector(this.name, book.title)
  var author = typo.formatAuthorName(book.author)

  var titleFontSize = crayon.canvas.height * 0.08
  var authorFontSize = titleFontSize * fonts.PairRatio

        // var titleX = stitch_width + crayon.canvas.width * 0.08;
        // var titleY = 800/sect + titleFontSize*0.8;
        // var titleWidth = crayon.canvas.width * 0.5;

  var titleSections = typo.breakTitle(book.title)
  var title = titleSections[0]
  var subTitle = titleSections[1]

  title = typo.addLigatures(title, fonts.titleFamily)

        // crayon.translate(titleX, titleY);

  utils.addCover()
  crayon.context.closePath()
        // crayon.fill('#d9d5c3').rect(0, 0, crayon.canvas.width, crayon.canvas.height);
}

module.exports = {

  name: 'WaveCircles',
  makeCover: makeCover
}
