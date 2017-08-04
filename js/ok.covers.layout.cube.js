const Crayon = require('../crayons')
const typo = require('../typography')
const utils = require('../utils')

var crayon

function QB (side, year, pages, sections) {
  var proportion_x = 0.74
  var proportion_y = 0.25

    // { color2 : 'rgba(96, 77, 122)', tags : [ 'ekonomia', 'prawo', 'zarządzanie' ] },
    // { color2 : 'rgba(2, 147, 156)', tags : [ 'psychologia społeczna', 'socjologia', 'demografia', 'krytyka społeczna' ] },
    // { color2 : 'rgba(135, 95, 64)', tags : [ 'zabytki', 'urbanistyka', 'architektura' ] },
    // { color2 : 'rgba(57, 141, 87)', tags : [ 'geografia', 'turystyka' ] },
    // { color2 : 'rgba(129, 145, 147)', tags : [ 'edukacja', 'Akme', 'varsavianistyka', 'teatr' ] },
    // { color2 : 'rgba(100, 148, 138)', tags : [ 'literatura', 'politologia', 'filozofia' ] },
    // { color2 : 'rgba(166, 116, 81)', tags : [ 'kulturoznawstwo', 'historia sztuki', 'kultura staropolska' ] },
    // { color2 : 'rgba(154, 44, 51)', tags : [ 'archeologia', 'historia', 'nowożytność', 'starożytność', 'średniowiecze', 'XIX wiek', 'XX wiek',

  var c1 = 'rgba(96, 77, 122)'
  var c2 = 'rgba(2, 147, 156)'
  var c3 = 'rgba(135, 95, 64)'
  var c4 = 'rgba(57, 141, 87)'
  var c5 = 'rgba(129, 145, 147)'
  var c6 = 'rgba(100, 148, 138)'
  var c7 = 'rgba(166, 116, 81)'
  var c8 = 'rgba(154, 44, 51)'

  var mix = Math.round(Math.random() * 8)
  var mix_shift = 360 / mix
  yh = 57 + Math.round(360 / 8 * mix)
  sh = 196 + Math.round(360 / 8 * mix)
  ph = 324 + Math.round(360 / 8 * mix)

  year = 'hsla(' + yh + ', 70%, 60%, 0.4)'
  section_colour = 'hsla(' + sh + ', 70%, 60%, 0.4)'
  page_colour = 'hsla(' + ph + ', 70%, 60%, 0.4)'

    // if(mix == 0) { year_color = blendIt(year, c1);}

  crayon.context.translate(0, side + 60)

    // cube contours
  crayon.context.beginPath()
  crayon.context.moveTo(crayon.canvas.width / 2, crayon.canvas.height / 2)
  crayon.context.lineTo(crayon.canvas.width / 2 - side * proportion_x, crayon.canvas.height / 2 - side * proportion_y)
  crayon.context.lineTo(crayon.canvas.width / 2, crayon.canvas.height / 2 - 2 * side * proportion_y)
  crayon.context.lineTo(crayon.canvas.width / 2 + side * proportion_x, crayon.canvas.height / 2 - side * proportion_y)
  crayon.context.closePath()
  crayon.context.stroke()

  crayon.context.translate(0, -side)
  crayon.context.beginPath()
  crayon.context.moveTo(crayon.canvas.width / 2, crayon.canvas.height / 2)
  crayon.context.lineTo(crayon.canvas.width / 2 - side * proportion_x, crayon.canvas.height / 2 - side * proportion_y)
  crayon.context.lineTo(crayon.canvas.width / 2, crayon.canvas.height / 2 - 2 * side * proportion_y)
  crayon.context.lineTo(crayon.canvas.width / 2 + side * proportion_x, crayon.canvas.height / 2 - side * proportion_y)
  crayon.context.closePath()
  crayon.context.stroke()
  crayon.context.translate(0, side)

  crayon.context.beginPath()
  crayon.context.moveTo(crayon.canvas.width / 2, crayon.canvas.height / 2)
  crayon.context.lineTo(crayon.canvas.width / 2, crayon.canvas.height / 2 - side)
  crayon.context.closePath()
  crayon.context.stroke()

  crayon.context.translate(side * proportion_x, -side * proportion_y)
  crayon.context.beginPath()
  crayon.context.moveTo(crayon.canvas.width / 2, crayon.canvas.height / 2)
  crayon.context.lineTo(crayon.canvas.width / 2, crayon.canvas.height / 2 - side)
  crayon.context.closePath()
  crayon.context.stroke()
  crayon.context.translate(-side * proportion_x, side * proportion_y)

  crayon.context.translate(-side * proportion_x, -side * proportion_y)
  crayon.context.beginPath()
  crayon.context.moveTo(crayon.canvas.width / 2, crayon.canvas.height / 2)
  crayon.context.lineTo(crayon.canvas.width / 2, crayon.canvas.height / 2 - side)
  crayon.context.closePath()
  crayon.context.stroke()
  crayon.context.translate(side * proportion_x, side * proportion_y)

  crayon.context.beginPath()
  crayon.context.moveTo(crayon.canvas.width / 2, crayon.canvas.height / 2 - side * 1.5)
  crayon.context.lineTo(crayon.canvas.width / 2, crayon.canvas.height / 2 - side * proportion_y)
  crayon.context.closePath()
  crayon.context.stroke()
    // cube contours

    // year slices
  var year1 = year.charAt(2)
  var year2 = year.charAt(3)

    // y = ((x - a1)/(a2 - a1)) * (b2 - b1) + b1
  var xx1 = 0
  var yy1 = 0
  var xx2 = side * proportion_x
  var yy2 = -side * proportion_y

  var tmp_x = (year1 - 0) / (10 - 0) * ((xx2 - xx1) + xx1)
  var tmp_y = (year1 - 0) / (10 - 0) * ((yy2 - yy1) + yy1)
  crayon.context.translate(tmp_x, tmp_y)

  crayon.context.beginPath()
  crayon.context.moveTo(crayon.canvas.width / 2, crayon.canvas.height / 2)
  crayon.context.lineTo(crayon.canvas.width / 2, crayon.canvas.height / 2 - side)
  crayon.context.lineTo(crayon.canvas.width / 2 - side * proportion_x, crayon.canvas.height / 2 - side - side * proportion_y)
  crayon.context.lineTo(crayon.canvas.width / 2 - side * proportion_x, crayon.canvas.height / 2 - side * proportion_y)
  crayon.context.closePath()
    // crayon.context.strokeStyle = '#FF0000';
  crayon.context.stroke()
  crayon.context.fillStyle = year
  crayon.context.fill()
  crayon.context.translate(-tmp_x, -tmp_y)

  tmp_x = (year2 - 0) / (10 - 0) * ((xx2 - xx1) + xx1)
  tmp_y = (year2 - 0) / (10 - 0) * ((yy2 - yy1) + yy1)
  crayon.context.translate(tmp_x, tmp_y)

  crayon.context.beginPath()
  crayon.context.moveTo(crayon.canvas.width / 2, crayon.canvas.height / 2)
  crayon.context.lineTo(crayon.canvas.width / 2, crayon.canvas.height / 2 - side)
  crayon.context.lineTo(crayon.canvas.width / 2 - side * proportion_x, crayon.canvas.height / 2 - side - side * proportion_y)
  crayon.context.lineTo(crayon.canvas.width / 2 - side * proportion_x, crayon.canvas.height / 2 - side * proportion_y)
  crayon.context.closePath()
    // crayon.context.strokeStyle = '#FF0000';
  crayon.context.stroke()
  crayon.context.fillStyle = year
  crayon.context.fill()
  crayon.context.translate(-tmp_x, -tmp_y)

    // sections
    // shifts of colors... from category

  if (sections === undefined) { sec1 = Math.round(Math.random() * 9 + 1); sec2 = Math.round(Math.random() * 9 + 1) } else {
    if (sections.length == 1) { sec1 = 0; sec2 = sections.charAt(0) }
    if (sections.length == 2) { sec1 = sections.charAt(0); sec2 = sections.charAt(1) }
  }
  var sec1 = 1
  var sec2 = 3

  var xx1 = 0
  var yy1 = 0
  var xx2 = side * proportion_x
  var yy2 = side * proportion_y
  tmp_x = (sec1 - 0) / (10 - 0) * ((xx2 - xx1) + xx1)
  tmp_y = (sec1 - 0) / (10 - 0) * ((yy2 - yy1) + yy1)
  crayon.context.translate(tmp_x, tmp_y)

  crayon.context.beginPath()
  crayon.context.moveTo(crayon.canvas.width / 2, crayon.canvas.height / 2 - side * proportion_y * 2)
  crayon.context.lineTo(crayon.canvas.width / 2, crayon.canvas.height / 2 - side - side * proportion_y * 2)
  crayon.context.lineTo(crayon.canvas.width / 2 - side * proportion_x, crayon.canvas.height / 2 - side - side * proportion_y)
  crayon.context.lineTo(crayon.canvas.width / 2 - side * proportion_x, crayon.canvas.height / 2 - side * proportion_y)
  crayon.context.closePath()
    // crayon.context.strokeStyle = '#FF0000';
  crayon.context.stroke()
  crayon.context.fillStyle = section_colour
  crayon.context.fill()
  crayon.context.translate(-tmp_x, -tmp_y)

  tmp_x = (sec2 - 0) / (10 - 0) * ((xx2 - xx1) + xx1)
  tmp_y = (sec2 - 0) / (10 - 0) * ((yy2 - yy1) + yy1)
  crayon.context.translate(tmp_x, tmp_y)

  crayon.context.beginPath()
  crayon.context.moveTo(crayon.canvas.width / 2, crayon.canvas.height / 2 - side * proportion_y * 2)
  crayon.context.lineTo(crayon.canvas.width / 2, crayon.canvas.height / 2 - side - side * proportion_y * 2)
  crayon.context.lineTo(crayon.canvas.width / 2 - side * proportion_x, crayon.canvas.height / 2 - side - side * proportion_y)
  crayon.context.lineTo(crayon.canvas.width / 2 - side * proportion_x, crayon.canvas.height / 2 - side * proportion_y)
  crayon.context.closePath()
    // crayon.context.strokeStyle = '#FF0000';
  crayon.context.stroke()
  crayon.context.fillStyle = section_colour
  crayon.context.fill()
  crayon.context.translate(-tmp_x, -tmp_y)

  if (pages.length == 2) { page1 = 0; page2 = pages.charAt(0); pages3 = pages.charAt(1) }
  if (pages.length == 3) { page1 = pages.charAt(0); page2 = pages.charAt(1); page3 = pages.charAt(2) }

  var xx1 = 0
  var yy1 = 0
  var xx2 = 0
  var yy2 = -side
  tmp_x = (page1 - 0) / (10 - 0) * ((xx2 - xx1) + xx1)
  tmp_y = (page1 - 0) / (10 - 0) * ((yy2 - yy1) + yy1)
  crayon.context.translate(tmp_x, tmp_y)
  crayon.context.beginPath()
  crayon.context.moveTo(crayon.canvas.width / 2, crayon.canvas.height / 2)
  crayon.context.lineTo(crayon.canvas.width / 2 + side * proportion_x, crayon.canvas.height / 2 - side * proportion_y)
  crayon.context.lineTo(crayon.canvas.width / 2, crayon.canvas.height / 2 - side * proportion_y * 2)
  crayon.context.lineTo(crayon.canvas.width / 2 - side * proportion_x, crayon.canvas.height / 2 - side * proportion_y)
  crayon.context.closePath()
    // crayon.context.strokeStyle = '#FF0000';
  crayon.context.stroke()
  crayon.context.fillStyle = page_colour
  crayon.context.fill()
  crayon.context.translate(-tmp_x, -tmp_y)

  tmp_x = (page2 - 0) / (10 - 0) * ((xx2 - xx1) + xx1)
  tmp_y = (page2 - 0) / (10 - 0) * ((yy2 - yy1) + yy1)
  crayon.context.translate(tmp_x, tmp_y)
  crayon.context.beginPath()
  crayon.context.moveTo(crayon.canvas.width / 2, crayon.canvas.height / 2)
  crayon.context.lineTo(crayon.canvas.width / 2 + side * proportion_x, crayon.canvas.height / 2 - side * proportion_y)
  crayon.context.lineTo(crayon.canvas.width / 2, crayon.canvas.height / 2 - side * proportion_y * 2)
  crayon.context.lineTo(crayon.canvas.width / 2 - side * proportion_x, crayon.canvas.height / 2 - side * proportion_y)
  crayon.context.closePath()
    // crayon.context.strokeStyle = '#FF0000';
  crayon.context.stroke()
  crayon.context.fillStyle = page_colour
  crayon.context.fill()
  crayon.context.translate(-tmp_x, -tmp_y)

  tmp_x = (page3 - 0) / (10 - 0) * ((xx2 - xx1) + xx1)
  tmp_y = (page3 - 0) / (10 - 0) * ((yy2 - yy1) + yy1)
  crayon.context.translate(tmp_x, tmp_y)
  crayon.context.beginPath()
  crayon.context.moveTo(crayon.canvas.width / 2, crayon.canvas.height / 2)
  crayon.context.lineTo(crayon.canvas.width / 2 + side * proportion_x, crayon.canvas.height / 2 - side * proportion_y)
  crayon.context.lineTo(crayon.canvas.width / 2, crayon.canvas.height / 2 - side * proportion_y * 2)
  crayon.context.lineTo(crayon.canvas.width / 2 - side * proportion_x, crayon.canvas.height / 2 - side * proportion_y)
  crayon.context.closePath()
    // crayon.context.strokeStyle = '#FF0000';
  crayon.context.stroke()
  crayon.context.fillStyle = page_colour
  crayon.context.fill()
  crayon.context.translate(-tmp_x, -tmp_y)
};

