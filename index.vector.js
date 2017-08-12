const Rune = require('rune.js')
const opentype = require('opentype.js')
const fonts = require('./fonts.js')
const utils = require('./lib/utils')
const chroma = require('chroma-js')
const random = require('pex-random')
const books = require('./data/books.json')
random.seed(0)

const canvasContainer = document.createElement('div')
canvasContainer.id = 'canvasContainer'
document.body.appendChild(canvasContainer)

const coversContainer = document.createElement('div')
coversContainer.id = 'covers'
document.body.appendChild(coversContainer)

const typo = require('./lib/typography')

const W = 600
const H = 800

function measureText (font, str, opts) {
  if (Object.prototype.toString.call(str) === '[object Array]') {
    return measureTextLines(font, str, opts)
  }

  return {
    x: 0,
    y: -font.ascender / font.unitsPerEm * opts.fontSize,
    width: font.getAdvanceWidth(str, opts.fontSize, opts),
    height: (font.ascender + -font.descender) / font.unitsPerEm * opts.fontSize
  }
}

function measureTextLines (font, str, opts) {
  var lines = str

  var maxWidth = 0
  lines.forEach(function (line) {
    var lineWidth = measureText(font, line, opts).width
    maxWidth = Math.max(maxWidth, lineWidth)
  })

  var height = lines.length * (font.ascender + -font.descender) / font.unitsPerEm * opts.fontSize

  return {
    x: 0,
    y: -font.ascender / font.unitsPerEm * opts.fontSize,
    width: maxWidth,
    height: height
  }
}

function breakLines (font, str, maxWidth, opts) {
  var words = str.split(' ')
  var lines = []
  var currentLine = ''
  while (words.length > 0) {
    var word = words.shift()
    var newLine = currentLine
    if (newLine.length > 0) newLine += ' '
    newLine += word
    var measurements = measureText(font, newLine, opts)
    if (measurements.width > maxWidth && currentLine.length > 0) {
      lines.push(currentLine)
      currentLine = word
    } else {
      currentLine = newLine
    }
  }
  lines.push(currentLine)
  return lines
}

function makeCover (book, font) {
  console.log('makeCover')
  const r = new Rune({
    width: W,
    height: H,
    debug: true
  })

  var minPageCount = 10
  var maxPageCount = 500

  var borderScale = 1 + Math.random()
  var hue = Math.random() * 360
    // var numX = 2 + Math.floor(Math.random() * 10);
  var numX = utils.remap(book.pageCount, minPageCount, maxPageCount, 2, 17, true)
  // numX = 5
  var radius = (0.2 + 0.5 * Math.random())
  // radius = 1
  var radius2 = (0.1 + 0.4 * Math.random())
  // radius2 = 0.5
  var counterLines = (Math.random() > 0.5) ? 0.1 : 0

  var margins = 0

  var niceBlue = '#27D1E7'
  var paleYellow = '#FFFFFF'
  var colorHSL = chroma.hex(niceBlue).hsl()
  var color = chroma.hsl(hue, 0.7, colorHSL[2] * 1.1).hex()
  var lightColor = chroma.hsl(hue, 0.3, colorHSL[2] * 1.8).hex()

  // bg
  r.rect(0, 0, W, H).stroke(false).fill(color)

  var stepX = r.width / (numX + 1)
  var stepY = stepX
  var r1 = stepX * radius
  var r2 = stepX * radius2 * 0.25

  console.log(stepX, r1, r2)
  // crayon.fill(lightColor).stroke(false)

  for (var x = 0; x <= r.width + stepX / 2; x += stepX) {
    for (var y = 0; y <= r.height + stepY / 2; y += stepY) {
      // break
      var leftOrRight = Math.floor(Math.random() * 2)
      // crayon.save()
      // crayon.translate(x, y)
      // crayon.scale(borderScale, borderScale)
      let g = r.group(x, y)
      if (leftOrRight) {
        r.rect(-r1, -r2, r1 * 2, r2 * 2)
          .rotate(-45)
          .stroke(false)
          .fill(lightColor)
          .addTo(g)
        r.rect(-r1, -r2 * counterLines, r1 * 2, r2 * 2 * counterLines)
          .rotate(45)
          .stroke(false)
          .fill(lightColor)
          .addTo(g)
      }
      if (!leftOrRight) {
        r.rect(-r1, -r2 * counterLines, r1 * 2, r2 * 2 * counterLines)
          .rotate(-45)
          .stroke(false)
          .fill(lightColor)
          .addTo(g)
        r.rect(-r1, -r2, r1 * 2, r2 * 2)
          .rotate(45)
          .stroke(false)
          .fill(lightColor)
          .addTo(g)
        // crayon.rect(-r, -r2 * counterLines, r * 2, r2 * 2 * counterLines)
        // .rotate(90).rect(-r, -r2, r * 2, r2 * 2)
      }
      g.scale(borderScale)
      // crayon.restore()
    }
  }

  var author = typo.formatAuthorName(book.author)

  var authorFontSize = r.height * 0.03
  var titleFontSize = r.height * 0.05

  var shiftY = r.height * 1 / 3 // 50

  var titleX = r.width * 0.08
  var titleY = r.width * 0.08
  var titleWidth = r.width * 0.8

  // crayon.style('title').font('Arial', titleFontSize, 'bold').paragraph('left', 0.25).fill('#333333')

  var titleLines = breakLines(font, book.title, titleWidth, { fontSize: titleFontSize })
  var titleMeasurements = measureText(font, titleLines, { fontSize: titleFontSize })
  var titleAscent = -titleMeasurements.y
  console.log('titleMeasurements', titleMeasurements)

  titleY += titleAscent

  titleY += shiftY

  // crayon.style('author').font('Gill Sans', authorFontSize).fill('#333333')
  var authorMeasurements = measureText(font, author.name + ' ' + author.surname, { fontSize: authorFontSize })

  var gapHeight = 40
  r.rect(margins, margins + shiftY, r.width - 2 * margins, titleY + titleMeasurements.height + authorMeasurements.height + titleAscent / 2 - shiftY + gapHeight)
    .fill(paleYellow)
    .stroke(false)
  r.rect(margins + titleX, titleY + titleMeasurements.height - 10, r.width - 2 * margins - titleX - titleX, 2)
    .fill('#333333')
    .stroke(false)

  // r.rect(titleX, titleY - titleAscent, titleWidth, titleMeasurements.height)
    // .fill(false)
    // .stroke('#FF0000')

  // crayon.style('title').text(titleLines, titleX, titleY)
  const lineHeight = titleFontSize * (font.ascender + -font.descender) / font.unitsPerEm
  titleLines.forEach((line, i) => {
    r.text(line, titleX, titleY + lineHeight * i)
      .fill('#000000')
      .fontSize(titleFontSize)
      .fontFamily('PTSans')
  })

  r.text(author.name + ' ' + author.surname, titleX, titleY + titleMeasurements.height + gapHeight)
    .fill('#333333')
    .fontSize(authorFontSize)
    .fontFamily("PTSans")
  r.draw()
  return r.el
}