function blendIt (f_colour, s_colour) {
  var n_colour = 'rgba(255, 255, 255, 0.33)'
    // alert('stop');
  return n_colour
};

function makeCover (book) {
  if (!crayon) {
    crayon = new Crayon(document.getElementById('cover'))
  }

  crayon.clear()
  crayon.style('default')

  crayon.fill('#D6D6D6').rect(0, 0, crayon.canvas.width, crayon.canvas.height)

  crayon.context.save()
  console.log('year: ' + book.year + ' pages: ' + book.pageCount + ' sections: ' + book.sectionCount)
  QB(280, book.year, book.pageCount, book.sectionCount)
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

        // crayon.font(fonts.titleFamily+fonts.titleFont, titleFontSize, fonts.titleStyle, 0).fill('#000000').paragraph('left', fonts.titleLine, titleWidth, true).text(title);
        // crayon.font(fonts.titleFamily+fonts.titleFont, titleFontSize * 0.75, fonts.titleStyle, 0).fill('#000000').paragraph('left', fonts.titleLine, titleWidth, true).text(subTitle, 0, titleFontSize / 4);

  console.log(fonts.titleFamily)
        // crayon.context.font = 'normal ' + authorFontSize + 'px BenchNine';
        // var randAuthor = Math.round(Math.random());

  if (Math.round(Math.random()) == 0) {
            // crayon.font(fonts.authorFamily+fonts.authorFont, authorFontSize, author.nameStyle, 0).fill('#FF9000').paragraph('left', 0.25, titleWidth, false).text(author.name, 0, authorFontSize / 2);
            // crayon.context.font = 'normal '+ authorFontSize +'px' + ' ' + fonts.authorFamily+fonts.authorFont;
            // crayon.font(fonts.authorFamily+fonts.authorFont, authorFontSize, author.surnameStyle, 0).fill('#FF9000').paragraph('left', -0.25, titleWidth, true).text(author.surname, 0 + crayon.context.measureText(author.name + ' ').width, authorFontSize / 2);
  } else {
            // crayon.font(fonts.authorFamily+fonts.authorFont, authorFontSize, author.nameStyle, 0).fill('#FF9000').paragraph('left', -0.5, titleWidth, true).text(author.name, 0, authorFontSize / 2);
            // crayon.font(fonts.authorFamily+fonts.authorFont, authorFontSize, author.surnameStyle, 0).fill('#FF9000').paragraph('left', 0.25, titleWidth, true).text(author.surname, 0, authorFontSize / 2);
  }
  utils.addCover()
}

module.exports = {

  name: 'Cube',
  makeCover: makeCover
}