fonts.load(() => {
  opentype.load('fonts/ptsans/pt_sans-web-regular-webfont.ttf', function (err, font) {
    if (err) console.log(err)
    for (let i = 0; i < 26; i++) {
      const book = books[i % books.length]
      const cover = makeCover(book, font)
      cover.setAttribute('viewBox', `0 0 ${W} ${H}`)
      coversContainer.appendChild(cover)
    }
  })
  /*
  const container = document.createElement('div')
  container.id = 'container'
  document.body.appendChild(container)
  container.style.position = 'absolute'
  container.style.top = '20px'
  container.style.left = '20px'

  const r = new Rune({
    container: '#container',
    width: W,
    height: H,
    debug: true
  })

  r.rect(0, 0, W, H)
    .fill(220)
    .stroke(false)

  let tx = 20
  let ty = r.height / 2
  const str = 'This is a piece of text Śą'
  const text = r.text(str, tx, ty)
    .fill(255, 0, 0)
    .stroke(false)
    .fontSize(32)
  // .textAlign('center')
    .fontFamily('PTSans')
  // .fontWeight('bold')
  console.log(text)

  // todo: caching
  function measureText (text) {

    const ns = 'http://www.w3.org/2000/svg'
    const svg = document.createElementNS(ns, 'svg')
    svg.style.position = 'absolute'
    svg.style.top = '-1000px'
    document.body.appendChild(svg)
    const textElem = document.createElementNS(ns, 'text')
    if (!text.state.fontFamily) throw new Error('MeasureText: no fontFamily')
    if (!text.state.fontSize) throw new Error('MeasureText: no fontSize')
    textElem.style.fontFamily = text.state.fontFamily
    textElem.style.fontSize = text.state.fontSize
    textElem.style.fontWeight = text.state.fontWeight || 'normal'
    textElem.style.fontStyle = text.state.fontStyle || 'normal'
    //todo
    //textElem.textAlign = text.state.textAlign || 'left'

    svg.appendChild(textElem)
    textElem.innerHTML = text.state.text
    return textElem.getBBox()
  }

  const bbox = measureText(text)

  console.log(bbox)
  r.rect(tx + bbox.x, ty + bbox.y, bbox.width, bbox.height)
    .stroke(255, 0, 0)
    .fill(false)

  r.draw()

  var canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  canvas.style.position = 'absolute'
  canvas.style.top = '20px'
  canvas.style.left = '20px'
  document.body.appendChild(canvas)
  var ctx = canvas.getContext('2d')

  // opentype.load('fonts/francoisone/francoisone-webfont.ttf', function(err, font) {
  opentype.load('fonts/ptsans/pt_sans-web-regular-webfont.ttf', function(err, font) {
    if (err) {
      alert('Could not load font: ' + err);
    } else {
      // Use your font here.
      console.log(font)
      ctx.fillStyle = 'rgb(220, 220, 220)'
      // ctx.fillRect(0, 0, W, H)
      // font.drawMetrics(ctx, text.state.text, tx, ty, 32, {})
      font.draw(ctx, text.state.text, tx, ty, 32, { kerning: true })
      var w = font.getAdvanceWidth(text.state.text, 32, {})

      ctx.strokeStyle = '#0000FF'
      ctx.beginPath()
      var asc = 32 * font.ascender / font.unitsPerEm
      var desc = 32 * font.descender / font.unitsPerEm
      ctx.moveTo(tx, ty)
      ctx.lineTo(tx + w, ty)
      ctx.moveTo(tx, ty - asc)
      ctx.lineTo(tx + w, ty - asc)
      ctx.moveTo(tx, ty - desc)
      ctx.lineTo(tx + w, ty - desc)
      ctx.stroke()
      ctx.closePath()

      var path = font.getPath(text.state.text, tx, ty, 32, { kerning: true })
      var bbox = path.getBoundingBox()
      ctx.strokeStyle = '#00FF00'
      console.log('bbox', bbox)
      //ctx.strokeRect(bbox.x1, bbox.y1, bbox.x2 - bbox.x1, bbox.y2 - bbox.y1)
      path.stroke = '#FF6600'
      // path.draw(ctx)

      console.log('font', font)
    }
  });
  */
})
